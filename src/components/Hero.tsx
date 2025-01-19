import bg from "../assets/Frame 49hero-bg.svg";
// import Nav from "./Nav";
import cloud from "../assets/cloud.svg";
import bird from "../assets/bird.svg";

const Hero = () => {
  return (
    <div
      className="relative top-0 h-screen w-full bg-[#522F11]  bg-cover bg-center flex items-center justify-center"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="absolute top-0 left-0 bg-[#522F11] h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      {/* <Nav /> */}
      <div className=" absolute top-56 sm:top-44 md:top-[17%] left-[15%]  w-[20%] animate-cloud-1">
        <img src={cloud} alt="" className=" w-full h-full" />
      </div>
      <div className=" absolute top-[30%] sm:top-36 md:top-[20%] right-[15%]  w-[20%] animate-cloud-2">
        <img src={cloud} alt="" className=" w-full h-full" />
      </div>
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 -mt-6 mobile:tracking-[0.3rem]">
        <h1 className="text-stroke text-4xl mobile:text-[2.7rem] sm:text-6xl  md:text-7xl font-bold text-[#994F00] mt-2">
          Fly High with
        </h1>
        <h1 className=" text-4xl mobile:text-[2.7rem] sm:text-6xl  md:text-7xl font-bold text-[#994F00] mt-2 tracking-[7%] text-stroke">
          FlyCoin!
        </h1>
        <div className=" absolute bottom-0 md:bottom-32 right-12  w-[20%] animate-cloud-3">
          <img src={cloud} alt="" className=" w-full h-full" />
        </div>
        {/*  */}
        <div className=" z-[999]  bottom-[37%] right-[%]  w-[25%]">
          <img src={bird} alt="" className=" w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
