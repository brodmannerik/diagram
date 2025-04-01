import React from 'react';

interface DiagramProps {
    width?: number;
    height?: number;
    className?: string;
}

const Diagram: React.FC<DiagramProps> = ({ 
    width = 500, 
    height = 300,
    className = '' 
}) => {
    return (
        <div className={`diagram-container ${className}`}>
            <svg 
                width={width} 
                height={height} 
                viewBox={`0 0 ${width} ${height}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Your SVG elements go here */}
                <rect x="50" y="50" width="100" height="80" fill="#6495ED" rx="5" />
                <circle cx="300" cy="150" r="60" fill="#FF7F50" />
                <path d="M150 100 L250 100 L200 180 Z" fill="#9ACD32" />
                
                {/* Example text */}
                <text x="100" y="90" fontSize="14" fill="white" textAnchor="middle">Node 1</text>
                <text x="300" y="150" fontSize="14" fill="white" textAnchor="middle">Node 2</text>
            </svg>
        </div>
    );
};

export default Diagram;