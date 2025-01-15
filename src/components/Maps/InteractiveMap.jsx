import { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const InteractiveMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    <div className="w-full aspect-[2/1] max-w-4xl mx-auto">
      <ComposableMap
        width={1000}
        height={500}
        style={{
          width: "100%",
          height: "auto"
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D6D6DA"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#F53" },
                    pressed: { fill: "#E42" },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default InteractiveMap; 