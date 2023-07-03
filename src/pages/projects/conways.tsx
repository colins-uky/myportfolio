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
        
        <div className="flex w-full bg-jet items-center flex-col">

            <Topbar 
                BGcolor="bg-yellow"
            />


            <h1 className="text-yellow text-7xl mt-10 conways text-center [text-shadow:_2px_2px_3px_rgb(255_255_255_/_80%)]"> Conway&apos;s Game of Life</h1>

            
            <Grid prefab_automaton={automaton} />
 
        </div>




        <div className="flex bg-jet justify-center items-center pb-16">
            <div className="flex flex-col w-3/4 max-w-screen-lg bg-rblack rounded-3xl p-10 mt-20 shadow-lg shadow-rblack">
                <h1 className="w-full text-center text-3xl text-bright font-bold">Conway&apos;s Game of Life</h1>

                <p className="text-bright text-lg font-serif indent-10 mt-10">
                    The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
                    It is a zero-player game, meaning that its evolution is determined by its initial state, 
                    requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
                    It is Turing complete and can simulate a universal constructor or any other Turing machine.
                    
                </p>

                <p className="text-bright text-lg font-serif indent-10 mt-10">
                    The Game of Life is a famous example of the <a className="mt-5 text-yellow text-lg underline hover:text-cambridge" href="https://en.wikipedia.org/wiki/Halting_problem" target="_blank" rel="noreferrer">Halting Problem</a>, which
                    states that a general solution that determines if a program will get stuck in a loop forever, or &quot;halt&quot; cannot exist. In this case, a general algorithm that can determine if the Game of Life will fizzle out (All cells dead)
                    or if the Game of Life will reach a stable configuration of cells, is impossible. Alonzo Church and Alan Turing both proved this separately in 1936 and in 1937 respectively. Church used lamba calculus for his proof while 
                    Turing used his famous hypothetical machines, the <a className="mt-5 text-yellow text-lg underline hover:text-cambridge" href="https://en.wikipedia.org/wiki/Turing_machine" target="_blank" rel="noreferrer">Turing Machine</a>.
                    
                </p>

                <a className="mt-5 text-yellow text-lg underline hover:text-cambridge" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noreferrer">Conway&apos;s Game of Life Wiki</a>
            </div>
        </div>
        </>
    );
}