"use client";

export default function AnimatedLocationSVG() {
  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ background: "#02050A" }}>
      <svg
        viewBox="0 0 1600 900"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        role="img"
        aria-labelledby="re-title re-desc"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="re-title">Realistic Global Presence - All Continents &amp; Countries</title>
        <desc id="re-desc">Photorealistic 3D Earth globe showing real continents, active countries, and global elevator supply routes from Fuji Fenix headquarters.</desc>

        <defs>
          {/* Atmospheric Glow Gradient */}
          <radialGradient id="re-atmo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="65%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
          </radialGradient>

          {/* Golden HQ Route Gradient */}
          <linearGradient id="re-route-hq" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>

          {/* Cyan International Route Gradient */}
          <linearGradient id="re-route-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#67e8f9" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>

          {/* Text Gradient */}
          <linearGradient id="re-text" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Animated Shimmer Title Gradient */}
          <linearGradient id="re-shimmer-title" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#38bdf8">
              <animate attributeName="stop-color" values="#38bdf8;#67e8f9;#93c5fd;#38bdf8" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Animated Line Accent Gradient */}
          <linearGradient id="re-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          {/* Filters */}
          <filter id="re-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-gold-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-particle" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-marker" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-route-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Earth Circular Mask to ensure crisp edges */}
          <clipPath id="re-earth-circle">
            <circle cx="1095" cy="455" r="338" />
          </clipPath>

          {/* Styles & Keyframe Animations */}
          <style>{`
            @keyframes re-draw { to{stroke-dashoffset:-320} }
            @keyframes re-twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.65} }
            @keyframes re-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
            @keyframes re-orbit { from{transform:rotate(0deg) translateX(365px) rotate(0deg)} to{transform:rotate(360deg) translateX(365px) rotate(-360deg)} }
            @keyframes re-pulse-gold { 0%,100%{r:5px;opacity:1} 50%{r:8px;opacity:0.85} }
            @keyframes re-radar { 0%{r:6px;opacity:0.9} 100%{r:26px;opacity:0} }
            @keyframes re-badge-glow { 0%,100%{stroke-opacity:0.4} 50%{stroke-opacity:0.95} }
            @keyframes re-fadeup { 0%{opacity:0} 100%{opacity:1} }
            @keyframes re-text-glow {
              0%, 100% {
                filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4));
              }
              50% {
                filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.85)) drop-shadow(0 0 32px rgba(14, 165, 233, 0.45));
              }
            }

            .re-route-hq-anim { stroke-dasharray:12 8; animation: re-draw 3.2s linear infinite; }
            .re-route-cyan-anim { stroke-dasharray:10 8; animation: re-draw 4.5s linear infinite; }
            .re-star { animation: re-twinkle 3.5s ease-in-out infinite; }
            .re-bg-p { animation: re-float 6s ease-in-out infinite; }
            .re-orbit-sat { animation: re-orbit 30s linear infinite; transform-origin:1095px 455px; }
            .re-radar-wave { animation: re-radar 2.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
            .re-badge-active { animation: re-badge-glow 3s ease-in-out infinite; }
            .re-animated-title { animation: re-text-glow 3.5s ease-in-out infinite; }

            .re-t-eb { animation: re-fadeup 0.6s ease-out 0.1s both; }
            .re-t-hd { animation: re-fadeup 0.6s ease-out 0.3s both; }
            .re-t-ac { animation: re-fadeup 0.5s ease-out 0.5s both; }
            .re-t-ds { animation: re-fadeup 0.6s ease-out 0.7s both; }

            @media(prefers-reduced-motion:reduce){
              .re-route-hq-anim,.re-route-cyan-anim,.re-star,.re-bg-p,.re-orbit-sat,
              .re-radar-wave,.re-badge-active,.re-animated-title,.re-t-eb,.re-t-hd,.re-t-ac,.re-t-ds{ animation:none!important; opacity:1!important; }
            }
          `}</style>
        </defs>

        {/* ===== DEEP SPACE BACKGROUND ===== */}
        <rect width="1600" height="900" fill="#02050A" />

        {/* Atmosphere Halo behind Earth */}
        <circle cx="1095" cy="455" r="430" fill="url(#re-atmo-glow)" />
        <circle cx="1095" cy="455" r="365" fill="#0369a1" opacity="0.12" />

        {/* ===== COSMIC STARS ===== */}
        <g id="stars">
          {[
            [28,22],[85,48],[148,15],[225,40],[308,12],[415,35],[528,18],[638,45],[755,28],[878,52],
            [998,18],[1148,42],[1298,25],[1448,50],[1548,32],[48,868],[198,848],[398,878],[698,858],[1098,868],
            [1398,852],[1548,872],[42,598],[1552,398],[1518,598],[78,298],[1498,148],[72,748],[1538,698],[298,848],
            [1200,80],[400,820],[800,60],[1300,830],[160,700],[1450,150],[60,450],[1540,480],[950,40],[500,860]
          ].map(([x,y],i) => (
            <circle key={`s${i}`} className="re-star" cx={x} cy={y} r={i%5===0?1.2:i%3===0?0.8:0.45}
              fill={i%6===0?"#bae6fd":"#ffffff"} style={{animationDelay:`${i*0.3}s`,animationDuration:`${2.5+i%4}s`}} />
          ))}
        </g>

        {/* ===== FLOATING PARTICLES ===== */}
        <g id="bg-particles">
          {[[100,130],[250,70],[420,170],[580,85],[740,155],[900,75],[1060,130],[1220,65],[1380,125],
            [90,770],[240,810],[390,740],[540,790],[690,750],[840,800],[990,760],[1140,820],[1290,780],[1440,830]
          ].map(([x,y],i) => (
            <circle key={`bp${i}`} className="re-bg-p" cx={x} cy={y} r={0.6+(i%3)*0.3} fill="#38bdf8" opacity="0.1"
              style={{animationDelay:`${(i%6)*0.8}s`,animationDuration:`${4+i%3}s`}} />
          ))}
        </g>

        {/* ===== PHOTOREALISTIC SATELLITE EARTH GLOBE ===== */}
        <g id="photorealistic-earth" clipPath="url(#re-earth-circle)">
          <image
            href="/realistic-earth.jpg"
            xlinkHref="/realistic-earth.jpg"
            x="720"
            y="80"
            width="750"
            height="750"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* Subtle Earth Atmospheric Rim Reflection */}
        <circle cx="1095" cy="455" r="338" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.35" />

        {/* ===== SATELLITE ORBIT ===== */}
        <circle className="re-orbit-sat" r="3" fill="#e0f2fe" filter="url(#re-glow)" style={{transformOrigin:"1095px 455px"}}>
          <animateMotion dur="30s" repeatCount="indefinite" path="M1095 455 m-365 0 a365 95 20 1 0 730 0 a365 95 20 1 0 -730 0" />
        </circle>

        {/* ===== GLOBAL NETWORK CONNECTION ROUTES ===== */}
        <g id="routes" filter="url(#re-route-glow)">
          {/* Shanghai HQ (1240, 320) Routes radiating worldwide */}
          {/* Shanghai → Pakistan (1085, 360) */}
          <path d="M1240 320 Q1160 310 1085 360" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Shanghai → India (1135, 415) */}
          <path d="M1240 320 Q1190 350 1135 415" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Shanghai → Singapore (1245, 465) */}
          <path d="M1240 320 Q1260 390 1245 465" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Shanghai → Tokyo / Japan (1320, 260) */}
          <path d="M1240 320 Q1280 275 1320 260" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Shanghai → Dubai / Middle East (1005, 345) */}
          <path d="M1240 320 Q1110 260 1005 345" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Shanghai → Australia (1290, 610) */}
          <path d="M1240 320 Q1310 470 1290 610" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Shanghai → Europe / UK & Germany (930, 220) */}
          <path d="M1240 320 Q1060 160 930 220" fill="none" stroke="url(#re-route-hq)" strokeWidth="2.2" strokeLinecap="round" className="re-route-hq-anim" />

          {/* Cross-Continental Connections */}
          {/* Europe → Middle East */}
          <path d="M930 220 Q950 280 1005 345" fill="none" stroke="url(#re-route-cyan)" strokeWidth="1.6" strokeLinecap="round" className="re-route-cyan-anim" />

          {/* Middle East → Africa / South Africa (925, 610) */}
          <path d="M1005 345 Q980 480 925 610" fill="none" stroke="url(#re-route-cyan)" strokeWidth="1.6" strokeLinecap="round" className="re-route-cyan-anim" />

          {/* Singapore → Australia */}
          <path d="M1245 465 Q1280 535 1290 610" fill="none" stroke="url(#re-route-cyan)" strokeWidth="1.6" strokeLinecap="round" className="re-route-cyan-anim" />

          {/* Trans-Pacific Westward Link to Americas */}
          <path d="M1320 260 Q1430 330 1520 400" fill="none" stroke="url(#re-route-cyan)" strokeWidth="1.6" strokeDasharray="6 6" opacity="0.6" />
        </g>

        {/* ===== DATA PULSE PARTICLES ===== */}
        <g id="particles" filter="url(#re-particle)">
          {/* Shanghai → Pakistan */}
          <circle r="2.8" fill="#fbbf24" opacity="0.95"><animateMotion dur="3.2s" repeatCount="indefinite" path="M1240 320 Q1160 310 1085 360" /></circle>
          {/* Shanghai → India */}
          <circle r="2.8" fill="#fbbf24" opacity="0.95"><animateMotion dur="3s" repeatCount="indefinite" path="M1240 320 Q1190 350 1135 415" /></circle>
          {/* Shanghai → Singapore */}
          <circle r="2.8" fill="#fbbf24" opacity="0.95"><animateMotion dur="3.5s" repeatCount="indefinite" path="M1240 320 Q1260 390 1245 465" /></circle>
          {/* Shanghai → Middle East */}
          <circle r="2.8" fill="#fbbf24" opacity="0.95"><animateMotion dur="4s" repeatCount="indefinite" path="M1240 320 Q1110 260 1005 345" /></circle>
          {/* Shanghai → Australia */}
          <circle r="2.8" fill="#fbbf24" opacity="0.95"><animateMotion dur="4.2s" repeatCount="indefinite" path="M1240 320 Q1310 470 1290 610" /></circle>
          {/* Shanghai → Europe */}
          <circle r="2.8" fill="#fbbf24" opacity="0.95"><animateMotion dur="4.5s" repeatCount="indefinite" path="M1240 320 Q1060 160 930 220" /></circle>
        </g>

        {/* ===== CONTINENT LABELS (OVER REALISTIC GLOBE) ===== */}
        <g id="continents-layer">
          {/* 1. ASIA */}
          <g transform="translate(1185, 175)" className="re-badge-active">
            <rect width="82" height="24" rx="5" fill="#021329" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1" />
            <text x="41" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="800" letterSpacing="1.8">ASIA</text>
          </g>

          {/* 2. EUROPE */}
          <g transform="translate(860, 160)" className="re-badge-active">
            <rect width="94" height="24" rx="5" fill="#021329" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1" />
            <text x="47" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="800" letterSpacing="1.8">EUROPE</text>
          </g>

          {/* 3. MIDDLE EAST */}
          <g transform="translate(930, 290)" className="re-badge-active">
            <rect width="118" height="24" rx="5" fill="#021329" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1" />
            <text x="59" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="10.5" fontWeight="800" letterSpacing="1.5">MIDDLE EAST</text>
          </g>

          {/* 4. AFRICA */}
          <g transform="translate(845, 430)" className="re-badge-active">
            <rect width="90" height="24" rx="5" fill="#021329" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1" />
            <text x="45" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="800" letterSpacing="1.8">AFRICA</text>
          </g>

          {/* 5. OCEANIA / AUSTRALIA */}
          <g transform="translate(1290, 525)" className="re-badge-active">
            <rect width="96" height="24" rx="5" fill="#021329" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1" />
            <text x="48" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="10.5" fontWeight="800" letterSpacing="1.8">OCEANIA</text>
          </g>

          {/* 6. AMERICAS INDICATOR (Connecting Pacific & Atlantic) */}
          <g transform="translate(1380, 420)" className="re-badge-active">
            <rect width="135" height="24" rx="5" fill="#021329" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1" />
            <text x="67.5" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="800" letterSpacing="1.4">THE AMERICAS ➔</text>
          </g>
        </g>

        {/* ===== REALISTIC COUNTRY PINS & LABELS ===== */}
        <g id="country-pins">
          {/* ===== 1. CHINA (GLOBAL HQ & MANUFACTURING CENTER) ===== */}
          <g>
            {/* Pulsing Radar Wave */}
            <circle cx="1240" cy="320" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="re-radar-wave" />
            <circle cx="1240" cy="320" r="16" fill="none" stroke="#f59e0b" strokeWidth="1" className="re-radar-wave" style={{ animationDelay: "1.2s" }} />

            {/* Glowing Center Beacon */}
            <circle cx="1240" cy="320" r="5.5" fill="#fbbf24" filter="url(#re-gold-glow)" />

            {/* Connecting Pin Line */}
            <line x1="1240" y1="320" x2="1295" y2="305" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />

            {/* Gold Tag */}
            <g transform="translate(1295, 290)">
              <rect width="138" height="28" rx="6" fill="#1c1404" fillOpacity="0.96" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="69" y="19" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="800" letterSpacing="0.8">★ CHINA (HQ &amp; FACTORY)</text>
            </g>
          </g>

          {/* ===== 2. PAKISTAN ===== */}
          <g>
            <circle cx="1085" cy="360" r="4" fill="#38bdf8" filter="url(#re-marker)" />
            <line x1="1085" y1="360" x2="1055" y2="385" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(995, 385)">
              <rect width="84" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="1" />
              <text x="42" y="15" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">🇵🇰 Pakistan</text>
            </g>
          </g>

          {/* ===== 3. INDIA ===== */}
          <g>
            <circle cx="1135" cy="415" r="4" fill="#38bdf8" filter="url(#re-marker)" />
            <line x1="1135" y1="415" x2="1145" y2="445" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(1120, 445)">
              <rect width="65" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="32.5" y="15" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">🇮🇳 India</text>
            </g>
          </g>

          {/* ===== 4. JAPAN ===== */}
          <g>
            <circle cx="1320" cy="260" r="3.8" fill="#e0f2fe" filter="url(#re-marker)" />
            <line x1="1320" y1="260" x2="1350" y2="245" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(1350, 235)">
              <rect width="68" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="34" y="15" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">🇯🇵 Japan</text>
            </g>
          </g>

          {/* ===== 5. SINGAPORE & SE ASIA ===== */}
          <g>
            <circle cx="1245" cy="465" r="3.8" fill="#38bdf8" filter="url(#re-marker)" />
            <line x1="1245" y1="465" x2="1285" y2="465" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(1285, 454)">
              <rect width="84" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="42" y="15" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">🇸🇬 Singapore</text>
            </g>
          </g>

          {/* ===== 6. UAE & SAUDI ARABIA ===== */}
          <g>
            <circle cx="1005" cy="345" r="4.2" fill="#38bdf8" filter="url(#re-marker)" />
            <line x1="1005" y1="345" x2="945" y2="335" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(845, 324)">
              <rect width="100" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="1" />
              <text x="50" y="15" textAnchor="middle" fill="#f8fafc" fontSize="9.5" fontWeight="700">🇦🇪 UAE / Saudi</text>
            </g>
          </g>

          {/* ===== 7. EUROPE (UK & GERMANY) ===== */}
          <g>
            <circle cx="930" cy="220" r="4" fill="#fbbf24" filter="url(#re-marker)" />
            <line x1="930" y1="220" x2="880" y2="230" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(775, 220)">
              <rect width="105" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="52.5" y="15" textAnchor="middle" fill="#f8fafc" fontSize="9.5" fontWeight="600">🇬🇧 UK • 🇩🇪 Germany</text>
            </g>
          </g>

          {/* ===== 8. SOUTH AFRICA ===== */}
          <g>
            <circle cx="925" cy="610" r="3.8" fill="#38bdf8" filter="url(#re-marker)" />
            <line x1="925" y1="610" x2="945" y2="640" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(900, 640)">
              <rect width="100" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="50" y="15" textAnchor="middle" fill="#f8fafc" fontSize="9.5" fontWeight="600">🇿🇦 South Africa</text>
            </g>
          </g>

          {/* ===== 9. AUSTRALIA ===== */}
          <g>
            <circle cx="1290" cy="610" r="4" fill="#38bdf8" filter="url(#re-marker)" />
            <line x1="1290" y1="610" x2="1320" y2="635" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <g transform="translate(1310, 635)">
              <rect width="85" height="22" rx="4" fill="#041426" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="42.5" y="15" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">🇦🇺 Australia</text>
            </g>
          </g>
        </g>

        {/* ===== LEFT INFO PANEL ===== */}
        <g id="text">
          {/* Top Eyebrow */}
          <g className="re-t-eb">
            <line x1="90" y1="150" x2="150" y2="150" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="x2" values="150;210;150" dur="3.5s" repeatCount="indefinite" />
            </line>
            <circle cx="90" cy="150" r="3" fill="#38bdf8" />
            <text x="165" y="154" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="11" fill="#38bdf8" letterSpacing="3" fontWeight="700">FUJI FENIX WORLDWIDE</text>
          </g>

          {/* Main Headline */}
          <g className="re-t-hd re-animated-title">
            <text x="90" y="215" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="48" fontWeight="900" fill="url(#re-shimmer-title)" letterSpacing="-0.5">Global Reach,</text>
            <text x="90" y="275" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="48" fontWeight="900" fill="url(#re-shimmer-title)" letterSpacing="-0.5">Worldwide Impact</text>
          </g>

          {/* Accent Line */}
          <line className="re-t-ac" x1="90" y1="305" x2="260" y2="305" stroke="url(#re-line-grad)" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="x2" values="200;340;200" dur="4s" repeatCount="indefinite" />
          </line>

          {/* Subtitle / Description */}
          <g className="re-t-ds">
            <text x="90" y="338" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="15" fill="#94A3B8" letterSpacing="0.2">
              <tspan x="90" dy="0">Delivering world-class elevators and escalators</tspan>
              <tspan x="90" dy="24">across all 6 continents and 30+ countries</tspan>
              <tspan x="90" dy="24">from our modern Shanghai manufacturing center.</tspan>
            </text>
          </g>

          {/* Continents & Coverage Dashboard Grid (Placed cleanly below description) */}
          <g transform="translate(90, 430)">
            <rect width="530" height="245" rx="14" fill="#041226" fillOpacity="0.88" stroke="#1e3a5f" strokeWidth="0.8" />

            <text x="24" y="32" fill="#38bdf8" fontSize="11" fontWeight="700" letterSpacing="1.5">CONTINENTS &amp; REGIONAL HUBS</text>
            <circle cx="510" cy="28" r="4.5" fill="#22c55e" />
            <text x="500" y="32" textAnchor="end" fill="#86efac" fontSize="9.5" fontWeight="600">ACTIVE WORLDWIDE</text>

            {/* Grid Items */}
            {/* Asia Pacific */}
            <g transform="translate(24, 48)">
              <rect width="154" height="50" rx="6" fill="#071a33" stroke="#0284c7" strokeWidth="0.7" />
              <text x="12" y="20" fill="#7dd3fc" fontSize="10.5" fontWeight="700">🌏 ASIA PACIFIC</text>
              <text x="12" y="38" fill="#94a3b8" fontSize="8.5">China (HQ), PK, IN, SG, JP</text>
            </g>

            {/* Middle East */}
            <g transform="translate(188, 48)">
              <rect width="154" height="50" rx="6" fill="#071a33" stroke="#0284c7" strokeWidth="0.7" />
              <text x="12" y="20" fill="#7dd3fc" fontSize="10.5" fontWeight="700">🌍 MIDDLE EAST</text>
              <text x="12" y="38" fill="#94a3b8" fontSize="8.5">UAE, Saudi Arabia, Qatar</text>
            </g>

            {/* Europe */}
            <g transform="translate(352, 48)">
              <rect width="154" height="50" rx="6" fill="#071a33" stroke="#0284c7" strokeWidth="0.7" />
              <text x="12" y="20" fill="#7dd3fc" fontSize="10.5" fontWeight="700">🌍 EUROPE</text>
              <text x="12" y="38" fill="#94a3b8" fontSize="8.5">UK, Germany, France</text>
            </g>

            {/* North America */}
            <g transform="translate(24, 110)">
              <rect width="154" height="50" rx="6" fill="#071a33" stroke="#0284c7" strokeWidth="0.7" />
              <text x="12" y="20" fill="#7dd3fc" fontSize="10.5" fontWeight="700">🌎 NORTH AMERICA</text>
              <text x="12" y="38" fill="#94a3b8" fontSize="8.5">USA, Canada, Mexico</text>
            </g>

            {/* South America */}
            <g transform="translate(188, 110)">
              <rect width="154" height="50" rx="6" fill="#071a33" stroke="#0284c7" strokeWidth="0.7" />
              <text x="12" y="20" fill="#7dd3fc" fontSize="10.5" fontWeight="700">🌎 SOUTH AMERICA</text>
              <text x="12" y="38" fill="#94a3b8" fontSize="8.5">Brazil, Argentina, Chile</text>
            </g>

            {/* Africa & Oceania */}
            <g transform="translate(352, 110)">
              <rect width="154" height="50" rx="6" fill="#071a33" stroke="#0284c7" strokeWidth="0.7" />
              <text x="12" y="20" fill="#7dd3fc" fontSize="10.5" fontWeight="700">🌍 AFRICA &amp; OCEANIA</text>
              <text x="12" y="38" fill="#94a3b8" fontSize="8.5">South Africa, Egypt, AU</text>
            </g>

            {/* Metrics Bar */}
            <g transform="translate(24, 176)">
              <line x1="0" y1="0" x2="482" y2="0" stroke="#1e3a5f" strokeWidth="0.6" />
              <text x="0" y="26" fill="#fbbf24" fontSize="14" fontWeight="800">★ SHANGHAI</text>
              <text x="98" y="25" fill="#64748b" fontSize="9">GLOBAL FACTORY</text>

              <text x="215" y="26" fill="#38bdf8" fontSize="14" fontWeight="800">30+</text>
              <text x="250" y="25" fill="#64748b" fontSize="9">COUNTRIES</text>

              <text x="365" y="26" fill="#38bdf8" fontSize="14" fontWeight="800">6</text>
              <text x="385" y="25" fill="#64748b" fontSize="9">CONTINENTS</text>
            </g>
          </g>
        </g>

        {/* ===== BOTTOM METRICS STATUS BAR ===== */}
        <g opacity="0.5">
          <line x1="90" y1="855" x2="1510" y2="855" stroke="#1E3A5F" strokeWidth="0.6" />
          <text x="800" y="876" textAnchor="middle" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="11" fill="#64748B" letterSpacing="2.5">
            FUJI FENIX GLOBAL FOOTPRINT — 30+ COUNTRIES • 6 CONTINENTS • WORLDWIDE INSTALLATIONS &amp; 24/7 SUPPORT
          </text>
        </g>

        {/* ===== CORNER ACCENTS ===== */}
        <g stroke="#1E3A5F" strokeWidth="0.5" opacity="0.3">
          <line x1="45" y1="45" x2="90" y2="45" /><line x1="45" y1="45" x2="45" y2="90" />
          <line x1="1555" y1="45" x2="1510" y2="45" /><line x1="1555" y1="45" x2="1555" y2="90" />
          <line x1="45" y1="855" x2="90" y2="855" /><line x1="45" y1="855" x2="45" y2="810" />
          <line x1="1555" y1="855" x2="1510" y2="855" /><line x1="1555" y1="855" x2="1555" y2="810" />
        </g>
      </svg>
    </div>
  );
}
