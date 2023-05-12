import { ChangeEvent, useState } from "react";



import Topbar from "@/components/global/topbar";
import Head from "next/head";

import Grid from "@/components/conway/grid";

export default function Conways() {
    
    const [automaton, setAutomaton] = useState('');


   

    return (
        <>
        <Head>
            <title>Conway&apos;s Game of Life</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href='favicon.svg' />
        </Head>
        
        <div className="flex w-full h-screen bg-jet items-center flex-col">

            <Topbar />


            <h1 className="text-yellow text-8xl mt-10 conways text-center [text-shadow:_2px_2px_3px_rgb(255_255_255_/_80%)]"> Conway&apos;s Game of Life</h1>

            <div className="flex flex-col bg-rblack h-3/4 max-h-lg w-3/4 max-w-screen-lg mt-10 rounded-3xl p-5 shadow-lg shadow-rblack"
                onContextMenu={(e) => e.preventDefault()}
            >
                <Grid 
                    prefab_automaton={automaton}
                />
                
            </div>
            
        </div>




        <div className="flex h-[75vh] bg-jet justify-center items-center">
            <div className="flex flex-col w-3/4 max-w-screen-lg h-3/4 bg-rblack rounded-3xl p-10 shadow-lg shadow-rblack">
                <h1 className="w-full text-center text-3xl text-bright font-bold">Conway&apos;s Game of Life</h1>

                <p className="text-bright text-lg font-serif indent-10 mt-10">
                    The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
                    It is a zero-player game, meaning that its evolution is determined by its initial state, 
                    requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
                    It is Turing complete and can simulate a universal constructor or any other Turing machine.
                    
                </p>

                <a className="mt-5 text-yellow text-lg underline hover:text-cambridge" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway&apos;s Game of Life Wikipedia</a>
            </div>
        </div>
        </>
    );
}