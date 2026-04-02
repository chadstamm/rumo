'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useWizard } from '@/context/wizard-context'
import type { WizardQuestion } from '@/types/wizard'

// ── Microphone Button ──

function MicrophoneInput({ onTranscript, onListeningChange }: { onTranscript: (text: string) => void; onListeningChange?: (listening: boolean) => void }) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition
    if (SpeechRecognition) {
      setSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      let finalTranscript = ''

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let interim = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' '
            onTranscript(finalTranscript.trim())
          } else {
            interim += event.results[i][0].transcript
          }
        }
      }

      recognition.onend = () => {
        setListening(false)
        onListeningChange?.(false)
      }

      recognition.onerror = () => {
        setListening(false)
        onListeningChange?.(false)
      }

      recognitionRef.current = recognition
    }
  }, [onTranscript])

  const toggle = useCallback(() => {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
      onListeningChange?.(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
      onListeningChange?.(true)
    }
  }, [listening])

  if (!supported) return null

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
        listening
          ? 'bg-red-500/10 text-red-600 border border-red-500/30'
          : 'bg-navy/5 text-navy/50 hover:text-navy/70 hover:bg-navy/10 border border-navy/10'
      }`}
    >
      {listening ? (
        <>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          Stop Recording
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1a2.5 2.5 0 0 0-2.5 2.5v4a2.5 2.5 0 0 0 5 0v-4A2.5 2.5 0 0 0 8 1Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 7v.5a5 5 0 0 0 10 0V7M8 12.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Speak Your Answer
        </>
      )}
    </button>
  )
}

// ── Textarea Input ──

function TextareaInput({
  question,
  value,
  onChange,
  onRecordingChange,
}: {
  question: WizardQuestion
  value: string
  onChange: (v: string) => void
  onRecordingChange?: (recording: boolean) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => textareaRef.current?.focus(), 100)
    return () => clearTimeout(timer)
  }, [question.id])

  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.max(120, el.scrollHeight)}px`
    }
  }, [value])

  const handleTranscript = useCallback((text: string) => {
    onChange(value ? value + ' ' + text : text)
  }, [value, onChange])

  return (
    <div className="space-y-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        autoComplete="off"
        data-form-type="other"
        data-lpignore="true"
        className="w-full min-h-[120px] px-5 py-4 rounded-xl
                   bg-white border border-navy/10
                   text-navy font-body text-base leading-relaxed
                   placeholder:text-navy/25
                   focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10
                   transition-all duration-200 resize-none"
      />
      <MicrophoneInput onTranscript={handleTranscript} onListeningChange={onRecordingChange} />
    </div>
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

// ── File Upload Input (multiple files) ──

type UploadedFile = { name: string; content: string }

function FileInput({
  question,
  value,
  onChange,
}: {
  question: WizardQuestion
  value: string
  onChange: (v: string) => void
}) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [pastedText, setPastedText] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // On mount, separate any existing value back into pasted text
  // (files are ephemeral — re-uploads needed if page refreshes, but text persists)
  useEffect(() => {
    if (value && files.length === 0) {
      setPastedText(value)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const buildCombinedValue = (updatedFiles: UploadedFile[], updatedPaste: string) => {
    const fileParts = updatedFiles.map(f => `--- ${f.name} ---\n${f.content}`).join('\n\n')
    const parts = [fileParts, updatedPaste].filter(Boolean)
    onChange(parts.join('\n\n'))
  }

  const handleFiles = async (fileList: FileList) => {
    const newFiles: UploadedFile[] = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      // Skip duplicates by name
      if (files.some(f => f.name === file.name)) continue
      const content = await file.text()
      newFiles.push({ name: file.name, content })
    }
    if (newFiles.length > 0) {
      const updated = [...files, ...newFiles]
      setFiles(updated)
      buildCombinedValue(updated, pastedText)
    }
  }

  const removeFile = (name: string) => {
    const updated = files.filter(f => f.name !== name)
    setFiles(updated)
    buildCombinedValue(updated, pastedText)
  }

  const handlePasteChange = (text: string) => {
    setPastedText(text)
    buildCombinedValue(files, text)
  }

  return (
    <div className="space-y-4">
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
          multiple
          accept={question.acceptTypes || '.txt,.md'}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files)
            }
            // Reset so same file can be re-selected
            e.target.value = ''
          }}
        />
        <p className="font-body text-navy/50 text-sm">
          Click to upload a file
        </p>
        <p className="font-body text-navy/30 text-xs mt-1">
          {question.isWritingSample ? 'or paste your writing sample below' : 'or paste your text below'}
        </p>
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.name}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg
                         bg-teal/[0.06] border border-teal/20"
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-teal">
                  <path d="M3.5 1.75h4.38L11.5 5.37v6.88a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V2.75a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7.88 1.75v3.63h3.62" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="font-body text-sm text-navy font-medium truncate">{f.name}</span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(f.name) }}
                className="flex-shrink-0 ml-3 text-navy/30 hover:text-red-500 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="font-body text-xs text-teal hover:text-teal-light transition-colors duration-200"
          >
            + Add another file
          </button>
        </div>
      )}

      <textarea
        value={pastedText}
        onChange={(e) => handlePasteChange(e.target.value)}
        placeholder={question.isWritingSample ? 'Paste your writing sample here...' : 'Paste your text here...'}
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
  const [isRecording, setIsRecording] = useState(false)

  if (!currentQuestion) return null

  const answer = state.answers[currentQuestion.id]
  const stringValue = typeof answer === 'string' ? answer : ''
  const arrayValue = Array.isArray(answer) ? answer : []

  const hasAnswer = currentQuestion.inputType === 'multiselect'
    ? arrayValue.length > 0
    : stringValue.trim().length > 0

  const isLastOverall = isLastQuestionInSection && isLastSection

  return (
    <div className="w-full max-w-3xl mx-auto pb-28">
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
            onRecordingChange={setIsRecording}
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

      {/* Navigation — inline below content */}
      <div className="mt-10 pt-6 border-t border-navy/[0.06]">
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
            <button
              type="button"
              onClick={nextStep}
              disabled={isRecording}
              className={`font-body text-sm px-4 py-2.5 transition-colors duration-200
                         ${isRecording ? 'text-navy/20 cursor-not-allowed' : 'text-navy/40 hover:text-navy/60'}`}
            >
              Skip
            </button>

            <button
              type="button"
              onClick={nextStep}
              disabled={!hasAnswer || isRecording}
              className={`font-body font-semibold text-sm px-7 py-3 rounded-lg
                         transition-all duration-300
                         ${
                           hasAnswer && !isRecording
                             ? 'bg-teal text-white hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20'
                             : 'bg-navy/10 text-navy/30 cursor-not-allowed'
                         }`}
            >
              {isRecording ? 'STOP RECORDING FIRST' : isLastOverall ? 'FINISH' : 'CONTINUE →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
