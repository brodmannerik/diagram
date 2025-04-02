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
                height: 'calc(100vh - 80px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '0 16px'
            }}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                id="Layer_1" 
                width="100%"
                height="100%"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block',
                    margin: '0 auto'
                }}
            >
                <defs>
                    <style>
                        {`.cls-1,.cls-2{fill:#00f}.cls-4{fill:none;stroke:#00f;stroke-miterlimit:10}.cls-5,.cls-6{letter-spacing:0}.cls-2{font-size:20.11px;font-family:MyriadPro-Regular,"Myriad Pro"}.cls-13,.cls-14,.cls-15{letter-spacing:0}.cls-19{letter-spacing:-.01em}.cls-23,.cls-25,.cls-26,.cls-28,.cls-30{letter-spacing:0}`}
                    </style>
                </defs>
                <path d="M365.34 220.4s-106.46 174.63 25.37 387.84" className="cls-4"/>
                <rect width="140.77" height="83.79" x="785.09" y="448.31" className="cls-4" rx="17.49" ry="17.49"/>
                <rect width="140.77" height="83.79" x="604.1" y="136.61" className="cls-4" rx="17.49" ry="17.49"/>
                <rect width="140.77" height="83.79" x="315.86" y="136.61" className="cls-4" rx="17.49" ry="17.49"/>
                <path d="M880.05 404.74v11.8M885.95 410.64h-11.8M656.61 261.74v11.8M662.51 267.64h-11.8M581.76 771.19v11.8M587.65 777.09h-11.79M533.72 808.06v11.79M539.61 813.95h-11.79M467.8 820.35v11.79M473.7 826.24h-11.8M406.35 595.79v11.79M412.25 601.68h-11.79M328.15 737.67v11.8M334.05 743.57h-11.8M462.21 602.49v11.8M468.11 608.39h-11.79M912.45 705.27v11.8M918.35 711.17h-11.8M1047.63 780.13v11.79M1053.53 786.02h-11.8M1101.26 810.29v11.8M1107.16 816.19h-11.8M1257.67 647.18v11.79M1263.57 653.08h-11.8M1396.2 943.24v11.8M1402.1 949.14h-11.8M1262.14 897.43v11.8M1268.04 903.33h-11.8M963.84 457.25v11.8M969.74 463.15h-11.8M948.2 409.21v11.8M954.1 415.11h-11.8M969.74 888.81h-11.8M1022.25 893.28h-11.8M1188.4 236.04v11.8M1194.3 241.94h-11.8M1297.89 335.48v11.79M1303.79 341.37h-11.8M932.56 199.18v11.79M938.46 205.07h-11.8M913.57 258.39v11.79M919.47 264.29h-11.8M655.49 390.22c1.12 3.35 4.47 7.82 6.7 8.94 2.23 1.12 3.35 0 4.47-1.12 1.12-1.12 2.23-1.12 3.35 0s1.12 3.35 3.35 3.35 4.47-2.23 5.59-3.35 2.23-2.23 2.23-6.7-2.23-7.82-4.47-7.82h-5.06c-1.64 0-1.64-.52-3.31-1.93-1.68-1.42-3.91-1.42-5.03-.3s-1.12 2.23-4.47 3.35-4.47 2.23-3.35 5.59ZM893 173.48c1.12 3.35 4.47 7.82 6.7 8.94 2.23 1.12 3.35 0 4.47-1.12s2.23-1.12 3.35 0 1.12 3.35 3.35 3.35 4.47-2.23 5.59-3.35 2.23-2.23 2.23-6.7-2.23-7.82-4.47-7.82h-5.06c-1.64 0-1.64-.52-3.31-1.93s-3.91-1.42-5.03-.3-1.12 2.23-4.47 3.35-4.47 2.23-3.35 5.59ZM373.95 365.64c1.12 3.35 4.47 7.82 6.7 8.94s3.35 0 4.47-1.12c1.12-1.12 2.23-1.12 3.35 0s1.12 3.35 3.35 3.35 4.47-2.23 5.59-3.35 2.23-2.23 2.23-6.7-2.23-7.82-4.47-7.82h-5.06c-1.64 0-1.64-.52-3.31-1.93-1.68-1.42-3.91-1.42-5.03-.3-1.12 1.12-1.12 2.23-4.47 3.35-3.35 1.12-4.47 2.23-3.35 5.59ZM516.96 861.68c1.12 3.35 4.47 7.82 6.7 8.94 2.23 1.12 3.35 0 4.47-1.12s2.23-1.12 3.35 0 1.12 3.35 3.35 3.35 4.47-2.23 5.59-3.35 2.23-2.23 2.23-6.7-2.23-7.82-4.47-7.82h-5.06c-1.64 0-1.64-.52-3.31-1.93-1.68-1.42-3.91-1.42-5.03-.3-1.12 1.12-1.12 2.23-4.47 3.35-3.35 1.12-4.47 2.23-3.35 5.59Z" className="cls-4"/>
                <text style={{fontSize:"26.81px", fontFamily:"MyriadPro-Regular, Myriad Pro", fill:"#00f"}} transform="translate(828.27 500.79)"><tspan x="0" y="0">AFD</tspan></text>
                <rect width="140.77" height="83.79" x="706.88" y="820.35" className="cls-4" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(717.66 867.23)"><tspan x="0" y="0">Digital Ageism</tspan></text>
                <rect width="140.77" height="83.79" x="1215.22" y="920.89" className="cls-4" rx="17.5" ry="17.5"/>
                <text className="cls-2" transform="translate(1231.58 968.9)"><tspan x="0" y="0">Reichsbürger</tspan></text>
                <rect width="140.77" height="83.79" x="1211.86" y="666.17" className="cls-4" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(1224.88 714.17)"><tspan x="0" y="0">East Germans</tspan></text>
                <text className="cls-2" transform="translate(933.29 835.95)"><tspan x="0" y="0">Echo Chamber</tspan></text>
                <text className="cls-2" transform="translate(1071.82 366.72)"><tspan x="0" y="0">Institutional Response</tspan></text>
                <text className="cls-2" transform="translate(581.37 820.31)"><tspan x="0" y="0">Change in</tspan><tspan x="0" y="24.13">awareness</tspan></text>
                <text className="cls-2" transform="translate(395.91 659.43)"><tspan x="0" y="0">Rightwing</tspan><tspan x="0" y="24.13">Terrorism</tspan></text>
                <text className="cls-2" transform="translate(250.67 796.85)"><tspan x="0" y="0">Media Scrutiny</tspan></text>
                <text className="cls-2" transform="translate(883.01 640.44)"><tspan x="0" y="0">Change in</tspan><tspan x="0" y="24.13">voters</tspan></text>
                <rect width="140.77" height="83.79" x="1547.03" y="792.41" className="cls-4" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(1571.21 830.36)"><tspan x="0" y="0">Right wing</tspan><tspan x="0" y="24.13">Youtube</tspan></text>
                <text className="cls-2" transform="translate(1639.36 710.82)"><tspan x="0" y="0">Social media</tspan><tspan x="0" y="24.13">work</tspan></text>
                <rect width="140.77" height="83.79" x="1239.79" y="180.18" className="cls-4" rx="17.49" ry="17.49"/>
                <text className="cls-2" transform="translate(1252.81 229.3)"><tspan x="0" y="0">Conspiracists</tspan></text>
                <text className="cls-2" transform="translate(784.62 229.3)"><tspan x="0" y="0">Shared Beliefs</tspan></text>
                <text className="cls-2" transform="translate(381.3 468.39)"><tspan x="0" y="0">B1</tspan></text>
                <text className="cls-2" transform="translate(1018.11 215.9)"><tspan x="0" y="0">Mainstreaming</tspan><tspan x="0" y="24.13">Extremism</tspan></text>
                <text className="cls-2" transform="translate(772.33 346.61)"><tspan x="0" y="0">Far-right ideology</tspan></text>
                <text className="cls-2" transform="translate(639.46 186.85)"><tspan x="0" y="0">Alt right</tspan></text>
                <text className="cls-2" transform="translate(351.22 186.85)"><tspan x="0" y="0">Alt light</tspan></text>
                <text className="cls-2" transform="translate(514.33 211.43)"><tspan x="0" y="0">less</tspan><tspan x="0" y="24.13">radical</tspan></text>
                <text className="cls-2" transform="translate(535.56 337.67)"><tspan x="0" y="0">antisemitism</tspan></text>
                <path d="M570.03 854.42v16.57l-27.57-8.29M679.51 871.18v-16.57l27.57 8.29" className="cls-1"/>
                <path d="M570.03 859.45h109.48M570.03 866.15h109.48" className="cls-4"/>
                <path d="M378.98 329.33h16.57l-8.28 27.56" className="cls-1"/>
                <path d="M384.01 329.33V219.84M390.71 329.33V219.84M616.39 852.74h16.76l-8.38 10.03-8.38-10.03zM633.15 872.83h-16.76l8.38-10.03 8.38 10.03zM1604.66 660.58c1.12 3.35 4.47 7.82 6.7 8.94s3.35 0 4.47-1.12c1.12-1.12 2.23-1.12 3.35 0s1.12 3.35 3.35 3.35 4.47-2.23 5.59-3.35 2.23-2.23 2.23-6.7c0-4.47-2.23-7.82-4.47-7.82h-5.06c-1.63 0-1.64-.52-3.31-1.93-1.68-1.42-3.91-1.42-5.03-.3s-1.12 2.23-4.47 3.35-4.47 2.23-3.35 5.59Z" className="cls-4"/>
                <path d="M1625.79 698.01h-16.57l8.29-27.56M1608.52 764.75h16.56l-8.28 27.57" className="cls-1"/>
                <path d="M1620.25 698.01v66.74M1613.54 698.01v66.74M1626.95 712.8v16.76l-10.03-8.38 10.03-8.38zM1606.87 729.56V712.8l10.03 8.38-10.03 8.38zM843.84 708.62c1.12 3.35 4.47 7.82 6.7 8.94 2.23 1.12 3.35 0 4.47-1.12 1.12-1.12 2.23-1.12 3.35 0s1.12 3.35 3.35 3.35 4.47-2.23 5.59-3.35 2.23-2.23 2.23-6.7-2.23-7.82-4.47-7.82H860c-1.64 0-1.64-.52-3.31-1.93-1.68-1.42-3.91-1.42-5.03-.3-1.12 1.12-1.12 2.23-4.47 3.35-3.35 1.12-4.47 2.23-3.35 5.59Z" className="cls-4"/>
                <path d="M851.34 673.65h16.56l-8.28 27.56M868.32 560.59h-16.56l8.28-27.56" className="cls-1"/>
                <path d="M856.88 673.65V559.48M863.58 673.65V558.36M850.18 658.85V642.1l10.02 8.38-10.02 8.37zM870.26 642.1v16.75l-10.03-8.37 10.03-8.38z" className="cls-4"/>
                <path d="M484 166.22v16.56l-27.56-8.28" className="cls-1"/>
                <path d="M484 171.24h119.54M484 177.95h120.66M530.36 164.54h16.76l-8.38 10.03-8.38-10.03zM547.12 184.62h-16.76l8.38-10.02 8.38 10.02z" className="cls-4"/>
                <path d="M772.9 166.22v16.56l-27.57-8.28" className="cls-1"/>
                <path d="M772.9 171.24h119.54M772.9 177.95h122.89M819.26 164.54h16.76l-8.38 10.03-8.38-10.03zM836.02 184.62h-16.76l8.38-10.02 8.38 10.02zM377.03 312.56V295.8l10.03 8.38-10.03 8.38zM397.69 295.8v16.76l-10.03-8.38 10.03-8.38z" className="cls-4"/>
                <path d="M660.52 353.91h16.57l-8.29 27.56" className="cls-1"/>
                <path d="M665.55 353.91V220.96M672.25 353.91V220.96M678.38 320.38v16.76l-10.03-8.38 10.03-8.38zM658.3 337.14v-16.76l10.03 8.38-10.03 8.38z" className="cls-4"/>
                <path d="M785.09 482.95s-92.73 2.23-157.53 88.26-34.63 183.22-29.05 196.63" className="cls-1"/>
                <path d="m605.78 763.93-16.76 7.82 21.78 24.02-5.02-31.84zM1040.42 779.7l-16.75-7.82-4.43 32.13 21.18-24.31zM1297.24 905.68l-12.58-13.56-16.18 28.1 28.76-14.54zM1089.28 840.62l1.11-18.46-31.5 7.73 30.39 10.73zM1387.82 978.28l-.29-18.49-30.82 10.07 31.11 8.42zM945.28 866.89l10.2 15.42 20.55-25.09-30.75 9.67zM887.9 703.28l17.84 4.88-1.07-32.41-16.77 27.53zM958.14 490.21l-1.71-18.41-29.96 12.4 31.67 6.01zM1280.74 632.63l-17.34 6.42 19.74 25.73-2.4-32.15zM1025.55 886.97l15.37-10.29-25.19-20.41 9.82 30.7zM1188.52 1022.3l25.98-19.41-32.17 1.99 6.19 17.42M543.2 786.08l-8.25 16.55 32 5.24-23.75-21.79zM319.75 751.92l-18.29-2.71 4.94 32.05 13.35-29.34zM486.82 831.55l2.85 18.27 29.13-14.24-31.98-4.03zM397.9 602.18l-14.77 11.12 26.29 18.98-11.52-30.1zM454.19 603.51l-18.44-1.42 7.19 31.63 11.25-30.21zM650.17 273.21l-15.09-10.7-10.1 30.81 25.19-20.11zM889.15 407.64l18.02-4.15-16.29-28.04-1.73 32.19zM1188.96 232.1l-.1-18.49-30.93 9.76 31.03 8.73zM1297.33 370.64l-.11-18.5-30.92 9.76 31.03 8.74z" className="cls-1"/>
                <path d="M663.48 220.4s-5.19 24.02-21.95 47.48M556.06 363.41s-84.91 87.14-110.6 241.32M456.32 704.21s27.75 60.27 83.3 91.55M950.99 873.41s-25.7 24.98-103.34 19.75M821.45 904.14s99.38 175.96 365.27 108.93M1215.22 968.9s-100.55 7.86-183.22-90.46M890.53 448.31s9.73-15.08 6.61-43.57M928.65 801.91s-42.79-29.05-32.01-96.64" className="cls-1"/>
                <path d="M1239.79 222.8h-51.39" className="cls-4"/>
                <path d="m938.71 232.1-.11-18.49-30.92 9.76 31.03 8.73zM932.92 421.43l-17.58-5.75-.52 32.43 18.1-26.68zM920.35 256.07l13.59-12.54-28.05-16.28 14.46 28.82z" className="cls-1"/>
                <path d="M989.54 222.8h-51.39" className="cls-4"/>
                <path d="M921.68 319.57s28.13-29.86 4.98-70.1M925.86 505.13s179.87 70.54 106.14 271.95" className="cls-1"/>
                <path d="M1583.27 792.41s-18.37-351.92-639.54-309.47" className="cls-4"/>
                <path d="M1582.78 875.09s1.12 90.49-205.18 93.96M422.55 463.4h-12.59l6.3-20.95" className="cls-1"/>
                <path d="M416.38 461.05c.02.41.03.81.03 1.22 0 14.5-11.75 26.25-26.25 26.25s-26.25-11.75-26.25-26.25 11.75-26.25 26.25-26.25h.63" className="cls-4"/>
                <text className="cls-2" transform="translate(523.19 725.35)"><tspan x="0" y="0">B2</tspan></text>
                <path d="M564.44 720.35h-12.59l6.29-20.94" className="cls-1"/>
                <path d="M558.27 718.01c.02.41.03.81.03 1.22 0 14.5-11.75 26.25-26.25 26.25s-26.25-11.75-26.25-26.25 11.75-26.25 26.25-26.25h.63" className="cls-4"/>
                <text className="cls-2" transform="translate(882.93 853.83)"><tspan x="0" y="0">R3</tspan></text>
                <path d="M924.18 848.83h-12.59l6.3-20.94" className="cls-1"/>
                <path d="M918.01 846.49c.02.41.03.81.03 1.22 0 14.5-11.75 26.25-26.25 26.25s-26.25-11.75-26.25-26.25 11.75-26.25 26.25-26.25h.63" className="cls-4"/>
                <text className="cls-2" transform="translate(1285.12 566.7)"><tspan x="0" y="0">R2</tspan></text>
                <path d="M1326.38 561.71h-12.59l6.29-20.95" className="cls-1"/>
                <path d="M1320.21 559.37c.02.41.03.81.03 1.22 0 14.5-11.75 26.25-26.25 26.25s-26.25-11.75-26.25-26.25 11.75-26.25 26.25-26.25h.63" className="cls-4"/>
                <text className="cls-2" transform="translate(798.02 413.64)"><tspan x="0" y="0">R1</tspan></text>
                <path d="M839.27 408.65h-12.59l6.3-20.94" className="cls-1"/>
                <path d="M833.1 406.31c.02.41.03.81.03 1.22 0 14.5-11.75 26.25-26.25 26.25s-26.25-11.75-26.25-26.25 11.75-26.25 26.25-26.25h.63" className="cls-4"/>
                <path d="M1362.22 263.97s27.28 97.2-67.69 97.2M1063.53 361.39s-119.22-3.57-141.85 65.14M387.94 683.56s-67.79-.08-77.66 71.98M301.46 806.03s-17.36 73.14 188.69 34.42M926.47 495.11s276.46-8.81 349.08 149.84M1282.25 749.96s-10.05 89.38-199.98 80.44M1320.08 749.96s44.84 90.49-36.94 155.67" className="cls-1"/>
            </svg>
        </div>
    );
};

export default Diagram;