import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import DottedMap from "dotted-map";
import React, { useEffect, useState, useRef } from "react";

const sampleLocations = {
  data: [
    { coordinates: [40.7128, -74.0060], name: "New York", country: "USA", population: "8.4M" },
    { coordinates: [51.5074, -0.1278], name: "London", country: "UK", population: "9M" },
    { coordinates: [35.6762, 139.6503], name: "Tokyo", country: "Japan", population: "37M" },
    { coordinates: [-33.8688, 151.2093], name: "Sydney", country: "Australia", population: "5.3M" },
    { coordinates: [48.8566, 2.3522], name: "Paris", country: "France", population: "2.2M" },
    { coordinates: [55.7558, 37.6173], name: "Moscow", country: "Russia", population: "11.9M" },
  ]
};

const Map = ({ data = sampleLocations, loading = false }) => {
	const map = new DottedMap({ 
    height: 60, 
    grid: "diagonal",
    pins: {
      size: 0.6,
      backgroundColor: "#6564f5",
      hover: {
        size: 0.8,
        backgroundColor: "#4544d5"
      }
    },
    dots: {
      size: 0.32,
      backgroundColor: "#6564f5",
      opacity: 0.5
    }
  });

	const [points, setpoints] = useState(map.getPoints());
  const [activePoint, setActivePoint] = useState(null);
  const tooltipRef = useRef(null);

	useEffect(() => {
		if (!loading && data) {
			data?.data?.forEach((loc) => {
				map.addPin({
					lat: loc?.coordinates?.[0],
					lng: loc?.coordinates?.[1],
					data: loc,
          hover: true
				});
			});
			setpoints(map.getPoints());
		}
	}, [loading, data]);

  const handleMouseMove = (e) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    // Find the closest point
    const point = points.find(p => {
      const px = (p.x / 126) * svgRect.width;
      const py = (p.y / 60) * svgRect.height;
      const distance = Math.sqrt(Math.pow(px - x, 2) + Math.pow(py - y, 2));
      return distance < 10 && p.data; // 10px threshold
    });

    if (point) {
      setActivePoint(point);
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${e.clientX}px`;
        tooltipRef.current.style.top = `${e.clientY - 100}px`;
      }
    } else {
      setActivePoint(null);
    }
  };

	return (
		<div className="relative">
			<svg
				viewBox="0 0 126 60"
				style={{ background: "#ffffff", width: "900px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActivePoint(null)}
			>
				{points.map((point, i) => (
					<circle
						key={i}
						cx={point.x}
						cy={point.y}
						r={point.data ? (activePoint === point ? 0.8 : 0.6) : 0.32}
						fill={point.data ? (activePoint === point ? "#4544d5" : "#6564f5") : "#6564f5"}
						style={{
							opacity: point.data ? 1 : 0.5,
							cursor: point.data ? "pointer" : "default",
              transition: "all 0.2s ease-in-out"
						}}
					/>
				))}
			</svg>
      {activePoint && activePoint.data && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-white p-2 rounded shadow-lg pointer-events-none transform -translate-x-1/2"
          style={{ 
            transition: "all 0.1s ease-out",
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="font-bold">{activePoint.data.name}</p>
            <p>Country: {activePoint.data.country}</p>
            <p>Population: {activePoint.data.population}</p>
          </div>
        </div>
      )}
		</div>
	);
};

export default Map;
