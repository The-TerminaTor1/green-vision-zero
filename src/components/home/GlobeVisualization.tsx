import { useState } from "react";

const GlobeVisualization = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Country data with contribution levels (0-100)
  const countries = [
    { name: "United States", contribution: 85, path: "M140,120 L180,130 L200,150 L190,180 L140,170 Z", color: "#22c55e" },
    { name: "Brazil", contribution: 92, path: "M280,220 L320,240 L310,280 L270,270 Z", color: "#16a34a" },
    { name: "European Union", contribution: 88, path: "M420,100 L460,110 L470,140 L440,150 Z", color: "#15803d" },
    { name: "China", contribution: 78, path: "M620,140 L680,150 L690,190 L640,180 Z", color: "#4ade80" },
    { name: "India", contribution: 82, path: "M600,200 L640,210 L630,240 L595,230 Z", color: "#22c55e" },
    { name: "Australia", contribution: 75, path: "M680,300 L730,310 L720,350 L675,340 Z", color: "#86efac" },
    { name: "South Africa", contribution: 70, path: "M480,320 L510,330 L505,360 L475,350 Z", color: "#bbf7d0" },
    { name: "Japan", contribution: 90, path: "M720,160 L750,165 L745,185 L715,180 Z", color: "#16a34a" },
    { name: "Canada", contribution: 86, path: "M100,60 L200,70 L220,100 L110,90 Z", color: "#15803d" },
    { name: "Russia", contribution: 65, path: "M480,60 L700,70 L710,120 L470,110 Z", color: "#dcfce7" },
  ];

  const getGradientId = (index: number) => `gradient-${index}`;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-b from-primary/5 to-accent/5 rounded-2xl p-8 overflow-hidden border border-primary/10 shadow-xl">
        {/* Decorative elements with animations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-scale" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-scale" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-success/5 rounded-full blur-3xl animate-pulse-scale" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-3 animate-fade-in">
            Global Net Zero Contributions
          </h2>
          <p className="text-center text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Countries colored by their contribution to net zero emissions
          </p>

          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto drop-shadow-lg"
            style={{ filter: "drop-shadow(0 4px 20px rgba(34, 197, 94, 0.2))" }}
          >
            {/* Globe background */}
            <defs>
              <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </radialGradient>
              {countries.map((_, index) => (
                <linearGradient key={index} id={getGradientId(index)} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={countries[index].color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={countries[index].color} stopOpacity="1" />
                </linearGradient>
              ))}
            </defs>

            {/* Globe circle with pulsing effect */}
            <circle
              cx="400"
              cy="200"
              r="180"
              fill="url(#globeGradient)"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.3"
              className="animate-pulse-scale"
            />

            {/* Latitude lines */}
            {[50, 100, 150, 250, 300, 350].map((y) => (
              <line
                key={y}
                x1="220"
                y1={y}
                x2="580"
                y2={y}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.1"
              />
            ))}

            {/* Longitude lines */}
            {[280, 340, 400, 460, 520].map((x) => (
              <ellipse
                key={x}
                cx={x}
                cy="200"
                rx="15"
                ry="180"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.1"
              />
            ))}

            {/* Country shapes with enhanced animations */}
            {countries.map((country, index) => (
              <g key={country.name} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <path
                  d={country.path}
                  fill={`url(#${getGradientId(index)})`}
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                  className="transition-all duration-500 cursor-pointer hover:opacity-100"
                  opacity={hoveredCountry === country.name ? 1 : 0.85}
                  onMouseEnter={() => setHoveredCountry(country.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{
                    transform: hoveredCountry === country.name ? "scale(1.1)" : "scale(1)",
                    transformOrigin: "center",
                    filter: hoveredCountry === country.name ? "drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))" : "none",
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="mt-8 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(to right, #dcfce7, #bbf7d0)" }} />
              <span className="text-sm text-muted-foreground">Low (60-70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(to right, #86efac, #4ade80)" }} />
              <span className="text-sm text-muted-foreground">Medium (70-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(to right, #22c55e, #16a34a)" }} />
              <span className="text-sm text-muted-foreground">High (80-90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(to right, #15803d, #14532d)" }} />
              <span className="text-sm text-muted-foreground">Excellent (90%+)</span>
            </div>
          </div>

          {/* Hover info with enhanced animations */}
          {hoveredCountry && (
            <div className="mt-6 text-center">
              <div className="inline-block bg-card border-2 border-primary/30 rounded-lg px-6 py-3 shadow-2xl animate-scale-in animate-glow-pulse">
                <p className="font-semibold text-lg gradient-text">{hoveredCountry}</p>
                <p className="text-muted-foreground text-sm">
                  {countries.find(c => c.name === hoveredCountry)?.contribution}% contribution to Net Zero
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;
