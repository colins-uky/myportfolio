import { useState, useEffect } from "react";
import Head from "next/head";


import Sort from "@/components/sorting/sort";
import Topbar from "@/components/global/topbar";

export default function Sorting() {




    return (

        <>
        <Head>
            <title>Conway&apos;s Game of Life</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href='favicon.svg' />
        </Head>

        <div className="flex flex-col items-center w-screen h-screen bg-jet">


            <Topbar />

            <h1 className="text-munsell sorting  font-bold text-8xl mt-10 text-center [text-shadow:_2px_2px_5px_rgb(98_146_158_/_100%)]">
                Sorting
            </h1>

            <div className="flex w-3/4 max-w-screen-lg h-3/4 max-h-lg bg-rblack rounded-3xl mt-[5vh] shadow-lg shadow-rblack p-5 pb-1">

                <Sort />

            </div>



        </div>


        </>
    );
}