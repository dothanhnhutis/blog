import React from "react";
import RecoverForm from "./form";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const RecoverPage = ({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) => {
  return (
    <div
      className="flex flex-col flex-grow sm:flex-grow-0 sm:grid grid-cols-12 transition-all
      "
    >
      <div className="flex flex-col flex-grow sm:flex-grow-0 sm:col-start-3 sm:col-end-11 mx-auto w-full sm:max-w-[570px] p-4">
        <div className="flex flex-col flex-grow space-y-6">
          <div className="mt-10 mb-6 text-center">
            <div className="inline-flex  w-[145px] h-[130px] min-w-[145px] min-h-[130px]">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 145 130"
                aria-hidden="true"
                role="img"
              >
                <path
                  d="M1.026 122.217h142.948c.586 0 1.026.44 1.026 1.026 0 .587-.44 1.026-1.026 1.026H1.026A1.002 1.002 0 010 123.243c0-.44.44-1.026 1.026-1.026z"
                  fill="url(#paint0_linear_11370_56330-uid-2)"
                ></path>
                <path
                  d="M22.725 118.257c0 3.372 2.639 6.157 5.717 6.157h88.115c3.225 0 5.718-2.785 5.718-6.157V54.773h-99.55v63.484z"
                  fill="url(#paint1_linear_11370_56330-uid-2)"
                ></path>
                <path
                  d="M122.128 118.113L80.49 84.245c-2.2-1.759-5.278-2.199-7.77-1.026-2.64-1.173-5.572-.733-7.771 1.026l-41.931 33.868 45.156-32.548c.88-.587 1.906-1.026 2.933-1.32 0 0 .88-.146 1.466-.146s1.466.146 1.466.146a5.9 5.9 0 012.932 1.32l45.157 32.548z"
                  fill="url(#paint2_linear_11370_56330-uid-2)"
                ></path>
                <path
                  d="M22.725 54.773l49.848 35.774 49.848-35.774H22.725z"
                  fill="url(#paint3_linear_11370_56330-uid-2)"
                ></path>
                <path
                  d="M68.029 6.98L22.726 54.774h99.696L77.119 6.979a6.208 6.208 0 00-9.09 0z"
                  fill="#9AAA97"
                ></path>
                <path
                  d="M110.839 63.132l.146-20.232-17.886-19.06-40.612-.44-13.635 14.515-.293 27.27 34.307 25.217 37.973-27.27z"
                  fill="#65735B"
                ></path>
                <path
                  d="M106.001 22.668h-72.28c1.612 3.079 2.639 6.598 2.639 10.41v31.375L72.573 90.55l36.067-25.804V33.078c0-3.813-1.026-7.331-2.639-10.41z"
                  fill="url(#paint4_linear_11370_56330-uid-2)"
                ></path>
                <path
                  d="M98.67 71.782c0-11.729-9.53-21.259-21.259-21.405h-1.76C63.777 50.23 54.247 59.76 54.1 71.635v2.64c0 1.026 0 2.052.146 3.078L72.573 90.55 98.67 71.782z"
                  fill="#D5E0D5"
                ></path>
                <path
                  d="M91.925 76.621l2.199-1.612c.586-1.76.88-3.812.88-5.718v-2.64c.146-11.728-9.384-21.405-21.26-21.551h-1.759c11.73.146 21.26 9.676 21.26 21.552v2.639c0 2.639-.44 5.131-1.32 7.33z"
                  fill="url(#paint5_linear_11370_56330-uid-2)"
                ></path>
                <path
                  d="M72.573 90.55l19.353-13.782a20.905 20.905 0 001.32-7.331v-2.64c.146-11.728-9.384-21.405-21.26-21.551-11.729-.147-21.405 9.383-21.405 21.112v2.64c0 2.198.293 4.397.88 6.45l21.112 15.101z"
                  fill="#95DF00"
                ></path>
                <path
                  d="M69.495 78.087c-.587 0-1.32-.293-1.76-.733l-8.943-7.77c-1.32-1.173-1.466-3.226-.44-4.545 1.027-1.32 2.933-1.613 4.252-.44l6.89 6.011 11.583-12.022c1.173-1.32 3.079-1.173 4.252 0 1.173 1.32 1.173 3.372 0 4.545L71.841 77.208c-.587.733-1.466 1.026-2.346.88z"
                  fill="#14A800"
                ></path>
                <path
                  d="M68.175 85.562l-45.45 32.695c0 3.372 2.64 6.158 5.718 6.158h88.115c3.225 0 5.718-2.786 5.718-6.158L76.972 85.562a7.481 7.481 0 00-8.796 0z"
                  fill="url(#paint6_linear_11370_56330-uid-2)"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_11370_56330-uid-2"
                    x1=".003"
                    y1="123.345"
                    x2="145.143"
                    y2="123.345"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#C3D2C3" stopOpacity="0"></stop>
                    <stop offset=".393" stopColor="#C3D2C3"></stop>
                    <stop offset=".441" stopColor="#C3D2C3"></stop>
                    <stop offset=".723" stopColor="#C3D2C3"></stop>
                    <stop
                      offset="1"
                      stopColor="#C3D2C3"
                      stopOpacity=".014"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_11370_56330-uid-2"
                    x1="72.573"
                    y1="124.425"
                    x2="72.573"
                    y2="54.84"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#65735B"></stop>
                    <stop offset=".037" stopColor="#75836D"></stop>
                    <stop offset=".106" stopColor="#8D9C88"></stop>
                    <stop offset=".186" stopColor="#A1B09E"></stop>
                    <stop offset=".279" stopColor="#B0BFAF"></stop>
                    <stop offset=".393" stopColor="#BBCABA"></stop>
                    <stop offset=".554" stopColor="#C1D0C1"></stop>
                    <stop offset="1" stopColor="#C3D2C3"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_11370_56330-uid-2"
                    x1="72.611"
                    y1="118.106"
                    x2="72.611"
                    y2="82.547"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#65735B"></stop>
                    <stop offset=".004" stopColor="#66745C"></stop>
                    <stop offset=".091" stopColor="#798872"></stop>
                    <stop offset=".194" stopColor="#889783"></stop>
                    <stop offset=".322" stopColor="#92A28E"></stop>
                    <stop offset=".502" stopColor="#98A895"></stop>
                    <stop offset="1" stopColor="#9AAA97"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_11370_56330-uid-2"
                    x1="72.573"
                    y1="90.545"
                    x2="72.573"
                    y2="54.84"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".598" stopColor="#65735B"></stop>
                    <stop offset=".646" stopColor="#6C7A63"></stop>
                    <stop offset="1" stopColor="#9AAA97"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_11370_56330-uid-2"
                    x1="33.323"
                    y1="63.312"
                    x2="108.214"
                    y2="35.056"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F2F7F2"></stop>
                    <stop offset=".668" stopColor="#F0F5F0"></stop>
                    <stop offset=".908" stopColor="#E9F0E9"></stop>
                    <stop offset="1" stopColor="#E4EBE4"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_11370_56330-uid-2"
                    x1="83.558"
                    y1="76.681"
                    x2="83.558"
                    y2="45.149"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#7EB200"></stop>
                    <stop offset=".114" stopColor="#83BC00"></stop>
                    <stop offset=".404" stopColor="#8DCF00"></stop>
                    <stop offset=".698" stopColor="#93DB00"></stop>
                    <stop offset="1" stopColor="#95DF00"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint6_linear_11370_56330-uid-2"
                    x1="72.574"
                    y1="124.425"
                    x2="72.574"
                    y2="84.078"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#65735B"></stop>
                    <stop offset=".037" stopColor="#75836D"></stop>
                    <stop offset=".106" stopColor="#8D9C88"></stop>
                    <stop offset=".186" stopColor="#A1B09E"></stop>
                    <stop offset=".279" stopColor="#B0BFAF"></stop>
                    <stop offset=".393" stopColor="#BBCABA"></stop>
                    <stop offset=".554" stopColor="#C1D0C1"></stop>
                    <stop offset="1" stopColor="#C3D2C3"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
            <span>Update your password</span>
          </h1>
          <div className="text-center text-muted-foreground text-base">
            Enter your email address and select <strong>Send Email</strong>.
          </div>
          <RecoverForm email={searchParams.email} />
        </div>
      </div>
    </div>
  );
};

export default RecoverPage;
