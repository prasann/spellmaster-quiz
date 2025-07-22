import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import vocabulary from "../data/vocabulary.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Type definition for vocabulary items
interface VocabularyItem {
  word: string;
  difficulty: string;
  hint: string;
}

// Get a random word from the vocabulary based on difficulty (optional)
export function getRandomWord(difficulty?: string): VocabularyItem {
  let filteredVocabulary = vocabulary as VocabularyItem[]
  
  if (difficulty) {
    filteredVocabulary = filteredVocabulary.filter(item => item.difficulty === difficulty)
  }
  
  const randomIndex = Math.floor(Math.random() * filteredVocabulary.length)
  return filteredVocabulary[randomIndex]
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
  
  return userInput[position]?.toLowerCase() === word[position]?.toLowerCase()
}

// Check if a partial word is correctly filled
export function isPartialWordCorrect(userInput: string, word: string, partialWord: string) {
  if (!userInput || userInput.length === 0) return false
  
  // Create the expected word with user input
  const expectedWord = word.split('').map((char, i) => {
    return partialWord[i] === '_' ? userInput[i] || '' : char
  }).join('')
  
  return expectedWord.toLowerCase() === word.toLowerCase()
}
