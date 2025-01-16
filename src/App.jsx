import SimpleMap from "./components/Maps/SimpleMap";
import SVGWorldMap from "./components/Maps/SVGWorldMap";
import MarkerMap from "./components/Maps/MarkerMap";
import InteractiveMap from "./components/Maps/InteractiveMap";
import ColoredMap from "./components/Maps/ColoredMap";

function App() {
  return (
    <div className="p-4 h-[100vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div className="w-[500px]">
          <h2 className="text-xl font-bold text-center">Simple Map</h2>
          <SimpleMap />
        </div>

        <div className="w-[500px]">
          <h2 className="text-xl font-bold text-center">SVG World Map</h2>
          <SVGWorldMap />
        </div>

        <div className="w-[500px]">
          <h2 className="text-xl font-bold text-center">Marker Map</h2>
          <MarkerMap />
        </div>

        <div className="w-[500px]">
          <h2 className="text-xl font-bold text-center">Interactive Map (Zoomable)</h2>
          <InteractiveMap />
        </div>

        <div className="w-[500px]">
          <h2 className="text-xl font-bold text-center">Colored Map</h2>
          <ColoredMap />
        </div>
      </div>
    </div>
  );
}

export default App;
