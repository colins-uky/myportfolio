import { ChangeEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Topbar from "@/components/global/topbar";
import Head from "next/head";

import Grid from "@/components/conway/grid";

export default function Conways() {
    const [gridSize, setGridSize] = useState(25);
    const [resetCells, setResetCells] = useState(false);


    function handleButtonClick() {
        setResetCells(!resetCells);
    }


    function handleSliderChange(event: ChangeEvent<HTMLInputElement>) {
        setGridSize(Number(event.target.value));
    }

    return (
        <>
        <Head>
            <title>Conway's Game of Life</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href='favicon.svg' />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Rubik+Pixels&display=swap');
            </style>
        </Head>
        
        <div className="flex w-full h-screen bg-jet items-center flex-col">

            <Topbar />


            <h1 className="text-yellow text-8xl mt-10 conways text-center [text-shadow:_2px_2px_3px_rgb(255_255_255_/_80%)]"> Conway's Game of Life</h1>

            <div className="flex flex-col bg-rblack h-3/4 max-h-lg w-3/4 max-w-screen-lg mt-10 rounded-3xl p-5"
                onContextMenu={(e) => e.preventDefault()}
            >
                <Grid 
                    rows={gridSize}
                    cols={gridSize}
                    reset={resetCells}
                
                />
                
            </div>

            <div className="flex flex-row items-center justify-between bg-rblack rounded-lg p-2 pl-7 pr-7 h-20 w-3/4 max-w-screen-lg mt-5 mb-5">

                <div className="flex flex-col text-yellow">
                    <Form.Label className="mb-2 -mt-2 font-bold text-lg">
                        Grid Size: {gridSize}
                    </Form.Label>
                    <Form.Range
                        min={25}
                        max={100}
                        value={gridSize}
                        onChange={handleSliderChange}
                    />
                </div>


                <Button 
                    className="bg-jet w-32 h-12 rounded-2xl text-yellow text-xl font-bold hover:shadow-md hover:shadow-yellow transition hover:scale-110"
                    onClick={handleButtonClick}
                
                >
                    Clear 
                </Button>



                <Button
                    className="bg-jet w-32 h-12 rounded-2xl text-yellow text-xl font-bold hover:shadow-md hover:shadow-yellow transition hover:scale-110"
                >
                    Start/Stop
                </Button>
            </div>



            
        </div>
        </>
    );
}