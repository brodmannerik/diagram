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
                overflow: 'hidden'
            }}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                id="Layer_1" 
                viewBox="0 0 1920 1080"
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block',
                    margin: '0 auto'
                }}
            >
                <defs>
                    <style>
                        {`.cls-1,.cls-2{fill:#00f}.cls-3{fill:none;stroke:#00f;stroke-miterlimit:10}.cls-4{letter-spacing:0}.cls-2{font-family:MyriadPro-Regular,"Myriad Pro";font-size:20.11px}.cls-5{letter-spacing:0}`}
                    </style>
                </defs>
                <path d="M361.66 238.46S255.2 413.09 387.03 626.3" className="cls-3"/>
                <rect width="140.77" height="83.79" x="312.18" y="154.67" className="cls-3" rx="17.49" ry="17.49"/>
                <path d="M402.67 613.85v11.79M408.57 619.74h-11.8" className="cls-3"/>
                <text className="cls-2" transform="translate(336.54 204.91)"><tspan x="0" y="0" className="cls-5">S</tspan><tspan x="10.03" y="0" className="cls-4">Something</tspan></text>
                <rect width="140.77" height="83.79" x="406.18" y="635.67" className="cls-3" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(430.54 685.91)"><tspan x="0" y="0" className="cls-5">S</tspan><tspan x="10.03" y="0" className="cls-4">Something</tspan></text>
                <path d="m394.21 620.24-14.77 11.12 26.3 18.98-11.53-30.1z" className="cls-1"/>
                <path d="M477.05 719.37s78.9 188.68 328.91 207.09M805.04 906.48l9.56 6.93M813.28 905.17l-6.92 9.55" className="cls-3"/>
                <path d="m805.25 917.08.34 18.49 30.8-10.15-31.14-8.34z" className="cls-1"/>
                <rect width="140.77" height="83.79" x="835.22" y="884.39" className="cls-3" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(859.58 934.63)"><tspan x="0" y="0" className="cls-5">S</tspan><tspan x="10.03" y="0" className="cls-4">Something</tspan></text>
                <path d="M974.64 930.41s169.92 113.82 388.57-8.78M1351.43 905.47l11.79.5M1357.58 899.82l-.51 11.79" className="cls-3"/>
                <path d="m1357.46 914.19 10.48 15.23 20.09-25.46-30.57 10.23z" className="cls-1"/>
                <rect width="140.77" height="83.79" x="1372.79" y="821.11" className="cls-3" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(1397.14 871.35)"><tspan x="0" y="0" className="cls-5">S</tspan><tspan x="10.03" y="0" className="cls-4">Something</tspan></text>
                <path d="M1467.01 821.48s170.6-112.8 141.92-361.84M1589.47 464.27l5.01-10.68M1586.64 456.43l10.68 5.01" className="cls-3"/>
                <path d="m1599.84 462.08 18.1-3.79-15.73-28.36-2.37 32.15z" className="cls-1"/>
                <rect width="140.77" height="83.79" x="1516" y="346.6" className="cls-3" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(1540.36 396.84)"><tspan x="0" y="0" className="cls-5">S</tspan><tspan x="10.03" y="0" className="cls-4">Something</tspan></text>
                <path d="M1586 347.55s-75.87-189.92-325.55-212.34M1261.04 155.2l-9.44-7.08M1252.78 156.38l7.08-9.44" className="cls-3"/>
                <path d="m1261 144.6-.04-18.49-30.96 9.65 31 8.84z" className="cls-1"/>
                <rect width="140.77" height="83.79" x="1088" y="93.6" className="cls-3" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(1112.36 143.84)"><tspan x="0" y="0" className="cls-5">S</tspan><tspan x="10.03" y="0" className="cls-4">Something</tspan></text>
                <path d="M1088.39 140.22s-190.83-73.56-377.08 94.23M726.36 247.61l-11.61 2.11M721.61 254.47l-2.11-11.61" className="cls-3"/>
                <path d="m718.56 240.43-13.58-12.54L691 257.15l27.56-16.72z" className="cls-1"/>
            </svg>
        </div>
    );
};

export default Diagram;