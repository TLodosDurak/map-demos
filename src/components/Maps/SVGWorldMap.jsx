import WorldMap from "react-svg-worldmap";

const SVGWorldMap = () => {
  const data = [
    { country: "us", value: 331002651 }, // USA
    { country: "cn", value: 1439323776 }, // China
    { country: "in", value: 1380004385 }, // India
    { country: "br", value: 212559417 }, // Brazil
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <WorldMap
        color="red"
        title="Population by Country"
        value-suffix="people"
        size="responsive"
        data={data}
      />
    </div>
  );
};

export default SVGWorldMap;
