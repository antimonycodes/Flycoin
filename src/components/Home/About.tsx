import bg from "../../assets/aboutBg.png";
const About = () => {
  return (
    <div className=" bg-primary pt-12 flex flex-col sm:flex-row items-center justify-between w-full gap-12 px-4 mobile:px-8 md:px-24">
      <div className=" basis-1/2 flex items-start gap-4  flex-col">
        <h1 className="text-stroke w-full text-nowrap text-[#994F00] text-xl mobile:text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          What is FlyCoin?
        </h1>
        <p className=" text-[#F9EADA] text-xs mobile:text-sm">
          FlyCoin isn’t just another meme coin; it’s a community-driven movement
          buzzing with potential. Whether you're a crypto enthusiast or a casual
          trader, FlyCoin offers fun and rewards while keeping things
          lighthearted.
        </p>
        <button className=" bg-[#E98112] text-[#522F11] text-[14px] py-2 px-7 rounded-[8px]">
          Buy token
        </button>
      </div>
      {/* image */}
      <div className=" ba12 w-[180px] mobile:w-[220px] sm:w-[300px]">
        <img src={bg} alt="" className=" w-full " />
      </div>
    </div>
  );
};

export default About;
