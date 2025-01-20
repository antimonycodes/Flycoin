import bg from "../assets/Frame 49hero-bg.svg";
// import Nav from "./Nav";
import cloud from "../assets/cloud.svg";
import bird from "../assets/bird.svg";
// import bird from "../assets/birdd.svg";

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
          <img src={bird} alt="" className=" w-full h-full animate-cloud-4 " />
          {/* <svg
            // width="754"
            // height="607"
            viewBox="0 0 754 607"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Frame" clip-path="url(#clip0_1_2)">
              <path
                id="Vector"
                d="M137.648 116.326L121.107 107.016C110.259 126.787 111.707 152.087 118.128 169.196C124.327 186.925 135.511 194.969 135.216 194.885C135.223 194.965 127.405 182.341 126.891 164.94C125.749 147.667 131.084 127.334 137.648 116.326Z"
                fill="#272324"
              />
              <path
                id="Vector_2"
                d="M82.2399 217.471C68.4709 203.669 46.8073 192.172 30.9707 187.071L26.8867 199.046C45.2758 205.055 65.7579 213.372 80.1578 223.94C94.7035 234.161 104.184 243.602 104.29 243.43C104.133 243.561 96.1803 230.941 82.2399 217.471Z"
                fill="#272324"
              />
              <path
                id="Vector_3"
                d="M83.1248 97.652L58.5477 100.536L54.0042 101.076C54.0042 101.076 43.7249 61.6724 11.1803 87.369C11.1803 87.369 -7.14318 97.8489 3.12523 118.798C4.60569 121.813 6.67323 125.04 9.47006 128.486C9.47006 128.486 -7.66098 149.041 12.8941 166.176L86.5488 214.142L124.235 178.169L83.1248 97.652Z"
                fill="#2C2829"
              />
              <path
                id="Vector_4"
                d="M124.236 178.166L93.2046 117.391C96.1546 149.246 85.8315 177.517 68.5254 202.404L86.5498 214.146L124.236 178.166Z"
                fill="#272324"
              />
              <path
                id="Vector_5"
                d="M64.6279 177.721C59.8584 173.083 35.6641 153.866 26.0703 147.769C39.6789 163.008 55.9749 177.878 60.6387 181.915C84.1146 201.226 107.514 222.554 107.507 222.602C107.594 222.573 85.5075 196.705 64.6279 177.721Z"
                fill="#231F20"
              />
              <path
                id="Vector_6"
                d="M122.209 199.239C122.3 199.228 106.5 169.104 90.3534 145.96C86.7325 140.381 67.4027 116.278 59.4023 108.201C69.2879 126.08 81.8827 144.192 85.5328 149.165C104.141 173.207 122.227 199.191 122.209 199.239Z"
                fill="#231F20"
              />
              <path
                id="Vector_7"
                d="M37.4062 123.48C49.4177 140.006 64.1421 156.433 68.3792 160.918C89.8021 182.483 110.952 206.047 110.937 206.09C111.028 206.072 91.64 178.122 72.7696 157.144C68.4886 152.05 46.3364 130.51 37.4062 123.48Z"
                fill="#231F20"
              />
              <g id="featherr">
                <path
                  id="Vector_8"
                  d="M386.307 378.604C386.307 378.604 447.972 503.663 513.058 515.656C513.058 515.656 513.058 575.618 382.88 555.06C382.88 555.06 261.267 541.353 252.701 448.842C252.701 448.842 259.553 359.759 386.307 378.604Z"
                  fill="#272324"
                />
              </g>
              <path
                id="Vector_9"
                d="M336.265 505.169C335.146 503.897 334.004 502.66 332.834 501.494C333.91 502.839 335.069 504.035 336.265 505.169Z"
                fill="#272324"
              />
              <path
                id="Vector_10"
                d="M304.707 501.494C305.462 502.248 306.246 502.97 307.041 503.667C306.333 502.905 305.564 502.179 304.707 501.494Z"
                fill="#272324"
              />
              <path
                id="Vector_11"
                d="M367.994 486.018C370.149 488.41 372.41 490.689 374.755 492.877C372.611 490.357 370.379 488.031 367.994 486.018Z"
                fill="#272324"
              />
              <path
                id="Vector_12"
                d="M513.058 515.656C492.89 511.94 473.053 497.366 455.269 479.02C455.247 479.009 455.229 478.998 455.203 478.984C450.985 476.169 443.951 477.576 439.732 474.761C422.852 466.323 403.161 460.697 391.908 443.817C401.754 481.799 431.294 514.15 469.268 526.814C435.804 528.102 400 516.422 374.755 492.877C389.101 509.731 399.424 535.435 421.445 536.66C415.822 536.66 410.195 538.067 405.976 536.66C396.127 532.441 386.282 529.626 377.844 525.407C363.853 517.771 347.578 515.86 336.267 505.169C348.625 519.175 358.62 538.301 379.251 540.879C370.81 542.286 365.187 536.66 358.153 533.848C353.934 532.441 349.712 526.814 345.496 523.999C332.376 517.439 318.038 513.322 307.037 503.67C312.12 509.158 313.655 516.418 317.364 522.592C321.885 529.236 326.721 535.478 331.804 541.378C359.087 552.372 382.88 555.06 382.88 555.06C513.058 575.618 513.058 515.656 513.058 515.656Z"
                fill="#242021"
              />
              <path
                id="Vector_13"
                d="M307.464 431.39C336.252 420.921 372.071 417.475 394.957 394.787C389.414 384.898 386.307 378.604 386.307 378.604C259.557 359.759 252.701 448.842 252.701 448.842C255.053 474.225 265.923 493.661 280.447 508.524C279.681 506.69 278.952 504.826 278.27 502.926C269.511 475.188 282.649 441.608 307.464 431.39Z"
                fill="#231F20"
              />
              <path
                id="Vector_14"
                d="M434.268 280.956C434.268 280.956 430.847 316.906 417.148 328.914C397.909 345.783 389.785 318.945 383.086 305.23C372.384 283.311 355.103 267.048 338.468 249.615C301.03 210.39 252.08 182.531 199.057 170.381C181.182 166.282 162.95 165.031 144.9 168.864C127.284 172.605 104.114 177.612 91.5813 191.49C75.165 209.671 75.0082 239.353 77.2143 262.126C81.7541 308.953 99.6837 364.613 140.677 391.367C177.827 415.616 225.625 433.771 270.334 429.717C306.678 426.417 344.674 410.496 376.03 392.308C376.059 392.289 461.678 342.628 473.664 342.628C473.664 342.628 449.685 279.242 434.268 280.956Z"
                fill="#2C2829"
              />
              <path
                id="Vector_15"
                d="M99.5707 184.624C96.6098 186.64 93.9114 188.908 91.5813 191.49C75.165 209.671 75.0082 239.354 77.2143 262.126C81.7541 308.953 99.6837 364.613 140.677 391.367C177.827 415.616 225.625 433.771 270.338 429.717C296.647 427.328 323.813 418.307 348.715 406.616C283.804 399.298 221.432 374.71 171.708 329.195C132.101 290.9 100.858 239.47 99.5707 184.624Z"
                fill="#292627"
              />
              <path
                id="Vector_16"
                d="M434.267 280.956C434.267 280.956 432.973 294.499 428.808 307.735C438.191 315.517 445.371 323.131 438.833 332.116C430.799 343.241 421.997 356.2 416.936 369.324C440.78 356.321 467.37 342.628 473.663 342.628C473.663 342.628 449.684 279.242 434.267 280.956Z"
                fill="#272324"
              />
              <g id="feather">
                <g id="Mask group">
                  <mask
                    id="mask0_1_2"
                    // style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="69"
                    y="288"
                    width="246"
                    height="319"
                  >
                    <g id="Group">
                      <path
                        id="Vector_17"
                        d="M69.6289 288.686H314.678V607H69.6289V288.686Z"
                        fill="white"
                      />
                    </g>
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <g id="Group_2">
                      <path
                        id="Vector_18"
                        d="M218.377 290.922C202.632 294.236 187.4 301.106 173.617 308.651C135.26 329.636 98.4269 360.733 81.5511 402.025C70.1232 429.983 65.1895 472.624 74.5609 501.953C74.5682 501.986 127.668 668.118 185.898 582.467C185.898 582.467 247.534 471.166 247.563 471.115C257.675 452.861 278.292 437.502 289.796 419.131C305.086 394.718 323.147 359.847 309.943 330.971C300.273 309.818 267.371 291.465 245.354 289.237C236.31 288.318 227.26 289.055 218.377 290.922Z"
                        fill="#302D2E"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                id="Vector_19"
                d="M106.678 508.331C106.652 513.166 106.612 517.957 106.379 522.592C110.54 518.435 108.797 513.293 106.678 508.331Z"
                fill="#302D2E"
              />
              <path
                id="Vector_20"
                d="M130.292 395.983C126.146 399.375 122.572 403.079 119.473 407.021C123.484 404.079 127.276 400.808 130.292 395.983Z"
                fill="#302D2E"
              />
              <g id="Mask group_2">
                <mask
                  id="mask1_1_2"
                  // style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="149"
                  y="291"
                  width="166"
                  height="316"
                >
                  <g id="Group_3">
                    <path
                      id="Vector_21"
                      d="M149.631 291.994H314.68V607H149.631V291.994Z"
                      fill="white"
                    />
                  </g>
                </mask>
                <g mask="url(#mask1_1_2)">
                  <g id="Group_4">
                    <path
                      id="Vector_22"
                      d="M309.943 330.971C302.088 313.792 278.908 298.455 258.677 292.107C274.211 315.59 274.561 349.932 265.131 372.993C241.776 434.311 206.741 486.868 187.765 551.104C180.402 575.648 166.918 593.895 149.674 606.949C161.2 607.594 173.43 600.805 185.898 582.467C185.898 582.467 247.534 471.166 247.563 471.115C257.674 452.861 278.292 437.502 289.796 419.131C305.086 394.718 323.147 359.847 309.943 330.971Z"
                      fill="#2E2A2B"
                    />
                  </g>
                </g>
              </g>
              <g id="Mask group_3">
                <mask
                  id="mask2_1_2"
                  // style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="381"
                  y="0"
                  width="297"
                  height="323"
                >
                  <g id="Group_5">
                    <path
                      id="Vector_23"
                      d="M381.137 0H677.987V322.153H381.137V0Z"
                      fill="white"
                    />
                  </g>
                </mask>
                <g mask="url(#mask2_1_2)">
                  <g id="Group_6">
                    <path
                      id="Vector_24"
                      d="M516.49 0C516.49 0 519.914 41.1174 483.942 56.5346C483.942 56.5346 365.753 94.2207 382.88 190.159C382.88 190.159 396.587 282.669 466.814 322.073C466.814 322.073 650.092 176.456 677.499 126.773C677.499 126.773 605.562 66.814 545.607 70.2416C545.607 70.2416 561.024 51.3968 590.145 56.5346C590.145 56.5346 602.134 44.5414 569.586 41.1174C569.586 41.1174 538.755 41.1174 526.762 51.3968L530.193 11.9932H519.914L516.49 0Z"
                      fill="#2C2829"
                    />
                  </g>
                </g>
              </g>
              <path
                id="Vector_25"
                d="M545.391 168.609C511.818 203.644 472.407 266.421 419.858 237.22C407.219 229.931 396.214 220.202 387.08 208.862C395.051 237.979 416.325 293.748 466.813 322.073C466.813 322.073 650.092 176.456 677.498 126.773C677.498 126.773 671.35 121.65 661.159 114.492C651.24 115.892 641.351 118.237 631.516 121.887C600.864 135.029 570.209 145.25 545.391 168.609Z"
                fill="#231F20"
              />
              <path
                id="Vector_26"
                d="M575.627 173.604C575.627 224.144 534.666 265.123 484.137 265.123C433.605 265.123 392.637 224.144 392.637 173.604C392.637 123.075 433.605 82.0964 484.137 82.0964C534.666 82.0964 575.627 123.075 575.627 173.604Z"
                fill="white"
              />
              <path
                id="Vector_27"
                d="M478.485 230.095C440.927 230.095 409.574 198.746 409.574 161.181C409.574 123.611 440.927 92.2737 478.485 92.2737C516.051 92.2737 547.396 123.611 547.396 161.181C547.396 198.746 516.051 230.095 478.485 230.095ZM484.137 82.0964C433.605 82.0964 392.637 123.075 392.637 173.604C392.637 224.144 433.605 265.123 484.137 265.123C534.666 265.123 575.627 224.144 575.627 173.604C575.627 123.075 534.666 82.0964 484.137 82.0964Z"
                fill="#F5FBFC"
              />
              <path
                id="Vector_28"
                d="M483.758 248.925C438.823 248.925 401.293 211.407 401.293 166.45C401.293 121.496 438.823 83.978 483.758 83.978C528.711 83.978 566.219 121.496 566.219 166.45C566.219 211.407 528.711 248.925 483.758 248.925ZM484.137 82.0964C433.605 82.0964 392.637 123.075 392.637 173.604C392.637 224.144 433.605 265.123 484.137 265.123C534.666 265.123 575.627 224.144 575.627 173.604C575.627 123.075 534.666 82.0964 484.137 82.0964Z"
                fill="#EAF0F1"
              />
              <g id="eye">
                <path
                  id="Vector_29"
                  d="M559.823 154.365C559.823 184.299 535.556 208.57 505.633 208.57C475.703 208.57 451.443 184.299 451.443 154.365C451.443 124.439 475.703 100.168 505.633 100.168C535.556 100.168 559.823 124.439 559.823 154.365Z"
                  fill="#292627"
                />
              </g>
              <path
                id="Vector_30"
                d="M554.628 132.684C551.59 119.323 541.891 108.486 529.205 103.873L520.508 132.684H554.628Z"
                fill="white"
              />
              <g id="Mask group_4">
                <mask
                  id="mask3_1_2"
                  // style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="459"
                  y="126"
                  width="295"
                  height="299"
                >
                  <g id="Group_7">
                    <path
                      id="Vector_31"
                      d="M459.928 126.674H753.081V424.867H459.928V126.674Z"
                      fill="white"
                    />
                  </g>
                </mask>
                <g mask="url(#mask3_1_2)">
                  <g id="Group_8">
                    <path
                      id="Vector_32"
                      d="M677.495 126.773C677.495 126.773 545.603 155.897 506.207 286.094C506.207 286.094 459.955 310.08 459.955 322.073C459.955 322.073 471.952 428.287 660.368 418.004L648.429 370.247L648.371 370.039C648.371 370.039 728.885 411.156 737.45 424.86C737.45 424.86 799.112 217.57 677.495 126.773Z"
                      fill="#FBC108"
                    />
                  </g>
                </g>
              </g>
              <path
                id="Vector_33"
                d="M694.318 379.104C659.152 352.375 616.959 341.119 588.826 305.952C569.136 282.039 549.441 249.684 563.509 220.14C576.049 195.06 593.064 171.963 613.954 153.22C574.397 176.095 527.19 216.76 506.212 286.094C506.212 286.094 459.957 310.08 459.957 322.07C459.957 322.07 471.954 428.287 660.37 418.004L648.435 370.246L648.38 370.039C648.38 370.039 728.887 411.156 737.452 424.859C737.452 424.859 737.547 424.542 737.7 423.992C727.993 405.318 710.786 391.454 694.318 379.104Z"
                fill="#F9B00B"
              />
              <path
                id="Vector_34"
                d="M506.45 285.335C506.373 285.59 506.289 285.838 506.213 286.094C506.213 286.094 459.961 310.08 459.961 322.073C459.961 322.073 471.954 428.287 660.37 418.004L649.332 373.838C632.077 362.582 609.739 358.162 589.184 352.557C554.207 342.759 521.921 318.208 506.45 285.335Z"
                fill="#F79410"
              />
              <path
                id="Vector_35"
                d="M507.08 374.13C495.211 364.744 485.559 352.838 481.927 338.307C480.308 326.165 481.497 310.766 485.997 297.729C473.555 305.547 459.961 315.572 459.961 322.07C459.961 322.07 469.701 408.049 608.911 417.793C590.861 416.531 557.15 399.732 538.918 392.286C528.215 387.917 516.889 381.886 507.08 374.13Z"
                fill="#F68313"
              />
              <path
                id="Vector_36"
                d="M649.332 373.838C632.077 362.582 609.739 358.162 589.184 352.558C573.14 348.065 557.672 340.459 544.125 330.376C573.457 356.857 619.723 365.539 646.113 400.731C650.095 405.376 653.453 411.535 655.269 418.238C656.965 418.165 658.642 418.099 660.37 418.004L649.332 373.838Z"
                fill="#E67013"
              />
              <path
                id="Vector_37"
                d="M524.146 307.564C524.146 307.564 569.191 400.982 637.292 408.728L603.982 357.626C603.982 357.626 535.837 330.956 524.146 307.564Z"
                fill="#EB1F38"
              />
              <path
                id="Vector_38"
                d="M732.866 226.215C731.397 219.458 725.442 200.351 714.875 181.969C704.712 163.237 687.719 147.707 677.422 141.968C708.085 172.437 717.857 217.132 721.588 228.819C738.653 288.351 741.713 354.738 742.526 354.446C741.873 354.585 746.712 284.176 732.866 226.215Z"
                fill="#F9DF4F"
              />
              <g id="Mask group_5">
                <mask
                  id="mask4_1_2"
                  // style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="75"
                  y="397"
                  width="155"
                  height="210"
                >
                  <g id="Group_9">
                    <path
                      id="Vector_39"
                      d="M75.416 397.384H229.344V607H75.416V397.384Z"
                      fill="white"
                    />
                  </g>
                </mask>
                <g mask="url(#mask4_1_2)">
                  <g id="Group_10">
                    <path
                      id="Vector_40"
                      d="M227.344 397.391C221.717 419.9 216.091 443.814 213.279 467.727C210.464 495.863 189.37 515.558 176.709 540.879C189.37 504.305 176.709 462.101 193.589 426.931C186.555 431.153 182.336 438.187 179.521 443.814C175.302 450.848 172.49 459.289 171.083 464.916C165.456 497.271 151.392 521.184 138.731 549.32C131.701 505.712 137.327 462.101 157.018 422.712C147.173 429.746 138.731 439.595 128.886 445.221C106.566 458.148 106.81 483.826 106.679 508.331C108.798 513.293 110.541 518.435 106.38 522.592C106.613 517.957 106.653 513.166 106.679 508.331C105.213 504.899 103.569 501.555 103.569 498.678C99.9148 468.22 99.4408 432.495 119.474 407.021C114.129 410.941 108.389 414.274 103.569 419.9C83.3745 444.904 74.3641 474.513 75.6258 505.125C83.3745 527.704 132.474 661.048 185.898 582.467C185.898 582.467 211.004 537.134 229.178 504.316C229.207 468.679 227.344 433.031 227.344 397.391Z"
                      fill="#2C2829"
                    />
                  </g>
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1_2">
                <rect width="754" height="607" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
