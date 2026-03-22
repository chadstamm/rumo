'use client'

import { useState, useRef, useEffect } from 'react'
import { useWizard } from '@/context/wizard-context'
import type { WizardQuestion } from '@/types/wizard'

// ── Textarea Input ──

function TextareaInput({
  question,
  value,
  onChange,
}: {
  question: WizardQuestion
  value: string
  onChange: (v: string) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Auto-focus on mount
    const timer = setTimeout(() => textareaRef.current?.focus(), 100)
    return () => clearTimeout(timer)
  }, [question.id])

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.max(120, el.scrollHeight)}px`
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      className="w-full min-h-[120px] px-5 py-4 rounded-xl
                 bg-white border border-navy/10
                 text-navy font-body text-base leading-relaxed
                 placeholder:text-navy/25
                 focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10
                 transition-all duration-200 resize-none"
    />
  )
}

// ── Select Input ──

function SelectInput({
  question,
  value,
  onChange,
}: {
  question: WizardQuestion
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {question.options?.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`px-4 py-3 rounded-xl font-body text-sm text-left
                     border transition-all duration-200
                     ${
                       value === option
                         ? 'bg-teal/10 border-teal text-navy font-medium'
                         : 'bg-white border-navy/10 text-navy/70 hover:border-navy/20 hover:bg-cream-dark/50'
                     }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

// ── Multiselect Input ──

function MultiselectInput({
  question,
  value,
  onChange,
}: {
  question: WizardQuestion
  value: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {question.options?.map((option) => {
        const selected = value.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`px-4 py-3 rounded-xl font-body text-sm text-left
                       border transition-all duration-200 flex items-center gap-3
                       ${
                         selected
                           ? 'bg-teal/10 border-teal text-navy font-medium'
                           : 'bg-white border-navy/10 text-navy/70 hover:border-navy/20 hover:bg-cream-dark/50'
                       }`}
          >
            <span
              className={`w-4 h-4 rounded flex-shrink-0 border-2 transition-all duration-200 flex items-center justify-center
                         ${selected ? 'bg-teal border-teal' : 'border-navy/20'}`}
            >
              {selected && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {option}
          </button>
        )
      })}
    </div>
  )
}

// ── File Upload Input ──

function FileInput({
  question,
  value,
  onChange,
}: {
  question: WizardQuestion
  value: string
  onChange: (v: string) => void
}) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setFileName(file.name)
    const text = await file.text()
    onChange(text)
  }

  return (
    <div className="space-y-4">
      {/* File upload */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-navy/15 rounded-xl px-6 py-8
                   text-center cursor-pointer
                   hover:border-teal/30 hover:bg-teal/[0.02]
                   transition-all duration-200"
      >
        <input
          ref={fileRef}
          type="file"
          accept={question.acceptTypes || '.txt,.md'}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <p className="font-body text-navy/50 text-sm">
          {fileName ? (
            <span className="text-teal font-medium">{fileName}</span>
          ) : (
            'Click to upload a file'
          )}
        </p>
        <p className="font-body text-navy/30 text-xs mt-1">
          or paste your text below
        </p>
      </div>

      {/* Paste fallback */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your writing sample here..."
        className="w-full min-h-[160px] px-5 py-4 rounded-xl
                   bg-white border border-navy/10
                   text-navy font-body text-sm leading-relaxed
                   placeholder:text-navy/25
                   focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10
                   transition-all duration-200 resize-none"
      />
    </div>
  )
}

// ── Main Question Step ──

export function QuestionStep() {
  const { currentQuestion, state, setAnswer, nextStep, prevStep, isFirstQuestion, isLastQuestionInSection, isLastSection } = useWizard()

  if (!currentQuestion) return null

  const answer = state.answers[currentQuestion.id]
  const stringValue = typeof answer === 'string' ? answer : ''
  const arrayValue = Array.isArray(answer) ? answer : []

  const canProceed = !currentQuestion.required || (
    currentQuestion.inputType === 'multiselect'
      ? arrayValue.length > 0
      : stringValue.trim().length > 0
  )

  const isLastOverall = isLastQuestionInSection && isLastSection

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Question */}
      <div className="mb-8">
        <h2 className="font-display text-navy text-2xl sm:text-3xl font-semibold leading-tight mb-3">
          {currentQuestion.question}
        </h2>

        {currentQuestion.subtext && (
          <p className="font-body text-muted text-sm sm:text-base leading-relaxed">
            {currentQuestion.subtext}
          </p>
        )}

        {currentQuestion.considerations && currentQuestion.considerations.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {currentQuestion.considerations.map((c, i) => (
              <li key={i} className="font-body text-navy/40 text-sm flex items-start gap-2">
                <span className="text-ochre/50 mt-0.5">•</span>
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input */}
      <div className="mb-8">
        {currentQuestion.inputType === 'textarea' && (
          <TextareaInput
            question={currentQuestion}
            value={stringValue}
            onChange={(v) => setAnswer(currentQuestion.id, v)}
          />
        )}
        {currentQuestion.inputType === 'select' && (
          <SelectInput
            question={currentQuestion}
            value={stringValue}
            onChange={(v) => setAnswer(currentQuestion.id, v)}
          />
        )}
        {currentQuestion.inputType === 'multiselect' && (
          <MultiselectInput
            question={currentQuestion}
            value={arrayValue}
            onChange={(v) => setAnswer(currentQuestion.id, v)}
          />
        )}
        {currentQuestion.inputType === 'file' && (
          <FileInput
            question={currentQuestion}
            value={stringValue}
            onChange={(v) => setAnswer(currentQuestion.id, v)}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={isFirstQuestion}
          className={`font-body text-sm px-5 py-2.5 rounded-lg transition-all duration-200
                     ${
                       isFirstQuestion
                         ? 'text-navy/20 cursor-not-allowed'
                         : 'text-navy/60 hover:text-navy hover:bg-navy/5'
                     }`}
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          {/* Skip (for non-required questions) */}
          {!currentQuestion.required && (
            <button
              type="button"
              onClick={nextStep}
              className="font-body text-sm text-navy/40 hover:text-navy/60 px-4 py-2.5 transition-colors duration-200"
            >
              Skip
            </button>
          )}

          {/* Continue / Finish */}
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceed}
            className={`font-body font-semibold text-sm px-7 py-3 rounded-lg
                       transition-all duration-300
                       ${
                         canProceed
                           ? 'bg-teal text-white hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-0.5 active:translate-y-0'
                           : 'bg-navy/10 text-navy/30 cursor-not-allowed'
                       }`}
          >
            {isLastOverall ? 'Finish' : 'Continue →'}
          </button>
        </div>
      </div>

      {/* Auto-save indicator */}
      <p className="font-body text-navy/20 text-xs text-center mt-6">
        Your progress is saved automatically. Come back anytime.
      </p>
    </div>
  )
}
