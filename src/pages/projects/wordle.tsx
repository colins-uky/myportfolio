import { useState, useEffect } from "react"
import Head from "next/head";
import Topbar from "@/components/global/topbar";
import Board from "@/components/wordle/board";


export default function Wordle() {






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
                Wordle
            </h1>

            <div className="flex w-2/5 max-w-4xl h-3/4 max-h-lg bg-rblack rounded-3xl mt-8 shadow-lg shadow-rblack p-5">

                <Board />

            </div>



        </div>
        
        
        
        
        </>
    )
}