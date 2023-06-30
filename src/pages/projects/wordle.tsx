import { useState, useEffect } from "react"
import Head from "next/head";
import Topbar from "@/components/global/topbar";
import Board from "@/components/wordle/board";
import Keyboard from "@/components/wordle/keyboard";

import WordleList from "@/components/wordle/words.json"

import Button from "react-bootstrap/Button";




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

    const [wordle, setWordle] = useState(initialWordle);
    const [showWordle, setShowWordle] = useState(false);

    let title = showWordle ? `Wordle: ${wordle}` : 'Wordle'

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


            <Topbar 
                BGcolor="bg-pink"
            />

            
            <h1 className="text-pink sorting font-bold text-7xl mt-5 text-center [text-shadow:_2px_2px_5px_rgb(252_100_113_/_100%)]">
                {title}
            </h1>

            <div className="flex w-[60vw] lg:w-[40vw] max-w-[400px] aspect-[3/4] bg-rblack rounded-t-3xl mt-8 shadow-lg shadow-rblack px-5 pt-5 pb-3">

                <Board 
                    wordle={wordle}
                    wordleSet={WordleSet}
                />

            </div>

            <div className="flex flex-row-reverse aspect-[30/4] w-[60vw] lg:w-[40vw] max-w-[400px] bg-rblack rounded-b-3xl mb-10 shadow-lg shadow-rblack pb-3 px-3 justify-between">
                <Button
                    className="bg-jet w-1/3 h-full rounded-xl text-pink text-xs lg:text-lg font-bold shadow-md hover:shadow-pink transition hover:scale-110"
                    tabIndex={-1}
                    onClick={(e) => {
                        setWordle(getRandomWordle());
                        setShowWordle(false);
                        e.currentTarget.blur();
                    }}
                >
                    New Game
                </Button>

                <Button
                    className="bg-jet w-1/3 h-full rounded-xl text-pink text-xs lg:text-lg font-bold shadow-md hover:shadow-pink transition hover:scale-110"
                    tabIndex={-1}
                    onClick={(e) => {
                        setShowWordle(!showWordle);
                        e.currentTarget.blur();
                    }}
                >
                    Reveal Word
                </Button>
            </div>

            <div>
                <Keyboard 
                    colors={null}
                    squares={null}
                />
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