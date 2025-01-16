import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const highlightedCountries = ["USA", "CHN", "IND", "BRA"]; // ISO Alpha-3 codes

const SimpleMap = () => (
  <div className="max-w-[500px] shrink-0">
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{
        scale: 150,
        center: [0, 0]
      }}
      width={1000}
      height={500}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: "500px"
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={highlightedCountries.includes(geo.properties.ISO_A3) ? "#F53" : "#D6D6DA"}
              stroke="#FFFFFF"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { fill: "#F53" },
                pressed: { fill: "#E42" }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  </div>
);

export default SimpleMap;
