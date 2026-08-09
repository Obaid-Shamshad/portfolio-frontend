import React from 'react'

function CircularProgress({ percentage }) {
   const radius = 25;
  const strokeWidth = 5;

  
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center">

        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90deg"
        >
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke="#3b82f6"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              transition: "stroke-dashoffset 1s ease",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default CircularProgress
