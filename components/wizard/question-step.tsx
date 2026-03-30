'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useWizard } from '@/context/wizard-context'
import type { WizardQuestion } from '@/types/wizard'

// ── Microphone Button ──

function MicrophoneInput({ onTranscript }: { onTranscript: (text: string) => void }) {
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
      }

      recognition.onerror = () => {
        setListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [onTranscript])

  const toggle = useCallback(() => {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
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
}: {
  question: WizardQuestion
  value: string
  onChange: (v: string) => void
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
        className="w-full min-h-[120px] px-5 py-4 rounded-xl
                   bg-white border border-navy/10
                   text-navy font-body text-base leading-relaxed
                   placeholder:text-navy/25
                   focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10
                   transition-all duration-200 resize-none"
      />
      <MicrophoneInput onTranscript={handleTranscript} />
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

      {/* Navigation — pinned to bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-cream/95 backdrop-blur-sm border-t border-navy/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
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

          <p className="font-body text-navy/20 text-xs hidden sm:block">
            Saved automatically
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={nextStep}
              className="font-body text-sm text-navy/40 hover:text-navy/60 px-4 py-2.5 transition-colors duration-200"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={nextStep}
              disabled={!hasAnswer}
              className={`font-body font-semibold text-sm px-7 py-3 rounded-lg
                         transition-all duration-300
                         ${
                           hasAnswer
                             ? 'bg-teal text-white hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20'
                             : 'bg-navy/10 text-navy/30 cursor-not-allowed'
                         }`}
            >
              {isLastOverall ? 'FINISH' : 'CONTINUE →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
