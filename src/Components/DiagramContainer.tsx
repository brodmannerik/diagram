import React from 'react';
import { DiagramType } from './Diagram';
import getDiagramContent from './Diagram';

export interface DiagramProps {
  className?: string;
  diagramType: DiagramType;
  language?: "en" | "de"; 
}

const containerStyle = {
  width: '100%',
  height: '100vh', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1
};

const svgStyle = {
  width: 'auto',
  height: 'auto',
  maxWidth: '98vw',
  maxHeight: '98vh',
  display: 'block',
};

const DiagramContainer: React.FC<DiagramProps> = ({ 
  className = '',
  diagramType = 'main',
  language = 'en'  
}) => {
  return (
    <div 
      className={`diagram-container ${className}`}
      style={containerStyle}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        id="Layer_1" 
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        style={svgStyle}
      >
        {getDiagramContent(diagramType, language)}
      </svg>
    </div>
  );
};

export default DiagramContainer;