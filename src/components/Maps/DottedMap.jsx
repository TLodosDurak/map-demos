import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import DottedMap from "dotted-map";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";

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
  const [points, setPoints] = useState([]);
  const [activePoint, setActivePoint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Memoize the map instance and points calculation
  const { mapPoints, pinPoints } = useMemo(() => {
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

    if (!loading && data?.data) {
      data.data.forEach((loc) => {
        map.addPin({
          lat: loc?.coordinates?.[0],
          lng: loc?.coordinates?.[1],
          data: loc,
        });
      });
    }

    const allPoints = map.getPoints();
    return {
      mapPoints: allPoints.filter(p => !p.data),
      pinPoints: allPoints.filter(p => p.data)
    };
  }, [data, loading]);

  useEffect(() => {
    setPoints([...mapPoints, ...pinPoints]);
  }, [mapPoints, pinPoints]);

  const handleMouseMove = useCallback((e) => {
    if (debounceTimeout.current) {
      cancelAnimationFrame(debounceTimeout.current);
    }

    debounceTimeout.current = requestAnimationFrame(() => {
      if (!svgRef.current) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;

      // Only check pin points for hover
      const point = pinPoints.find(p => {
        const px = (p.x / 126) * svgRect.width;
        const py = (p.y / 60) * svgRect.height;
        const distance = Math.sqrt(Math.pow(px - x, 2) + Math.pow(py - y, 2));
        return distance < 15;
      });

      if (point) {
        setActivePoint(point);
        setTooltipPosition({
          x: e.clientX,
          y: e.clientY - 100
        });
      } else {
        setActivePoint(null);
      }
    });
  }, [pinPoints]);

  const handleMouseLeave = useCallback(() => {
    setActivePoint(null);
    if (debounceTimeout.current) {
      cancelAnimationFrame(debounceTimeout.current);
    }
  }, []);

  // Separate rendering for background dots and pins
  const backgroundDots = useMemo(() => (
    mapPoints.map((point, i) => (
      <circle
        key={`bg-${i}`}
        cx={point.x}
        cy={point.y}
        r={0.32}
        fill="#6564f5"
        opacity={0.5}
      />
    ))
  ), [mapPoints]);

  const pins = useMemo(() => (
    pinPoints.map((point, i) => (
      <circle
        key={`pin-${i}`}
        cx={point.x}
        cy={point.y}
        r={activePoint === point ? 0.8 : 0.6}
        fill={activePoint === point ? "#4544d5" : "#6564f5"}
        style={{
          cursor: "pointer",
          transition: "r 0.2s ease-in-out, fill 0.2s ease-in-out"
        }}
      />
    ))
  ), [pinPoints, activePoint]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox="0 0 126 60"
        style={{ 
          background: "#ffffff",
          width: "100%",
          maxWidth: "900px",
          height: "auto"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {backgroundDots}
        {pins}
      </svg>
      {activePoint && activePoint.data && (
        <div
          className="fixed z-50 bg-white p-2 rounded shadow-lg pointer-events-none transform -translate-x-1/2"
          style={{ 
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transition: "transform 0.1s ease-out"
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
