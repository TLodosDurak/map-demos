import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const RegionalMap = () => {
  return (
    <div className="w-full aspect-[2/1] max-w-4xl mx-auto">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 400,
          center: [10, 52]
        }}
        width={1000}
        height={500}
        style={{
          width: "100%",
          height: "auto"
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter(geo => geo.properties.continent === "Europe")
              .map((geo) => (
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
      </ComposableMap>
    </div>
  );
};

export default RegionalMap; 