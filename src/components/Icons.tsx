import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export function HouseIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
    </svg>
  );
}

export function SpeakerHighIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM144,207.64,85.85,160H32V96H85.85L144,48.36ZM200,104a8,8,0,0,1,8,8v32a8,8,0,0,1-16,0V112A8,8,0,0,1,200,104Zm32-16a8,8,0,0,1,8,8v64a8,8,0,0,1-16,0V96A8,8,0,0,1,232,88Z" />
    </svg>
  );
}

export function PencilIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l123.31-123.3A16,16,0,0,0,227.32,73.37ZM51.31,160,136,75.31,152.69,92,68,176.69ZM48,179.31,76.69,208H48Zm48,25.38L79.32,188,164,103.31l16.69,16.69Z" />
    </svg>
  );
}

export function MoonIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M224.3,150.3a8.1,8.1,0,0,0-7.8-5.7l-2.2.4a84,84,0,0,1-14.3,1.2,88,88,0,0,1-88-88,84.1,84.1,0,0,1,1.2-14.3,7.8,7.8,0,0,0-5.7-9l-2.2-.4A8,8,0,0,0,104,35,104,104,0,1,0,221,152,7.8,7.8,0,0,0,224.3,150.3ZM128,216A88,88,0,0,1,55.9,57.8l1.5-.3A100.8,100.8,0,0,0,56,72a104,104,0,0,0,104,104,100.8,100.8,0,0,0,14.5-1.4l-.5.8A87.8,87.8,0,0,1,128,216Z" />
    </svg>
  );
}

export function SunIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M128,56a72,72,0,1,0,72,72A72.08,72.08,0,0,0,128,56Zm0,128a56,56,0,1,1,56-56A56.06,56.06,0,0,1,128,184ZM128,24A8,8,0,0,1,136,32V56a8,8,0,0,1-16,0V32A8,8,0,0,1,128,24Zm0,192a8,8,0,0,1,8,8v24a8,8,0,0,1-16,0V224A8,8,0,0,1,128,216ZM56,128a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H48A8,8,0,0,1,56,128Zm176,0a8,8,0,0,1-8,8H200a8,8,0,0,1,0-16h24A8,8,0,0,1,232,128ZM60.12,68.12A8,8,0,0,1,67.88,56.9l16.97,16.97A8,8,0,1,1,73.63,85.09ZM171.15,192.85a8,8,0,0,1,11.27-11.27l16.97,16.97a8,8,0,0,1-11.27,11.27ZM67.88,199.1a8,8,0,1,1-11.27-11.27l16.97-16.97A8,8,0,0,1,84.85,182.33ZM195.88,73.63a8,8,0,1,1-11.27-11.27l16.97-16.97a8,8,0,1,1,11.27,11.27Z" />
    </svg>
  );
}