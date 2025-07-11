import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { SpeakerHighIcon } from './Icons'
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
  const [partialWord, setPartialWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [wordHistory, setWordHistory] = useKV('quiz-word-history', [] as string[])
  const [showConfetti, setShowConfetti] = useState(false)

  // Initialize or get next word
  useEffect(() => {
    getNextWord()
  }, [])

  const getNextWord = () => {
    const newWord = getRandomWord()
    
    // Avoid repeating words in the same session
    if (wordHistory.includes(newWord) && wordHistory.length < 15) {
      getNextWord()
      return
    }
    
    setCurrentWord(newWord)
    setPartialWord(mode === 'partial' ? getPartialWord(newWord, 0.5) : '')
    setUserInput('')
    setIsCorrect(null)
    setHasSubmitted(false)
    setShowConfetti(false)
    
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
    let isAnswerCorrect = false;
    
    if (mode === 'dictation') {
      // For dictation mode, direct string comparison
      isAnswerCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    } else {
      // For partial mode, check if the user input completes the word correctly
      // Simply compare with the full word - simpler and more accurate
      isAnswerCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    }
    
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

  return (
    <Card className="p-6 flex flex-col items-center space-y-6">
      {/* Confetti animation when correct */}
      <Confetti show={showConfetti} />
      
      <div className="flex items-center justify-center space-x-2">
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
      
      {mode === 'partial' && (
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-wrap justify-center gap-2 text-3xl font-bold max-w-xs">
            {partialWord.split('').map((char, index) => (
              <motion.div 
                key={index} 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`w-8 h-12 flex items-center justify-center border-b-2 border-primary ${char === '_' ? 'text-transparent' : 'text-foreground'}`}
              >
                {char}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      <div className="w-full max-w-xs">
        <Input
          id="quiz-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={mode === 'dictation' ? "Type what you hear..." : "Type the full word..."}
          className="text-center text-lg"
          disabled={hasSubmitted}
          autoComplete="off"
        />
      </div>
      
      <div className="flex flex-col items-center space-y-4 w-full">
        {!hasSubmitted ? (
          <motion.div className="w-full max-w-xs" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={!userInput}
            >
              Submit
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