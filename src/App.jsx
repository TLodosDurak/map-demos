import SimpleMap from "./components/Maps/SimpleMap";
import SVGWorldMap from "./components/Maps/SVGWorldMap";
import MarkerMap from "./components/Maps/MarkerMap";
import InteractiveMap from "./components/Maps/InteractiveMap";
import RegionalMap from "./components/Maps/RegionalMap";
import ColoredMap from "./components/Maps/ColoredMap";

function App() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Simple Map</h2>
          <SimpleMap />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">SVG World Map</h2>
          <SVGWorldMap />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Marker Map</h2>
          <MarkerMap />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Interactive Map (Zoomable)</h2>
          <InteractiveMap />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Regional Map (Europe)</h2>
          <RegionalMap />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Colored Map</h2>
          <ColoredMap />
        </div>
      </div>
    </div>
  );
}

export default App;
