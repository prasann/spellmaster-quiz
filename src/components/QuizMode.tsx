import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { SpeakerHighIcon, LightbulbIcon } from './Icons'
import { getRandomWord, getPartialWord, speakWord } from '../lib/utils'
import { motion } from 'framer-motion'
import Confetti from './Confetti'

interface QuizModeProps {
  mode: 'dictation' | 'partial'
  onCorrectAnswer: () => void
  onWrongAnswer: () => void
  onNextWord: () => void
}

export function QuizMode({ mode, onCorrectAnswer, onWrongAnswer, onNextWord }: QuizModeProps) {
  const [currentWord, setCurrentWord] = useState('')
  const [currentHint, setCurrentHint] = useState('')
  const [partialWord, setPartialWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [wordHistory, setWordHistory] = useKV('quiz-word-history', [] as string[])
  const [showConfetti, setShowConfetti] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Initialize or get next word
  useEffect(() => {
    getNextWord()
  }, [])

  const getNextWord = () => {
    const wordItem = getRandomWord()
    const newWord = wordItem.word
    
    // Avoid repeating words in the same session
    if (wordHistory.includes(newWord) && wordHistory.length < 15) {
      getNextWord()
      return
    }
    
    setCurrentWord(newWord)
    setCurrentHint(wordItem.hint)
    setPartialWord(mode === 'partial' ? getPartialWord(newWord, 0.5) : '')
    setUserInput('')
    setIsCorrect(null)
    setHasSubmitted(false)
    setShowConfetti(false)
    setShowHint(false)
    
    // Add to history
    setWordHistory(current => {
      const updatedHistory = [...current, newWord]
      // Keep history at a reasonable size
      if (updatedHistory.length > 20) {
        return updatedHistory.slice(updatedHistory.length - 20)
      }
      return updatedHistory
    })
    
    // If dictation mode, speak the word
    if (mode === 'dictation') {
      setTimeout(() => {
        speakWord(newWord)
      }, 500)
    }
  }

  const handleSubmit = () => {
    // Normalize both strings: trim whitespace, convert to lowercase, and remove non-alphanumeric chars
    const normalizeString = (str: string) => str.trim().toLowerCase().replace(/\s+/g, '');
    
    const normalizedUserInput = normalizeString(userInput);
    const normalizedCurrentWord = normalizeString(currentWord);
    
    // Compare the normalized strings
    const isAnswerCorrect = normalizedUserInput === normalizedCurrentWord;
    
    // Log for debugging (will appear in console)
    console.log(`User input: "${userInput}" vs Word: "${currentWord}"`);
    console.log(`Normalized: "${normalizedUserInput}" vs "${normalizedCurrentWord}"`);
    console.log(`Match: ${isAnswerCorrect}`);
    
    setIsCorrect(isAnswerCorrect);
    setHasSubmitted(true);
    
    if (isAnswerCorrect) {
      onCorrectAnswer();
      setShowConfetti(true);
    } else {
      onWrongAnswer();
    }
  }

  const handleNext = () => {
    getNextWord()
    onNextWord()
  }

  const handleSpeak = () => {
    speakWord(currentWord)
  }

  const toggleHint = () => {
    setShowHint(current => !current)
  }

  return (
    <Card className="p-6 flex flex-col items-center space-y-5">
      {/* Confetti animation when correct */}
      <Confetti show={showConfetti} />
      
      <div className="flex items-center justify-center space-x-2 mb-1">
        <h2 className="text-2xl font-bold text-foreground">
          {mode === 'dictation' ? 'Listen & Spell' : 'Complete the Word'}
        </h2>
        {mode === 'dictation' && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleSpeak}
            className="rounded-full"
          >
            <SpeakerHighIcon size={24} />
          </Button>
        )}
      </div>
      
      {/* Hint section */}
      <div className="w-full flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleHint}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <LightbulbIcon size={18} />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </Button>
        
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-center italic text-sm text-muted-foreground px-4"
          >
            Hint: {currentHint}
          </motion.div>
        )}
      </div>
      
      {mode === 'partial' && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="bg-muted p-4 rounded-lg shadow-inner">
            <div className="flex flex-wrap justify-center gap-2 text-3xl font-bold max-w-xs">
              {partialWord.split('').map((char, index) => (
                <motion.div 
                  key={index} 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`w-8 h-12 flex items-center justify-center ${char === '_' ? 'bg-background/50 rounded-md shadow-sm' : ''}`}
                >
                  {char === '_' ? '?' : char}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Visual connector */}
          <div className="h-8 w-6 flex justify-center">
            <div className="w-0.5 h-full bg-primary/30"></div>
          </div>
          <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary/15 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-xs space-y-3">
        <div className="text-center text-sm font-medium">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-primary/15 text-primary px-4 py-1.5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            {mode === 'dictation' ? "Type what you hear" : "Type the complete word"}
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ 
            boxShadow: ['0 0 0 rgba(var(--color-primary-rgb), 0)', '0 0 8px rgba(var(--color-primary-rgb), 0.5)', '0 0 0 rgba(var(--color-primary-rgb), 0)']
          }}
          transition={{ 
            repeat: hasSubmitted ? 0 : 2,
            duration: 1.5
          }}
          className="relative rounded-lg p-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40"
        >
          <Input
            id="quiz-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={mode === 'dictation' ? "Type the word here..." : "Type the full word here..."}
            className="text-center text-lg shadow-none border bg-card/95 placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            disabled={hasSubmitted}
            autoComplete="off"
            autoFocus
          />
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center space-y-4 w-full">
        {!hasSubmitted ? (
          <motion.div 
            className="w-full max-w-xs" 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleSubmit}
              className="w-full font-bold shadow-md"
              disabled={!userInput}
              size="lg"
            >
              <motion.div 
                initial={{ x: 0 }}
                animate={{ x: userInput ? [0, -3, 3, 0] : 0 }}
                transition={{ repeat: 0, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                Submit Answer
                {userInput && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                )}
              </motion.div>
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isCorrect ? [0.8, 1.2, 1] : 1, 
                y: isCorrect ? [0, -10, 0] : 0 
              }}
              transition={{ duration: 0.5 }}
              className={`text-xl font-bold ${isCorrect ? 'text-accent' : 'text-destructive'}`}
            >
              {isCorrect ? 'Correct!' : `Oops! The word was "${currentWord}"`}
            </motion.div>
            <motion.div className="w-full max-w-xs" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleNext}
                className="w-full"
                variant={isCorrect ? "outline" : "secondary"}
              >
                Next Word
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </Card>
  )
}

export default QuizMode
