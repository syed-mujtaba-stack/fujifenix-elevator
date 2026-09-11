"use client";

export default function AnimatedLocationSVG() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#02050A" }}>
      <svg
        viewBox="0 0 1600 900"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="re-title re-desc"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="re-title">Global Reach</title>
        <desc id="re-desc">A realistic animated Earth viewed from space with global connection routes representing worldwide business reach.</desc>

        <defs>
          {/* === OCEAN === */}
          <radialGradient id="re-ocean" cx="38%" cy="32%" r="58%">
            <stop offset="0%" stopColor="#0a3d6b" />
            <stop offset="30%" stopColor="#082f55" />
            <stop offset="60%" stopColor="#061e3a" />
            <stop offset="100%" stopColor="#020c18" />
          </radialGradient>

          {/* === SUNLIGHT === */}
          <radialGradient id="re-sunlight" cx="30%" cy="25%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="30%" stopColor="#b8d4f0" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* === DAY/NIGHT TERMINATOR === */}
          <radialGradient id="re-terminator" cx="70%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="40%" stopColor="#000000" stopOpacity="0" />
            <stop offset="65%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.92" />
          </radialGradient>

          {/* === ATMOSPHERE OUTER === */}
          <radialGradient id="re-atmo-outer" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="72%" stopColor="#38bdf8" stopOpacity="0.03" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="93%" stopColor="#93c5fd" stopOpacity="0.15" />
            <stop offset="97%" stopColor="#bfdbfe" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
          </radialGradient>

          {/* === ATMOSPHERE RIM (sun-facing) === */}
          <radialGradient id="re-atmo-rim" cx="25%" cy="25%" r="55%">
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0" />
            <stop offset="75%" stopColor="#93c5fd" stopOpacity="0" />
            <stop offset="88%" stopColor="#60a5fa" stopOpacity="0.2" />
            <stop offset="94%" stopColor="#93c5fd" stopOpacity="0.35" />
            <stop offset="98%" stopColor="#bfdbfe" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
          </radialGradient>

          {/* === LAND COLORS === */}
          <linearGradient id="re-land" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a5c2a" />
            <stop offset="50%" stopColor="#1a4a28" />
            <stop offset="100%" stopColor="#163d22" />
          </linearGradient>

          <linearGradient id="re-land-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d3318" />
            <stop offset="100%" stopColor="#0a2812" />
          </linearGradient>

          <linearGradient id="re-desert" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b7a50" />
            <stop offset="100%" stopColor="#6b5e3a" />
          </linearGradient>

          <linearGradient id="re-ice" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e8eff8" />
            <stop offset="100%" stopColor="#c5d5e5" />
          </linearGradient>

          {/* === CLOUDS === */}
          <radialGradient id="re-cloud" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* === ROUTE === */}
          <linearGradient id="re-route" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="re-route-bright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.08" />
            <stop offset="30%" stopColor="#67e8f9" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#67e8f9" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.08" />
          </linearGradient>

          {/* === TEXT === */}
          <linearGradient id="re-text" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* === FILTERS === */}
          <filter id="re-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-cloud-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
          </filter>

          <filter id="re-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-particle" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-marker" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="re-route-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* === CLIP === */}
          <clipPath id="re-earth-clip">
            <circle cx="1080" cy="455" r="325" />
          </clipPath>

          <clipPath id="re-cloud-clip">
            <circle cx="1080" cy="455" r="322" />
          </clipPath>

          {/* === ANIMATIONS === */}
          <style>{`
            @keyframes re-cloud-drift { from{transform:translateX(0)} to{transform:translateX(18px)} }
            @keyframes re-cloud-drift2 { from{transform:translateX(0)} to{transform:translateX(-14px)} }
            @keyframes re-draw { to{stroke-dashoffset:-300} }
            @keyframes re-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
            @keyframes re-twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.55} }
            @keyframes re-city { 0%,100%{opacity:0.5} 50%{opacity:0.85} }
            @keyframes re-fadeup { 0%{opacity:0;transform:translateY(10px)} 100%{opacity:1;transform:translateY(0)} }
            @keyframes re-orbit { from{transform:rotate(0deg) translateX(345px) rotate(0deg)} to{transform:rotate(360deg) translateX(345px) rotate(-360deg)} }

            .re-cloud-g1 { animation: re-cloud-drift 35s linear infinite; }
            .re-cloud-g2 { animation: re-cloud-drift2 40s linear infinite; }
            .re-route { stroke-dasharray:10 8; animation: re-draw 3.5s linear infinite; }
            .re-route-s { stroke-dasharray:10 8; animation: re-draw 5s linear infinite; }
            .re-star { animation: re-twinkle 3s ease-in-out infinite; }
            .re-city { animation: re-city 4s ease-in-out infinite; }
            .re-bg-p { animation: re-float 5s ease-in-out infinite; }
            .re-orbit-sat { animation: re-orbit 28s linear infinite; transform-origin:1080px 455px; }

            .re-t-eb { animation: re-fadeup 0.7s ease-out 0.3s both; }
            .re-t-hd { animation: re-fadeup 0.7s ease-out 0.6s both; }
            .re-t-ac { animation: re-fadeup 0.5s ease-out 0.9s both; }
            .re-t-ds { animation: re-fadeup 0.7s ease-out 1.1s both; }

            @media(prefers-reduced-motion:reduce){
              .re-cloud-g1,.re-cloud-g2,.re-route,.re-route-s,.re-star,.re-city,.re-bg-p,.re-orbit-sat,
              .re-t-eb,.re-t-hd,.re-t-ac,.re-t-ds{ animation:none!important; opacity:1!important; }
            }
          `}</style>
        </defs>

        {/* ===== BACKGROUND ===== */}
        <rect width="1600" height="900" fill="#02050A" />
        {/* Subtle blue glow behind Earth */}
        <circle cx="1080" cy="455" r="420" fill="#0a1a30" opacity="0.12" />
        <circle cx="1080" cy="455" r="350" fill="#0f2540" opacity="0.08" />

        {/* ===== STARS ===== */}
        <g id="stars">
          {[
            [28,22],[85,48],[148,15],[225,40],[308,12],[415,35],[528,18],[638,45],[755,28],[878,52],
            [998,18],[1148,42],[1298,25],[1448,50],[1548,32],[48,868],[198,848],[398,878],[698,858],[1098,868],
            [1398,852],[1548,872],[42,598],[1552,398],[1518,598],[78,298],[1498,148],[72,748],[1538,698],[298,848],
            [1200,80],[400,820],[800,60],[1300,830],[160,700],[1450,150],[60,450],[1540,480],[950,40],[500,860]
          ].map(([x,y],i) => (
            <circle key={`s${i}`} className="re-star" cx={x} cy={y} r={i%5===0?1:i%3===0?0.7:0.4}
              fill={i%7===0?"#d4e4f8":"#ffffff"} style={{animationDelay:`${i*0.35}s`,animationDuration:`${2.5+i%4}s`}} />
          ))}
        </g>

        {/* ===== BACKGROUND PARTICLES ===== */}
        <g id="bg-particles">
          {[[100,130],[250,70],[420,170],[580,85],[740,155],[900,75],[1060,130],[1220,65],[1380,125],
            [90,770],[240,810],[390,740],[540,790],[690,750],[840,800],[990,760],[1140,820],[1290,780],[1440,830]
          ].map(([x,y],i) => (
            <circle key={`bp${i}`} className="re-bg-p" cx={x} cy={y} r={0.5+(i%3)*0.3} fill="#38bdf8" opacity="0.08"
              style={{animationDelay:`${(i%6)*0.8}s`,animationDuration:`${4+i%3}s`}} />
          ))}
        </g>

        {/* ===== TEXT AREA ===== */}
        <g id="text">
          <g className="re-t-eb">
            <line x1="150" y1="355" x2="210" y2="355" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
            <text x="225" y="359" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="12" fill="#38bdf8" letterSpacing="3" fontWeight="500">GLOBAL REACH</text>
          </g>
          <g className="re-t-hd">
            <text x="150" y="428" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="58" fontWeight="700" fill="url(#re-text)" letterSpacing="-0.5">Connecting</text>
            <text x="150" y="495" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="58" fontWeight="700" fill="url(#re-text)" letterSpacing="-0.5">the World</text>
          </g>
          <line className="re-t-ac" x1="150" y1="520" x2="280" y2="520" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
          <g className="re-t-ds">
            <text x="150" y="560" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="16" fill="#94A3B8" letterSpacing="0.3">
              <tspan x="150" dy="0">Building meaningful connections</tspan>
              <tspan x="150" dy="26">across markets, continents, and</tspan>
              <tspan x="150" dy="26">communities.</tspan>
            </text>
          </g>
        </g>

        {/* ===== EARTH ATMOSPHERE (BACK) ===== */}
        <g id="atmo-back">
          <circle cx="1080" cy="455" r="380" fill="url(#re-atmo-outer)" />
        </g>

        {/* ===== EARTH ===== */}
        <g id="earth">
          <circle cx="1080" cy="455" r="325" fill="url(#re-ocean)" />

          <g clipPath="url(#re-earth-clip)">

            {/* === DETAILED CONTINENTS === */}
            <g id="continents">

              {/* NORTH AMERICA */}
              <path d="M840 245 Q860 228 895 220 Q925 218 948 225 Q968 232 985 248 Q998 265 1005 288 Q1010 310 1008 335 Q1002 358 992 378 Q978 398 962 412 Q945 422 928 425 Q910 424 895 416 Q878 405 865 388 Q852 370 845 348 Q838 325 835 300 Q833 275 838 255Z" fill="url(#re-land)" opacity="0.85" />
              {/* NA detail - mountains */}
              <path d="M880 265 Q895 258 910 262 Q918 270 914 280 Q906 286 896 282 Q886 276 886 268Z" fill="#1d6b30" opacity="0.5" />
              <path d="M920 290 Q935 282 948 288 Q955 298 950 308 Q942 314 932 310 Q922 304 924 294Z" fill="#1d6b30" opacity="0.45" />
              {/* Central America */}
              <path d="M885 425 Q898 435 896 455 Q890 468 878 472 Q870 465 872 450 Q878 438 885 425Z" fill="url(#re-land)" opacity="0.78" />
              {/* Caribbean */}
              <path d="M920 435 Q930 430 940 435 Q945 442 940 448 Q932 452 925 448 Q920 442 920 435Z" fill="url(#re-land)" opacity="0.55" />
              <path d="M948 442 Q955 438 962 442 Q965 448 960 452 Q954 454 950 450Z" fill="url(#re-land)" opacity="0.45" />

              {/* GREENLAND */}
              <path d="M948 195 Q965 185 985 190 Q998 200 1002 218 Q1000 235 992 248 Q980 258 968 255 Q955 248 950 232 Q946 218 948 200Z" fill="url(#re-ice)" opacity="0.45" />

              {/* SOUTH AMERICA */}
              <path d="M925 470 Q948 458 970 465 Q990 475 1002 495 Q1012 518 1015 545 Q1012 575 1002 600 Q988 625 972 640 Q955 650 940 645 Q925 635 915 615 Q908 592 905 565 Q904 538 908 510 Q912 488 925 470Z" fill="url(#re-land)" opacity="0.82" />
              {/* Amazon */}
              <path d="M940 510 Q958 502 972 512 Q980 525 975 540 Q965 548 952 542 Q942 535 940 522Z" fill="#1f7535" opacity="0.4" />
              {/* Andes */}
              <path d="M918 505 Q928 498 935 505 Q938 518 935 535 Q930 548 924 545 Q918 535 916 520Z" fill="#1a5c2a" opacity="0.35" />

              {/* EUROPE */}
              <path d="M1028 255 Q1045 245 1068 248 Q1088 255 1098 272 Q1105 292 1102 312 Q1096 330 1085 342 Q1072 352 1058 350 Q1045 345 1036 332 Q1028 318 1025 300 Q1023 280 1026 262Z" fill="url(#re-land)" opacity="0.82" />
              {/* Scandinavia */}
              <path d="M1058 218 Q1068 210 1078 215 Q1085 225 1082 242 Q1076 255 1068 252 Q1060 245 1058 232Z" fill="url(#re-land)" opacity="0.72" />
              {/* UK/Ireland */}
              <path d="M1018 255 Q1028 248 1038 255 Q1042 265 1036 275 Q1028 280 1022 272 Q1018 265 1018 255Z" fill="url(#re-land)" opacity="0.68" />
              <path d="M1010 260 Q1016 255 1020 260 Q1022 268 1018 272 Q1012 274 1010 268Z" fill="url(#re-land)" opacity="0.58" />
              {/* Iceland */}
              <path d="M990 205 Q998 200 1006 205 Q1010 212 1006 218 Q1000 222 994 218 Q990 212 990 205Z" fill="url(#re-land)" opacity="0.45" />

              {/* AFRICA */}
              <path d="M1042 375 Q1065 362 1092 368 Q1115 378 1130 398 Q1142 422 1148 452 Q1150 485 1145 518 Q1135 552 1120 578 Q1102 598 1085 602 Q1068 600 1052 588 Q1040 572 1032 548 Q1025 522 1024 492 Q1025 462 1030 432 Q1035 405 1042 375Z" fill="url(#re-land)" opacity="0.8" />
              {/* Sahara */}
              <path d="M1048 382 Q1070 372 1092 378 Q1105 388 1108 402 Q1105 415 1092 420 Q1078 422 1065 415 Q1052 408 1048 395Z" fill="url(#re-desert)" opacity="0.45" />
              {/* Congo */}
              <path d="M1065 478 Q1080 472 1092 480 Q1098 492 1095 508 Q1088 518 1078 515 Q1068 510 1065 498Z" fill="#1f7535" opacity="0.35" />
              {/* Madagascar */}
              <ellipse cx="1148" cy="558" rx="8" ry="18" fill="url(#re-land)" opacity="0.55" />

              {/* ASIA */}
              <path d="M1102 235 Q1138 218 1178 225 Q1212 238 1235 262 Q1250 288 1252 318 Q1248 348 1235 375 Q1218 398 1198 412 Q1175 422 1152 418 Q1132 410 1118 395 Q1105 378 1098 358 Q1092 335 1092 310 Q1092 285 1098 260Z" fill="url(#re-land)" opacity="0.82" />
              {/* Russia/Siberia */}
              <path d="M1098 228 Q1130 215 1168 218 Q1208 222 1245 232 Q1272 242 1288 258 Q1298 278 1295 300 Q1285 318 1268 328 Q1248 335 1225 330 Q1205 322 1188 310 Q1172 298 1158 282 Q1145 268 1135 252 Q1125 238 1115 228Z" fill="url(#re-land)" opacity="0.75" />
              {/* Middle East */}
              <path d="M1105 358 Q1120 350 1138 355 Q1148 365 1148 380 Q1142 392 1130 395 Q1118 392 1110 382 Q1105 372 1105 360Z" fill="url(#re-desert)" opacity="0.4" />
              {/* India */}
              <path d="M1148 405 Q1168 395 1185 405 Q1195 420 1192 445 Q1185 468 1175 482 Q1162 490 1152 485 Q1142 475 1138 458 Q1135 438 1138 420Z" fill="url(#re-land)" opacity="0.78" />
              {/* SE Asia */}
              <path d="M1200 415 Q1218 408 1232 418 Q1240 430 1235 445 Q1225 455 1212 450 Q1202 442 1200 428Z" fill="url(#re-land)" opacity="0.68" />
              {/* Japan */}
              <path d="M1255 285 Q1262 278 1270 282 Q1276 292 1274 305 Q1268 315 1262 312 Q1255 305 1255 295Z" fill="url(#re-land)" opacity="0.62" />
              {/* Korea */}
              <path d="M1238 305 Q1245 300 1252 305 Q1255 312 1250 320 Q1244 324 1240 318Z" fill="url(#re-land)" opacity="0.55" />
              {/* Indonesia */}
              <path d="M1200 478 Q1218 472 1238 478 Q1248 486 1242 496 Q1230 502 1215 498 Q1202 492 1202 482Z" fill="url(#re-land)" opacity="0.58" />
              <path d="M1245 492 Q1258 488 1268 495 Q1272 502 1266 508 Q1258 512 1250 508Z" fill="url(#re-land)" opacity="0.5" />
              {/* Philippines */}
              <path d="M1232 448 Q1238 442 1244 448 Q1248 455 1244 462 Q1238 466 1234 460Z" fill="url(#re-land)" opacity="0.48" />

              {/* AUSTRALIA */}
              <path d="M1185 555 Q1210 542 1240 548 Q1265 558 1275 578 Q1278 602 1268 620 Q1252 635 1232 638 Q1212 635 1198 622 Q1188 608 1185 588Z" fill="url(#re-land)" opacity="0.75" />
              {/* Outback */}
              <path d="M1208 572 Q1225 565 1242 570 Q1252 580 1248 592 Q1240 600 1228 598 Q1215 595 1210 585Z" fill="url(#re-desert)" opacity="0.35" />
              {/* New Zealand */}
              <path d="M1292 615 Q1298 608 1305 612 Q1308 620 1304 628 Q1298 632 1294 625Z" fill="url(#re-land)" opacity="0.42" />
              {/* Tasmania */}
              <ellipse cx="1252" cy="642" rx="6" ry="4" fill="url(#re-land)" opacity="0.38" />

              {/* ICE CAPS */}
              <ellipse cx="1080" cy="142" rx="185" ry="22" fill="url(#re-ice)" opacity="0.22" />
              <ellipse cx="1080" cy="775" rx="210" ry="25" fill="url(#re-ice)" opacity="0.18" />
            </g>

            {/* === CLOUDS === */}
            <g id="clouds" clipPath="url(#re-cloud-clip)">
              <g className="re-cloud-g1" opacity="0.18">
                <ellipse cx="980" cy="350" rx="65" ry="12" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1050" cy="280" rx="55" ry="10" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1150" cy="420" rx="60" ry="11" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1200" cy="340" rx="48" ry="9" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="920" cy="480" rx="52" ry="10" fill="white" filter="url(#re-cloud-blur)" />
              </g>
              <g className="re-cloud-g2" opacity="0.12">
                <ellipse cx="1020" cy="410" rx="58" ry="10" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1120" cy="310" rx="50" ry="9" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1180" cy="500" rx="55" ry="10" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1080" cy="550" rx="62" ry="11" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="950" cy="320" rx="45" ry="8" fill="white" filter="url(#re-cloud-blur)" />
              </g>
              <g opacity="0.08">
                <ellipse cx="1000" cy="440" rx="70" ry="13" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1160" cy="380" rx="52" ry="9" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1220" cy="460" rx="45" ry="8" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1060" cy="260" rx="40" ry="7" fill="white" filter="url(#re-cloud-blur)" />
                <ellipse cx="1140" cy="560" rx="48" ry="9" fill="white" filter="url(#re-cloud-blur)" />
              </g>
            </g>

            {/* === CITY LIGHTS (NIGHT SIDE) === */}
            <g id="city-lights">
              {/* Europe - dense */}
              <circle className="re-city" cx="1048" cy="278" r="1.5" fill="#fbbf24" opacity="0.7" style={{animationDelay:"0s"}} />
              <circle className="re-city" cx="1058" cy="272" r="1.2" fill="#fbbf24" opacity="0.6" style={{animationDelay:"0.5s"}} />
              <circle className="re-city" cx="1068" cy="280" r="1.3" fill="#fbbf24" opacity="0.65" style={{animationDelay:"1s"}} />
              <circle className="re-city" cx="1078" cy="288" r="1.1" fill="#fbbf24" opacity="0.55" style={{animationDelay:"1.5s"}} />
              <circle className="re-city" cx="1038" cy="285" r="1" fill="#fbbf24" opacity="0.5" style={{animationDelay:"2s"}} />
              <circle className="re-city" cx="1095" cy="295" r="1.2" fill="#fbbf24" opacity="0.55" style={{animationDelay:"0.3s"}} />
              <circle className="re-city" cx="1028" cy="298" r="1" fill="#fbbf24" opacity="0.45" style={{animationDelay:"0.8s"}} />
              <circle className="re-city" cx="1088" cy="265" r="1.1" fill="#fbbf24" opacity="0.5" style={{animationDelay:"1.2s"}} />
              <circle className="re-city" cx="1055" cy="305" r="0.9" fill="#fbbf24" opacity="0.4" style={{animationDelay:"2.2s"}} />
              <circle className="re-city" cx="1105" cy="285" r="0.8" fill="#fbbf24" opacity="0.35" style={{animationDelay:"1.8s"}} />

              {/* Middle East */}
              <circle className="re-city" cx="1118" cy="368" r="1.2" fill="#fbbf24" opacity="0.55" style={{animationDelay:"0.6s"}} />
              <circle className="re-city" cx="1132" cy="378" r="1" fill="#fbbf24" opacity="0.45" style={{animationDelay:"1.4s"}} />

              {/* India - dense */}
              <circle className="re-city" cx="1155" cy="432" r="1.4" fill="#fbbf24" opacity="0.6" style={{animationDelay:"0.2s"}} />
              <circle className="re-city" cx="1168" cy="425" r="1.2" fill="#fbbf24" opacity="0.55" style={{animationDelay:"0.9s"}} />
              <circle className="re-city" cx="1148" cy="445" r="1.1" fill="#fbbf24" opacity="0.5" style={{animationDelay:"1.6s"}} />
              <circle className="re-city" cx="1178" cy="440" r="1" fill="#fbbf24" opacity="0.45" style={{animationDelay:"2.1s"}} />
              <circle className="re-city" cx="1162" cy="455" r="0.9" fill="#fbbf24" opacity="0.4" style={{animationDelay:"0.4s"}} />
              <circle className="re-city" cx="1142" cy="460" r="0.8" fill="#fbbf24" opacity="0.35" style={{animationDelay:"1.1s"}} />

              {/* China - dense */}
              <circle className="re-city" cx="1195" cy="340" r="1.5" fill="#fbbf24" opacity="0.65" style={{animationDelay:"0.7s"}} />
              <circle className="re-city" cx="1210" cy="335" r="1.3" fill="#fbbf24" opacity="0.58" style={{animationDelay:"1.3s"}} />
              <circle className="re-city" cx="1185" cy="355" r="1.2" fill="#fbbf24" opacity="0.52" style={{animationDelay:"0.1s"}} />
              <circle className="re-city" cx="1205" cy="350" r="1.1" fill="#fbbf24" opacity="0.48" style={{animationDelay:"1.9s"}} />
              <circle className="re-city" cx="1220" cy="345" r="1" fill="#fbbf24" opacity="0.42" style={{animationDelay:"2.4s"}} />
              <circle className="re-city" cx="1175" cy="365" r="0.9" fill="#fbbf24" opacity="0.38" style={{animationDelay:"0.5s"}} />
              <circle className="re-city" cx="1230" cy="330" r="0.8" fill="#fbbf24" opacity="0.32" style={{animationDelay:"1.7s"}} />
              <circle className="re-city" cx="1165" cy="375" r="0.8" fill="#fbbf24" opacity="0.3" style={{animationDelay:"2.6s"}} />

              {/* Japan - dense */}
              <circle className="re-city" cx="1260" cy="295" r="1.3" fill="#fbbf24" opacity="0.6" style={{animationDelay:"0.4s"}} />
              <circle className="re-city" cx="1255" cy="305" r="1.1" fill="#fbbf24" opacity="0.52" style={{animationDelay:"1.2s"}} />
              <circle className="re-city" cx="1265" cy="288" r="1" fill="#fbbf24" opacity="0.48" style={{animationDelay:"2s"}} />
              <circle className="re-city" cx="1248" cy="312" r="0.9" fill="#fbbf24" opacity="0.42" style={{animationDelay:"0.8s"}} />

              {/* Korea */}
              <circle className="re-city" cx="1242" cy="312" r="1.1" fill="#fbbf24" opacity="0.5" style={{animationDelay:"1.5s"}} />
              <circle className="re-city" cx="1238" cy="320" r="0.9" fill="#fbbf24" opacity="0.4" style={{animationDelay:"2.3s"}} />

              {/* SE Asia */}
              <circle className="re-city" cx="1215" cy="435" r="1" fill="#fbbf24" opacity="0.45" style={{animationDelay:"0.6s"}} />
              <circle className="re-city" cx="1225" cy="448" r="0.9" fill="#fbbf24" opacity="0.4" style={{animationDelay:"1.8s"}} />
              <circle className="re-city" cx="1208" cy="455" r="0.8" fill="#fbbf24" opacity="0.35" style={{animationDelay:"2.5s"}} />

              {/* Africa */}
              <circle className="re-city" cx="1062" cy="448" r="1" fill="#fbbf24" opacity="0.42" style={{animationDelay:"0.3s"}} />
              <circle className="re-city" cx="1082" cy="435" r="0.9" fill="#fbbf24" opacity="0.38" style={{animationDelay:"1.1s"}} />
              <circle className="re-city" cx="1095" cy="555" r="0.8" fill="#fbbf24" opacity="0.32" style={{animationDelay:"2s"}} />

              {/* Americas (less dense on dark side) */}
              <circle className="re-city" cx="875" cy="355" r="1.2" fill="#fbbf24" opacity="0.45" style={{animationDelay:"0.9s"}} />
              <circle className="re-city" cx="865" cy="365" r="0.9" fill="#fbbf24" opacity="0.35" style={{animationDelay:"1.6s"}} />
              <circle className="re-city" cx="938" cy="535" r="1" fill="#fbbf24" opacity="0.38" style={{animationDelay:"2.2s"}} />
              <circle className="re-city" cx="925" cy="555" r="0.8" fill="#fbbf24" opacity="0.3" style={{animationDelay:"0.7s"}} />
            </g>

            {/* Day/night terminator */}
            <circle cx="1080" cy="455" r="325" fill="url(#re-terminator)" />

            {/* Sunlight overlay */}
            <circle cx="1080" cy="455" r="325" fill="url(#re-sunlight)" />
          </g>

          {/* Earth rim highlight */}
          <circle cx="1080" cy="455" r="325" fill="none" stroke="#4a90c4" strokeWidth="0.3" opacity="0.15" />
        </g>

        {/* ===== ATMOSPHERE RIM (FRONT) ===== */}
        <g id="atmo-front">
          <circle cx="1080" cy="455" r="335" fill="url(#re-atmo-rim)" />
        </g>

        {/* ===== GLOBAL CONNECTION ROUTES ===== */}
        <g id="routes" filter="url(#re-route-glow)">
          {/* NY → London */}
          <path d="M905 320 Q970 280 1048 272" fill="none" stroke="url(#re-route-bright)" strokeWidth="2" strokeLinecap="round" className="re-route" />
          {/* London → Dubai */}
          <path d="M1048 272 Q1088 318 1118 368" fill="none" stroke="url(#re-route)" strokeWidth="1.8" strokeLinecap="round" className="re-route-s" />
          {/* Dubai → Mumbai */}
          <path d="M1118 368 Q1138 400 1155 432" fill="none" stroke="url(#re-route)" strokeWidth="1.8" strokeLinecap="round" className="re-route" />
          {/* Mumbai → Singapore */}
          <path d="M1155 432 Q1185 455 1208 455" fill="none" stroke="url(#re-route)" strokeWidth="1.5" strokeLinecap="round" className="re-route-s" />
          {/* Singapore → Tokyo */}
          <path d="M1208 455 Q1235 380 1260 295" fill="none" stroke="url(#re-route-bright)" strokeWidth="2" strokeLinecap="round" className="re-route" />
          {/* Tokyo → LA */}
          <path d="M1260 295 Q1080 290 885 340" fill="none" stroke="url(#re-route-bright)" strokeWidth="2" strokeLinecap="round" className="re-route-s" />
          {/* London → Johannesburg */}
          <path d="M1048 272 Q1060 420 1095 555" fill="none" stroke="url(#re-route)" strokeWidth="1.5" strokeLinecap="round" className="re-route" />
          {/* NY → São Paulo */}
          <path d="M905 320 Q920 430 938 535" fill="none" stroke="url(#re-route)" strokeWidth="1.5" strokeLinecap="round" className="re-route-s" />
          {/* Singapore → Sydney */}
          <path d="M1208 455 Q1230 510 1248 580" fill="none" stroke="url(#re-route)" strokeWidth="1.5" strokeLinecap="round" className="re-route" />
          {/* Istanbul → Delhi */}
          <path d="M1095 298 Q1128 365 1155 432" fill="none" stroke="url(#re-route)" strokeWidth="1.5" strokeLinecap="round" className="re-route-s" />
        </g>

        {/* ===== DATA PARTICLES ===== */}
        <g id="particles" filter="url(#re-particle)">
          {/* NY → London */}
          <circle r="2.5" fill="#e0f2fe" opacity="0.9"><animateMotion dur="3.5s" repeatCount="indefinite" path="M905 320 Q970 280 1048 272" /></circle>
          <circle r="1.2" fill="#38bdf8" opacity="0.4"><animateMotion dur="3.5s" repeatCount="indefinite" path="M905 320 Q970 280 1048 272" begin="0.2s" /></circle>

          {/* London → Dubai */}
          <circle r="2.2" fill="#e0f2fe" opacity="0.85"><animateMotion dur="4s" repeatCount="indefinite" path="M1048 272 Q1088 318 1118 368" /></circle>
          <circle r="1" fill="#38bdf8" opacity="0.35"><animateMotion dur="4s" repeatCount="indefinite" path="M1048 272 Q1088 318 1118 368" begin="0.2s" /></circle>

          {/* Singapore → Tokyo */}
          <circle r="2.5" fill="#e0f2fe" opacity="0.9"><animateMotion dur="4.2s" repeatCount="indefinite" path="M1208 455 Q1235 380 1260 295" /></circle>
          <circle r="1.2" fill="#38bdf8" opacity="0.4"><animateMotion dur="4.2s" repeatCount="indefinite" path="M1208 455 Q1235 380 1260 295" begin="0.22s" /></circle>

          {/* Tokyo → LA */}
          <circle r="2.5" fill="#e0f2fe" opacity="0.9"><animateMotion dur="5s" repeatCount="indefinite" path="M1260 295 Q1080 290 885 340" /></circle>
          <circle r="1.2" fill="#38bdf8" opacity="0.4"><animateMotion dur="5s" repeatCount="indefinite" path="M1260 295 Q1080 290 885 340" begin="0.25s" /></circle>

          {/* London → Johannesburg */}
          <circle r="2" fill="#e0f2fe" opacity="0.8"><animateMotion dur="5.5s" repeatCount="indefinite" path="M1048 272 Q1060 420 1095 555" /></circle>
          <circle r="0.8" fill="#38bdf8" opacity="0.3"><animateMotion dur="5.5s" repeatCount="indefinite" path="M1048 272 Q1060 420 1095 555" begin="0.3s" /></circle>

          {/* Singapore → Sydney */}
          <circle r="2" fill="#e0f2fe" opacity="0.8"><animateMotion dur="4s" repeatCount="indefinite" path="M1208 455 Q1230 510 1248 580" /></circle>

          {/* Dubai → Mumbai */}
          <circle r="2" fill="#e0f2fe" opacity="0.8"><animateMotion dur="3s" repeatCount="indefinite" path="M1118 368 Q1138 400 1155 432" /></circle>

          {/* NY → São Paulo */}
          <circle r="2" fill="#e0f2fe" opacity="0.75"><animateMotion dur="5s" repeatCount="indefinite" path="M905 320 Q920 430 938 535" /></circle>

          {/* Istanbul → Delhi */}
          <circle r="1.8" fill="#e0f2fe" opacity="0.7"><animateMotion dur="4s" repeatCount="indefinite" path="M1095 298 Q1128 365 1155 432" /></circle>
        </g>

        {/* ===== DESTINATION MARKERS ===== */}
        <g id="markers">
          {[
            [905,320,3.5],[1048,272,3.5],[1118,368,3],[1155,432,3],[1208,455,3],
            [1260,295,3.5],[885,340,3],[1095,555,2.5],[938,535,2.5],[1248,580,2.5]
          ].map(([cx,cy,r],i) => (
            <g key={`mk${i}`}>
              <circle cx={cx} cy={cy} r={r as number} fill="#e0f2fe" filter="url(#re-marker)">
                <animate attributeName="r" values={`${r};${(r as number)+1.5};${r}`} dur="3s" repeatCount="indefinite" begin={`${i*0.4}s`} />
              </circle>
              <circle cx={cx} cy={cy} r={(r as number)+4} fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.2">
                <animate attributeName="r" values={`${(r as number)+4};${(r as number)+12};${(r as number)+4}`} dur="3s" repeatCount="indefinite" begin={`${i*0.4}s`} />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin={`${i*0.4}s`} />
              </circle>
            </g>
          ))}
        </g>

        {/* ===== SATELLITE ===== */}
        <circle className="re-orbit-sat" r="2.5" fill="#e0f2fe" filter="url(#re-glow)" style={{transformOrigin:"1080px 455px"}}>
          <animateMotion dur="28s" repeatCount="indefinite" path="M1080 455 m-345 0 a345 85 25 1 0 690 0 a345 85 25 1 0 -690 0" />
        </circle>

        {/* ===== BOTTOM BAR ===== */}
        <g opacity="0.3">
          <line x1="150" y1="855" x2="1450" y2="855" stroke="#1E3A5F" strokeWidth="0.4" />
          <text x="800" y="875" textAnchor="middle" fontFamily="Inter,system-ui,Arial,sans-serif" fontSize="10" fill="#475569" letterSpacing="3">30+ COUNTRIES — 5 CONTINENTS — GLOBAL PRESENCE</text>
        </g>

        {/* ===== CORNER ACCENTS ===== */}
        <g stroke="#1E3A5F" strokeWidth="0.4" opacity="0.15">
          <line x1="45" y1="45" x2="90" y2="45" /><line x1="45" y1="45" x2="45" y2="90" />
          <line x1="1555" y1="45" x2="1510" y2="45" /><line x1="1555" y1="45" x2="1555" y2="90" />
          <line x1="45" y1="855" x2="90" y2="855" /><line x1="45" y1="855" x2="45" y2="810" />
          <line x1="1555" y1="855" x2="1510" y2="855" /><line x1="1555" y1="855" x2="1555" y2="810" />
        </g>
      </svg>
    </div>
  );
}
