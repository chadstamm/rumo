---
name: merge
description: Create a PR from current branch and merge it to main, then trigger deployment
---

# Merge to Main

This skill creates a pull request from the current branch, merges it to main, and waits for deployment.

## What it does

1. Checks current branch status and commits
2. Creates a pull request to main (if one doesn't exist)
3. Merges the PR
4. Pulls the latest main locally
5. Provides the live URL after deployment

## Usage

Invoke with `/merge` when you have changes on a feature branch ready to deploy.

## Instructions for Claude

When this skill is invoked:

1. **Check the current branch:**
   ```bash
   git branch --show-current
   git status
   git log --oneline origin/main..HEAD
   ```

2. **Ensure changes are committed and pushed:**
   - If there are uncommitted changes, commit them first
   - Push to the remote branch

3. **Create and merge the PR using GitHub API:**
   ```bash
   # Create PR
   curl -X POST \
     -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/OWNER/REPO/pulls \
     -d '{"title":"...","head":"branch","base":"main"}'

   # Merge PR
   curl -X PUT \
     -H "Authorization: token $GITHUB_TOKEN" \
     https://api.github.com/repos/OWNER/REPO/pulls/NUMBER/merge
   ```

4. **If no GitHub token available, provide manual instructions:**
   - Give the user the exact URL to create the PR
   - Tell them to click "Merge pull request" then "Confirm merge"

5. **After merge, update local:**
   ```bash
   git checkout main
   git pull origin main
   ```

6. **Inform user of deployment:**
   - GitHub Actions will auto-deploy to GitHub Pages
   - Provide the live URL: https://chadstamm.github.io/rumo

## Example output

```
Merging branch 'claude/feature-xyz' to main...

✓ Branch has 3 commits ahead of main
✓ All changes pushed
✓ PR #42 created
✓ PR merged successfully
✓ Local main updated

Your changes are now deploying.
Live URL: https://chadstamm.github.io/rumo
(Takes ~1-2 minutes for GitHub Actions to complete)
```
