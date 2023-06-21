import { useState, CSSProperties } from "react";

import Topbar from "@/components/global/topbar";
import Particles from "@/components/global/particles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithubSquare, FaLinkedin, FaReact, FaJsSquare, FaPython, FaHtml5, FaGitAlt } from "react-icons/fa";
import { faW, faTableCells, faChartSimple } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import Image from "next/image";


export default function Home() {


    return (
        <>
        
        <div className="flex flex-col bg-transparent items-center">
            
            <Topbar 
                BGcolor="bg-cambridge"
            />

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold mb-4 text-cambridge">Colin Schuh</h1>
                    
                </div>

                <div className="w-full h-1 bg-cambridge mb-4" />

                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-bright"> Welcome to my website!</h2>
                </div>
                
            </div>
            

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">About me</h1>
                </div>

                <div className="w-full h-1 bg-cambridge" />
                
                <p className="text-xl my-6">
                    I&apos;m a Senior Computer Science & Mathematics Student at the University of Kentucky, College of Engineering.
                </p>
                <p className="text-lg mb-6">
                    An active member of various clubs including KORA (Kentucky Organization of Robotics and Automation), where I hold an officer role, the Smile Club advocating for mental health awareness and suicide prevention, and the Esports Club.
                </p>
                <p className="text-lg mb-6">
                    I have a passion for Front End Software Development, Machine Learning, and Machine Vision. I&apos;m constantly looking for new challenges and opportunities to advance in these fields.
                </p>
            </div>

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Projects</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />

                <div className="flex flex-row w-full pt-5 justify-evenly">


                    <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(255,177,0,0.8)]">
                        <Link href="/projects/conways">
                            <div className="flex border-8 border-yellow p-5 rounded-xl aspect-square justify-center w-40 h-40">
                                <FontAwesomeIcon icon={faTableCells} size="6x" color="#FFB100" />
                            </div>
                            <div className="max-w-[160px] text-center">
                                <h1 className="text-2xl font-bold mb-4 mt-2 text-yellow">Conway&apos;s Game of Life</h1>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(252,100,113,0.8)]">
                        <Link href="/projects/wordle">
                            <div className="flex border-8 border-pink p-5 rounded-xl aspect-square justify-center pt-7 w-40 h-40">
                                <FontAwesomeIcon icon={faW} size="5x" color="#FC6471" />
                            </div>
                            <div className="max-w-[160px] text-center">
                                <h1 className="text-2xl font-bold mb-4 mt-2 text-pink">Wordle Clone</h1>
                            </div>
                        </Link>
                    </div>


                    <div className="flex flex-col items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(98,146,158,0.8)]">
                        <Link href="/projects/sorting">
                            <div className="flex border-8 border-munsell p-5 rounded-xl aspect-square justify-center pt-7 w-40 h-40">
                                <FontAwesomeIcon icon={faChartSimple} size="5x" color="#62929E" />
                            </div>
                            <div className="max-w-[160px] text-center">
                                <h1 className="text-2xl font-bold mb-4 mt-2 text-munsell">Visual Sorting</h1>
                            </div>
                        </Link>
                    </div>

                    
                    


                </div>
            </div>

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Skills & Technologies</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />

                <div className="flex flex-row p-5 mx-10">
                    
                    <div className="flex flex-col items-center grow px-10 pt-5 pb-0">
                        <FaReact size="xl" className="text-react hover:animate-spin-slow hover:drop-shadow-[0_0_10px_rgba(97,218,251,0.8)]" />
                        <h1 className="text-3xl font-bold mb-4 text-react"> ReactJS </h1>
                    </div>

                    <div className="flex flex-col items-center grow px-10 pt-5 pb-0">
                        <FaJsSquare size="xl" className="text-[#fcdc00] hover:drop-shadow-[0_0_10px_rgba(252,220,0,0.8)] w-[100px] hover:scale-110 duration-100 ease-in-out transform"/>
                        <h1 className="text-3xl font-bold mb-4 text-[#fcdc00]"> JavaScript </h1>
                    </div>

                    <div className="flex flex-col items-center grow px-10 pt-5 pb-0">
                        <FaHtml5 size="xl" className="text-[#e96228] hover:drop-shadow-[0_0_10px_rgba(233,98,40,0.8)] hover:scale-110 duration-100 ease-in-out transform" />
                        <h1 className="text-3xl font-bold mb-4 text-[#e96228]"> HTML </h1>
                    </div>

                    <div className="flex flex-col items-center grow px-10 pt-5 pb-0">
                        <FaPython size="xl" className="text-[#346e9f] hover:drop-shadow-[0_0_10px_rgba(247,208,69,0.8)] hover:scale-110 duration-100 ease-in-out transform" />
                        <h1 className="text-3xl font-bold mb-4 text-[#f7d045]"> Python </h1>
                    </div>


                </div>

                
            </div>


            <div className="flex flex-col w-full bg-transparent mt-20 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Socials</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />
                
                <div className="flex flex-row justify-evenly text-7xl text-cambridge pb-10 pt-4">

                    <a href="https://www.linkedin.com/in/colinschuh" target="_blank">
                        <FaLinkedin
                        className="transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]"
                        />
                    </a>

                    <a href="https://github.com/colins-uky" target="_blank">
                        <FaGithubSquare 
                            className="transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]"
                        />
                    </a>
                </div>
            </div>

            
        </div>

        <Particles />
        </>
    );

}   