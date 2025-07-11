import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { SpeakerHigh, Pencil } from '@phosphor-icons/react'
import { getRandomWord, getPartialWord, speakWord } from '../lib/utils'

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
      isAnswerCorrect = userInput.toLowerCase() === currentWord.toLowerCase();
    } else {
      // For partial mode, only check the letters that were blank
      const missingLetters = currentWord.split('').filter((_, i) => partialWord[i] === '_');
      const userLetters = userInput.split('');
      
      let correctCount = 0;
      let userIndex = 0;
      
      for (let i = 0; i < currentWord.length; i++) {
        if (partialWord[i] === '_') {
          if (userLetters[userIndex]?.toLowerCase() === currentWord[i].toLowerCase()) {
            correctCount++;
          }
          userIndex++;
        }
      }
      
      isAnswerCorrect = correctCount === missingLetters.length;
    }
    
    setIsCorrect(isAnswerCorrect);
    setHasSubmitted(true);
    
    if (isAnswerCorrect) {
      onCorrectAnswer();
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
            <SpeakerHigh size={24} />
          </Button>
        )}
      </div>
      
      {mode === 'partial' && (
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-wrap justify-center gap-2 text-3xl font-bold max-w-xs">
            {partialWord.split('').map((char, index) => (
              <div 
                key={index} 
                className={`w-8 h-12 flex items-center justify-center border-b-2 border-primary ${char === '_' ? 'text-transparent' : 'text-foreground'}`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {mode === 'dictation' ? (
        <div className="w-full max-w-xs">
          <Input
            id="quiz-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type what you hear..."
            className="text-center text-lg"
            disabled={hasSubmitted}
            autoComplete="off"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-wrap justify-center gap-2 text-xl font-bold max-w-xs">
            {currentWord.split('').map((char, index) => {
              const isHidden = partialWord[index] === '_';
              return (
                <div 
                  key={index} 
                  className={`w-8 h-12 flex items-center justify-center border-b-2 border-primary`}
                >
                  {isHidden ? (
                    <input
                      type="text"
                      maxLength={1}
                      value={userInput[index] || ''}
                      onChange={(e) => {
                        const newInput = userInput.split('');
                        newInput[index] = e.target.value;
                        setUserInput(newInput.join(''));
                      }}
                      className="w-6 h-8 text-center bg-transparent text-foreground focus:outline-none"
                      disabled={hasSubmitted}
                      autoComplete="off"
                    />
                  ) : (
                    <span>{char}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center space-y-4 w-full">
        {!hasSubmitted ? (
          <Button 
            onClick={handleSubmit}
            className="w-full max-w-xs"
            disabled={!userInput}
          >
            Submit
          </Button>
        ) : (
          <>
            <div className={`text-xl font-bold ${isCorrect ? 'text-accent' : 'text-destructive'}`}>
              {isCorrect ? 'Correct!' : `Oops! The word was "${currentWord}"`}
            </div>
            <Button 
              onClick={handleNext}
              className="w-full max-w-xs"
              variant={isCorrect ? "outline" : "secondary"}
            >
              Next Word
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

export default QuizMode