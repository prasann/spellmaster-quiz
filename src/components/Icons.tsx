import React from 'react';
import { 
  Home as HouseIconLucide, 
  PencilLine as PencilIconLucide, 
  Moon as MoonIconLucide, 
  Sun as SunIconLucide, 
  Award as TrophyIconLucide, 
  RotateCw as ArrowsClockwiseIconLucide,
  Lightbulb as LightbulbIconLucide 
} from "lucide-react";

interface IconProps {
  size?: number;
  className?: string;
  weight?: string;
}

export function HouseIcon({ size = 24, className = "" }: IconProps) {
  return <HouseIconLucide size={size} className={className} />;
}

export function PencilIcon({ size = 24, className = "" }: IconProps) {
  return <PencilIconLucide size={size} className={className} />;
}

export function MoonIcon({ size = 24, className = "" }: IconProps) {
  return <MoonIconLucide size={size} className={className} />;
}

export function SunIcon({ size = 24, className = "" }: IconProps) {
  return <SunIconLucide size={size} className={className} />;
}

export function TrophyIcon({ size = 24, className = "" }: IconProps) {
  return <TrophyIconLucide size={size} className={className} />;
}

export function ArrowsClockwiseIcon({ size = 24, className = "" }: IconProps) {
  return <ArrowsClockwiseIconLucide size={size} className={className} />;
}

export function LightbulbIcon({ size = 24, className = "" }: IconProps) {
  return <LightbulbIconLucide size={size} className={className} />;
}