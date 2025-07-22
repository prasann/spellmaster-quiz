import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import PhoneFrame from './components/PhoneFrame'
import QuizMode from './components/QuizMode'
import ScoreDisplay from './components/ScoreDisplay'
import { HouseIcon } from './components/Icons'
import { ThemeProvider } from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'

function AppContent() {
  const [score, setScore] = useKV('quiz-score', { correct: 0, total: 0 })
  const [isActive, setIsActive] = useState(false)

  const handleStartQuiz = () => {
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
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Spelling Quiz
              </h1>
              <p className="text-muted-foreground mt-2">
                Complete the word by filling in missing letters!
              </p>
            </div>
            
            <Card className="p-8 max-w-md mx-auto">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold">Complete the Word</h3>
                
                <p className="text-muted-foreground">
                  Fill in the missing letters to complete the word. Use the hint if you need help!
                </p>
                
                <Button onClick={handleStartQuiz} size="lg" className="w-full mt-6">
                  Start Quiz
                </Button>
              </div>
            </Card>
          </>
        ) : (
          <>
            <ScoreDisplay 
              correct={score.correct} 
              total={score.total} 
              onReset={handleReset} 
            />
            
            <QuizMode 
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
