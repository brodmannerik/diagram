import React from 'react';

interface DiagramProps {
    className?: string;
}

const Diagram: React.FC<DiagramProps> = ({ 
    className = '' 
}) => {
    return (
        <div 
            className={`diagram-container ${className}`}
            style={{
                width: '100%',
                height: 'calc(100vh - 80px)', // Subtract header height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                // backgroundColor: '#f5f5f5' // Optional: helps visualize the container
            }}
        >
            <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 500 300"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    display: 'block',  // This helps with alignment
                    margin: '0 auto',  // Center horizontally
                    maxWidth: '90%',   // Slightly reduce from 100% to ensure it's not touching edges
                    maxHeight: '90%'   // Same for height
                }}
            >
                {/* Center group for all elements */}
                <g transform="translate(250, 150)">
                    {/* Adjusted coordinates to be centered around origin */}
                    <rect x="-150" y="-100" width="100" height="80" fill="#6495ED" rx="5" />
                    <circle cx="50" cy="0" r="60" fill="#FF7F50" />
                    <path d="M-50 -50 L50 -50 L0 30 Z" fill="#9ACD32" />
                    
                    {/* Adjusted text positions */}
                    <text x="-100" y="-60" fontSize="14" fill="white" textAnchor="middle">Node 1</text>
                    <text x="50" y="0" fontSize="14" fill="white" textAnchor="middle">Node 2</text>
                </g>
            </svg>
        </div>
    );
};

export default Diagram;