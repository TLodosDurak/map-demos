import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128] },
  { name: "London", coordinates: [-0.1276, 51.5074] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] },
  { name: "Sydney", coordinates: [151.2093, -33.8688] },
];

const MarkerMap = () => (
  <div className="w-fit">
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
              fill="#D6D6DA"
              stroke="#FFFFFF"
              strokeWidth={0.5}
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={4} fill="#F53" />
          <text
            textAnchor="middle"
            y={-10}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "8px" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  </div>
);

export default MarkerMap;