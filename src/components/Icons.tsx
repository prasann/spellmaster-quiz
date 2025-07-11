import React from 'react';
import { Home as HouseIconLucide, VolumeUp as SpeakerHighIconLucide, PencilLine as PencilIconLucide, Moon as MoonIconLucide, Sun as SunIconLucide } from "lucide-react";

interface IconProps {
  size?: number;
  className?: string;
}

export function HouseIcon({ size = 24, className = "" }: IconProps) {
  return <HouseIconLucide size={size} className={className} />;
}

export function SpeakerHighIcon({ size = 24, className = "" }: IconProps) {
  return <SpeakerHighIconLucide size={size} className={className} />;
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