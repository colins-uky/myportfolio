import { useState, useEffect } from "react"
import Head from "next/head";
import Topbar from "@/components/global/topbar";
import Board from "@/components/wordle/board";

import WordleList from "@/components/wordle/wordle.json"



const wordleListLength = 2314;

function getRandomWordle() {
    // Generates a random integer between 0 and wordleListLength and returns the value at that index
    return WordleList[Math.floor(Math.random() * (wordleListLength + 1))];
}


interface WordleProps {
    wordle: string;
}

export default function Wordle({ wordle }: WordleProps) {

    


    return (
        <>
        
        <Head>
            <title>Wordle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href='favicon.svg' />
        </Head>
        
        <div className="flex flex-col items-center w-screen h-screen bg-jet">


            <Topbar />

            <h1 className="text-cambridge sorting  font-bold text-7xl mt-5 text-center [text-shadow:_2px_2px_5px_rgb(107_171_144_/_100%)]">
                Wordle: {wordle}
            </h1>

            <div className="flex w-2/5 max-w-4xl h-3/4 max-h-lg bg-rblack rounded-3xl mt-8 shadow-lg shadow-rblack p-5">

                <Board 
                    wordle={wordle}
                />

            </div>



        </div>
        
        
        
        
        </>
    )
}

export async function getServerSideProps() {
    const wordle = getRandomWordle();
  
    return {
        props: { wordle }, // will be passed to the page component as props
    };
}