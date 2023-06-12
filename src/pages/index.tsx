import { useState } from "react";

import Topbar from "@/components/global/topbar";



export default function Home() {



    


    return (
        <div className="flex flex-col bg-rblack items-center">
            <Topbar 
                BGcolor="bg-cambridge"
            />

            <div className="flex flex-col w-3/4 bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Welcome to my website!</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />
            </div>
            

            <div className="flex flex-col w-3/4 bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
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

            <div className="flex flex-col w-3/4 bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Projects</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />
            </div>

            <div className="flex flex-col w-3/4 bg-jet mt-20 rounded-3xl shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Skills & Technologies</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />
            </div>


            <div className="flex flex-col w-full bg-rblack mt-20 shadow-lg shadow-jet p-10 text-bright">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-cambridge">Socials</h1>
                </div>
                <div className="w-full h-1 bg-cambridge" />
                
            </div>

        </div>
    );

}   