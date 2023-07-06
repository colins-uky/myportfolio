import { FaReact, FaJsSquare, FaPython, FaHtml5, FaGitAlt, FaCss3Alt } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";


const iconSize = 100;

export default function SkillsAndTechnologies() {

    

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-0 lg:p-5 mx-10">
            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <FaReact size={iconSize} className="text-react hover:animate-spin-slow sm:min-w-[50px] max-w-[100px] hover:drop-shadow-[0_0_10px_rgba(97,218,251,0.8)]" />
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-react"> ReactJS </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <FaJsSquare size={iconSize} className="text-[#fcdc00] hover:drop-shadow-[0_0_10px_rgba(252,220,0,0.8)] sm:min-w-[50px] max-w-[100px] hover:scale-110 duration-100 ease-in-out transform"/>
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-[#fcdc00]"> JavaScript </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <SiTypescript size={iconSize} className="text-[#2f74c0] hover:drop-shadow-[0_0_10px_rgba(47,116,192,0.8)] lg:w-[80px] xl:w-[135px] sm:min-w-[70px] max-w-[150px] hover:scale-110 duration-100 ease-in-out transform" />
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-[#2f74c0]"> TypeScript </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <FaPython size={iconSize} className="text-[#346e9f] hover:drop-shadow-[0_0_10px_rgba(247,208,69,0.8)] max-w-[100px] sm:min-w-[50px] hover:scale-110 duration-100 ease-in-out transform" />
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-[#f7d045]"> Python </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <FaGitAlt size={iconSize} className="text-[#e84e31] hover:drop-shadow-[0_0_10px_rgba(232,78,49,0.8)] max-w-[100px] sm:min-w-[50px] hover:scale-110 duration-100 ease-in-out transform" />
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-[#e84e31]"> Git </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <FaCss3Alt size={iconSize} className="text-[#2862e9] hover:drop-shadow-[0_0_10px_rgba(40,98,233,0.8)] max-w-[100px] sm:min-w-[50px] hover:scale-110 duration-100 ease-in-out transform"/>
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-[#2862e9]"> CSS </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <FaHtml5 size={iconSize} className="text-[#e96228] hover:drop-shadow-[0_0_10px_rgba(233,98,40,0.8)] max-w-[100px] sm:min-w-[50px] hover:scale-110 duration-100 ease-in-out transform" />
                <h1 className="text-base sm:text-lg lg:text-3xl font-bold mb-4 text-[#e96228]"> HTML </h1>
            </div>

            <div className="flex flex-col items-center px-4 lg:px-10 pt-5 pb-0">
                <TbBrandCpp size={iconSize} className="text-[#6295cb] hover:drop-shadow-[0_0_10px_rgba(98,149,203,0.8)] max-w-[100px] sm:min-w-[50px] hover:scale-110 duration-100 ease-in-out transform" />
                <h1 className="text-3xl sm:text-lg lg:text-3xl font-bold mb-4 text-[#6295cb]"> C/C++ </h1>
            </div>
        </div>
    );
}