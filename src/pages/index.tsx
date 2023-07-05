import Topbar from "@/components/global/topbar";
import Particles from "@/components/global/particles";
import SkillsAndTechnologies from "@/components/global/skills";
import Projects from "@/components/global/projects";
import Clubs from "@/components/global/clubs/clubs";

import { Button } from "react-bootstrap";

import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Link from "next/link";



export default function Home() {

    return (
        <>
        
        <div className="flex flex-col bg-transparent items-center">
            
            <Topbar />

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold mb-4 text-cambridge">Colin Schuh</h1>
                    
                </div>

                <div className="w-full rounded h-1 bg-cambridge mb-4" />

                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-bright"> Welcome to my website!</h2>
                </div>
                
                <div className="flex justify-center mt-4">
                    <Link href='https://github.com/colins-uky/myportfolio' target="_blank" passHref className="flex flex-row hover:text-cambridge">
                        <FaGithubSquare className="w-8 h-8"/>
                        <h1 className="mt-1 ml-1 underline"> View full website code on GitHub</h1>
                    </Link>
                </div>

            </div>
            

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">About me</h1>
                </div>

                <div className="w-full rounded h-1 bg-cambridge" />
                
                <p className="text-xl my-6">
                    I&apos;m a Senior Computer Science & Mathematics Student at the University of Kentucky, College of Engineering.
                </p>
                <p className="text-lg mb-2">
                    An active member of various clubs including KORA (Kentucky Organization of Robotics and Automation), where I hold an officer role, the Smile Club advocating for mental health awareness and suicide prevention, the SnowCats, an extreme outdoorsman club, and the Esports Club.
                </p>

                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-4xl font-bold text-cambridge mb-3"> Clubs</h2>

                    <div className="w-full rounded h-1 bg-cambridge mb-4" />
                    
                    <Clubs />

                </div>

                <p className="text-lg mb-6">
                    I have a passion for Front End Software Development, Machine Learning, and Machine Vision. I&apos;m constantly looking for new challenges and opportunities to advance in these fields.
                </p>
            </div>

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Projects</h1>
                </div>
                <div className="w-full rounded h-1 bg-cambridge" />

                <Projects />
                
            </div>

            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Skills & Technologies</h1>
                </div>
                <div className="w-full rounded h-1 bg-cambridge" />

                <SkillsAndTechnologies />

            </div>





            <div className="flex flex-col w-3/4 max-w-5xl bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Resum&eacute;</h1>
                </div>
                <div className="w-full rounded h-1 bg-cambridge mb-4" />

                <div className="flex flex-row w-full my-4 justify-evenly">
                    <Link href="/documents/Schuh_Colin_Resume.pdf" target="_blank" passHref>
                        <Button className="bg-button px-5 py-3 rounded-2xl hover:bg-cambridge hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]" variant="primary"
                            >
                            <h1 className="text-lg"> View in Browser </h1>
                        </Button>
                    </Link>


                    <Button className="bg-button text-bright px-5 py-3 rounded-2xl hover:bg-cambridge hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]" variant="primary"
                        href="/api/downloadResume">
                        <h1 className="text-lg"> Download Resum&eacute; </h1>
                    </Button>
                </div>
            </div>



            <div className="flex flex-col w-full bg-transparent mt-20 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Socials</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />
                
                <div className=" flex flex-row justify-evenly text-7xl text-cambridge pb-10 pt-4">

                    <a href="https://www.linkedin.com/in/colinschuh" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin
                        className="transition-transform duration-200 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]"
                        />
                    </a>

                    <a href="https://github.com/colins-uky" target="_blank" rel="noopener noreferrer">
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