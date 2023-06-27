import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faW, faTableCells, faChartSimple, faBookBookmark } from "@fortawesome/free-solid-svg-icons";




export default function Projects() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-10">
            <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(255,177,0,0.8)]">
                <Link href="/projects/conways">
                    <div className="flex border-8 border-yellow p-5 rounded-xl aspect-square justify-center">
                        <FontAwesomeIcon icon={faTableCells} className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32" color="#FFB100" />
                    </div>
                    <div className="max-w-[160px] text-center">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 mt-2 text-yellow">Conway&apos;s Game of Life</h1>
                    </div>
                </Link>
            </div>

            <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(252,100,113,0.8)]">
                <Link href="/projects/wordle">
                    <div className="flex border-8 border-pink p-5 rounded-xl aspect-square justify-center">
                        <FontAwesomeIcon icon={faW} className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32" color="#FC6471" />
                    </div>
                    <div className="max-w-[160px] text-center">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 mt-2 text-pink">Wordle Clone</h1>
                    </div>
                </Link>
            </div>

            <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(98,146,158,0.8)]">
                <Link href="/projects/sorting">
                    <div className="flex border-8 border-munsell p-5 rounded-xl aspect-square justify-center">
                        <FontAwesomeIcon icon={faChartSimple} className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32" color="#62929E" />
                    </div>
                    <div className="flex justify-center max-w-[160px] text-center">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 mt-2 text-munsell">Visual Sorting</h1>
                    </div>
                </Link>
            </div>

            <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(196,73,0,0.8)]">
                <Link href="/projects/sportsbook">
                    <div className="flex border-8 border-orange p-5 rounded-xl aspect-square justify-center">
                        <FontAwesomeIcon icon={faBookBookmark} className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32" color="#C44900" />
                    </div>
                    <div className="flex justify-center max-w-[160px] text-center">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 mt-2 text-orange">Live Sports Book (WIP)</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
}