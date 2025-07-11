import React from 'react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Trophy, ArrowsClockwise } from '@phosphor-icons/react'

interface ScoreDisplayProps {
  correct: number
  total: number
  onReset?: () => void
}

export function ScoreDisplay({ correct, total, onReset }: ScoreDisplayProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0
  
  let message = ''
  if (total === 0) {
    message = "Let's start spelling!"
  } else if (percentage >= 90) {
    message = "Amazing job!"
  } else if (percentage >= 70) {
    message = "Great effort!"
  } else if (percentage >= 50) {
    message = "Good progress!"
  } else {
    message = "Keep practicing!"
  }
  
  return (
    <Card className="p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Trophy weight="fill" className="text-secondary" />
          Score
        </h3>
        
        {onReset && (
          <button 
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
          >
            <ArrowsClockwise size={16} />
            Reset
          </button>
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-foreground">{correct} correct</span>
          <span className="text-muted-foreground">{total} total</span>
        </div>
        
        <Progress value={percentage} className="h-2" />
        
        <div className="text-center text-sm font-medium mt-1">
          {message}
        </div>
      </div>
    </Card>
  )
}

export default ScoreDisplay