import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const getRandomColor = () => {
  const colors = ['#FF9B9B', '#97C1A9', '#BAB86C', '#98AFC7', '#957DAD'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ColoredMap = () => {
  return (
    <div className="w-[500px]">
      <ComposableMap
        width={1000}
        height={500}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "500px",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getRandomColor()}
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

export default ColoredMap; 