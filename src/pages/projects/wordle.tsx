import { useState, useEffect } from "react"
import Head from "next/head";
import Topbar from "@/components/global/topbar";
import Board from "@/components/wordle/board";

import WordleList from "@/components/wordle/wordle.json"

import Button from "react-bootstrap/Button";




const wordleListLength = 2314;

function getRandomWordle() {
    // Generates a random integer between 0 and wordleListLength and returns the value at that index
    return WordleList[Math.floor(Math.random() * (wordleListLength + 1))];
}


interface WordleProps {
    initialWordle: string;
}

export default function Wordle({ initialWordle }: WordleProps) {

    const [wordle, setWordle] = useState(initialWordle);


    if (!wordle) {
        return (
            <div> Loading Wordle...</div>
        )
    }

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

            <div className="flex w-2/5 min-w-[600px] max-w-[800px] h-3/4 max-h-lg bg-rblack rounded-t-3xl mt-8 shadow-lg shadow-rblack px-5 pt-5 pb-3">

                <Board 
                    wordle={wordle}
                />

            </div>

            <div className="flex flex-row-reverse w-2/5 min-w-[600px] max-w-[800px] h-[5%] max-h-lg bg-rblack rounded-b-3xl mb-10 shadow-lg shadow-rblack pb-3 px-3 justify-between">
                <Button
                    className="bg-jet w-32 h-full rounded-2xl text-cambridge text-xl font-bold shadow-md hover:shadow-cambridge transition hover:scale-110"
                    onClick={() => setWordle(getRandomWordle())}
                >
                    Reset Game
                </Button>

                
            </div>



        </div>
        
        
        
        
        </>
    )
}

export async function getServerSideProps() {
    const wordle = getRandomWordle();
  
    return {
        props: { initialWordle: wordle }, // will be passed to the page component as props
    };
}