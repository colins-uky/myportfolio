import { useState, useEffect } from "react"
import Head from "next/head";
import Topbar from "@/components/global/topbar";
import Board from "@/components/wordle/board";

import WordleList from "@/components/wordle/words.json"




const wordleListLength = WordleList.length;

// Initialize a set of all wordle words for O(1) membership testing
// Creating a set from an array is O(n), however we will be querying the set 
// at minimum once during the game, realistically many more times.
const WordleSet = new Set(WordleList);


function getRandomWordle() {
    // Generates a random integer between 0 and wordleListLength and returns the value at that index
    return WordleList[Math.floor(Math.random() * (wordleListLength + 1))];
}

interface WordleProps {
    initialWordle: string;
}

export default function Wordle({ initialWordle }: WordleProps) {



    return (
        <>
        
        <Head>
            <title>Wordle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href='favicon.svg' />
        </Head>
        
        <div className="flex flex-col items-center w-screen h-screen bg-jet">


            <Topbar 
                BGcolor="bg-pink"
            />


            <Board 
                initialWordle={initialWordle}
                WordleList={WordleList}
                WordleSet={WordleSet}
                getRandomWordle={getRandomWordle}
            />

        </div>
        </>
    )
}

export async function getServerSideProps() {
    const wordle = getRandomWordle();
  
    return {
        props: { initialWordle: wordle }, // will be passed to the page as props
    };
}

