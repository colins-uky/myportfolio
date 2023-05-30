import { useState, useEffect } from "react";
import Head from "next/head";


import Sort from "@/components/sorting/sort";
import Topbar from "@/components/global/topbar";

export default function Sorting() {




    return (
        <>
            <Head>
                <title>Sorting</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href='favicon.svg' />
            </Head>

            <Topbar />

            <div className="flex flex-col items-center w-full h-screen bg-jet">


                

                <h1 className="text-munsell sorting  font-bold text-7xl mt-5 text-center [text-shadow:_2px_2px_5px_rgb(98_146_158_/_100%)]">
                    Sorting
                </h1>

                <div className="flex w-3/4 max-w-4xl h-3/4 max-h-lg bg-rblack rounded-3xl mt-8 shadow-lg shadow-rblack p-5 pb-1">

                    <Sort />

                </div>



            </div>



            <div className="flex h-[75vh] bg-jet justify-center items-center">



            </div>

        </>
    );
}