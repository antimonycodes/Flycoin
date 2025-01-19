const Sponsor = () => {
  const brands = [
    "FlyCoin",
    "FLyCoin",
    "FlyCoin",
    "FLyCoin",
    "FlyCoin",
    "FLyCoin",
  ];
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];
  return (
    <div className=" bg-secondary overflow-hidden px-12 py-6 pt-4 ">
      <div className=" logos-slide flex items-center justify-center ">
        {duplicatedBrands.map((brand, index) => (
          <h1 className="text-white" key={index}>
            {brand}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Sponsor;
