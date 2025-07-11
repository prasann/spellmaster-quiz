import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import vocabulary from "../data/vocabulary.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get a random word from the vocabulary based on difficulty (optional)
export function getRandomWord(difficulty?: string) {
  let filteredVocabulary = vocabulary
  
  if (difficulty) {
    filteredVocabulary = vocabulary.filter(item => item.difficulty === difficulty)
  }
  
  const randomIndex = Math.floor(Math.random() * filteredVocabulary.length)
  return filteredVocabulary[randomIndex].word
}

// Get a partially filled word by hiding some random letters
export function getPartialWord(word: string, hidePercentage = 0.5) {
  const letters = word.split('')
  const numToHide = Math.floor(word.length * hidePercentage)
  
  // Keep track of which indices we've hidden
  const hiddenIndices = new Set<number>()
  
  // Make sure we don't hide all letters
  while (hiddenIndices.size < numToHide) {
    const randomIndex = Math.floor(Math.random() * letters.length)
    hiddenIndices.add(randomIndex)
  }
  
  return letters.map((letter, index) => 
    hiddenIndices.has(index) ? '_' : letter
  ).join('')
}

// Check if a letter is correct at a specific position
export function isLetterCorrect(userInput: string, word: string, position: number) {
  if (!userInput || position >= userInput.length) return null
  
  return userInput[position].toLowerCase() === word[position].toLowerCase()
}

// Convert text to speech
export function speakWord(word: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.rate = 0.8 // Slightly slower for clarity
    window.speechSynthesis.speak(utterance)
    return true
  }
  return false
}
