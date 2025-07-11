import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import PhoneFrame from './components/PhoneFrame'
import ModeSelector from './components/ModeSelector'
import QuizMode from './components/QuizMode'
import ScoreDisplay from './components/ScoreDisplay'
import { HouseIcon } from './components/Icons'
import { ThemeProvider } from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'

function AppContent() {
  const [quizMode, setQuizMode] = useState<'dictation' | 'partial' | null>(null)
  const [score, setScore] = useKV('quiz-score', { correct: 0, total: 0 })
  const [isActive, setIsActive] = useState(false)

  const handleSelectMode = (mode: 'dictation' | 'partial') => {
    setQuizMode(mode)
    setIsActive(true)
  }

  const handleCorrectAnswer = () => {
    setScore(current => ({
      correct: current.correct + 1,
      total: current.total + 1
    }))
  }

  const handleWrongAnswer = () => {
    setScore(current => ({
      ...current,
      total: current.total + 1
    }))
  }

  const handleReset = () => {
    setScore({ correct: 0, total: 0 })
  }

  const handleBackToHome = () => {
    setQuizMode(null)
    setIsActive(false)
  }

  // Phone frame wrapper for tablets and desktop
  const renderContent = () => (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card py-4 px-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Spelling Quiz</h1>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isActive && (
              <Button variant="ghost" size="icon" onClick={handleBackToHome}>
                <HouseIcon size={24} />
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-6 flex flex-col gap-6">
        {!isActive ? (
          <>
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Spelling Quiz
              </h1>
              <p className="text-muted-foreground mt-2">
                Practice your spelling skills with fun challenges!
              </p>
            </div>
            
            <ModeSelector onSelectMode={handleSelectMode} />
          </>
        ) : (
          <>
            <ScoreDisplay 
              correct={score.correct} 
              total={score.total} 
              onReset={handleReset} 
            />
            
            <QuizMode 
              mode={quizMode!} 
              onCorrectAnswer={handleCorrectAnswer}
              onWrongAnswer={handleWrongAnswer}
              onNextWord={() => {}}
            />
          </>
        )}
      </main>
    </div>
  )

  // Responsive layout - phone frame on larger screens, direct content on mobile
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="container mx-auto py-8 px-4">
        {/* On mobile: render content directly */}
        <div className="block md:hidden">
          {renderContent()}
        </div>
        
        {/* On tablets and desktop: render in phone frame */}
        <div className="hidden md:flex items-center justify-center">
          <PhoneFrame>
            {renderContent()}
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
