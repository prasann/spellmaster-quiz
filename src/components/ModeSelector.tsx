import React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { SpeakerHighIcon, PencilIcon } from './Icons'

interface ModeSelectorProps {
  onSelectMode: (mode: 'dictation' | 'partial') => void
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Choose Quiz Mode</h2>
      
      <Card 
        className="p-6 hover:border-primary cursor-pointer transition-all"
        onClick={() => onSelectMode('dictation')}
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <SpeakerHighIcon size={32} className="text-primary" />
          </div>
          
          <h3 className="text-xl font-bold">Listen & Spell</h3>
          
          <p className="text-muted-foreground">
            Listen to the word and type it correctly
          </p>
          
          <Button onClick={() => onSelectMode('dictation')} className="w-full">
            Start
          </Button>
        </div>
      </Card>
      
      <Card 
        className="p-6 hover:border-secondary cursor-pointer transition-all"
        onClick={() => onSelectMode('partial')}
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
            <PencilIcon size={32} className="text-secondary" />
          </div>
          
          <h3 className="text-xl font-bold">Complete the Word</h3>
          
          <p className="text-muted-foreground">
            Fill in the missing letters to complete the word
          </p>
          
          <Button onClick={() => onSelectMode('partial')} className="w-full" variant="secondary">
            Start
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ModeSelector