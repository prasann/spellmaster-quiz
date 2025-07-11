import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { TrophyIcon, ArrowsClockwiseIcon } from './Icons'
import { motion, useAnimate } from 'framer-motion'

interface ScoreDisplayProps {
  correct: number
  total: number
  onReset?: () => void
}

export function ScoreDisplay({ correct, total, onReset }: ScoreDisplayProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0
  const [prevCorrect, setPrevCorrect] = useState(correct)
  const [scope, animate] = useAnimate()
  
  useEffect(() => {
    if (correct > prevCorrect) {
      // Animate the score when it increases
      animate(scope.current, 
        { scale: [1, 1.2, 1], color: ['#000', '#06D6A0', '#000'] }, 
        { duration: 0.5 }
      )
    }
    setPrevCorrect(correct)
  }, [correct, animate, prevCorrect])
  
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
          <TrophyIcon className="text-secondary" />
          Score
        </h3>
        
        {onReset && (
          <button 
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
          >
            <ArrowsClockwiseIcon size={16} />
            Reset
          </button>
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-foreground">
            <motion.span ref={scope}>{correct}</motion.span> correct
          </span>
          <span className="text-muted-foreground">{total} total</span>
        </div>
        
        <Progress value={percentage} className="h-2" />
        
        <motion.div 
          className="text-center text-sm font-medium mt-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      </div>
    </Card>
  )
}

export default ScoreDisplay