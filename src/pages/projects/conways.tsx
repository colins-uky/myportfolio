import { ChangeEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Topbar from "@/components/global/topbar";
import Head from "next/head";

import Grid from "@/components/conway/grid";

export default function Conways() {
    const [gridSize, setGridSize] = useState(25);
    const [resetCells, setResetCells] = useState(false);
    const [startConway, setStartConway] = useState(false);
    const [interval, setInterval] = useState(500);


    function handleStartConway() {
        setStartConway(!startConway);
    }

    function handleButtonClick() {
        setResetCells(!resetCells);
    }


    function handleSliderChange(event: ChangeEvent<HTMLInputElement>) {
        setGridSize(Number(event.target.value));
    }

    function handleIntervalChange(event: ChangeEvent<HTMLInputElement>) {
        setInterval(Number(event.target.value));
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

            <div className="flex flex-col bg-rblack h-3/4 max-h-lg w-3/4 max-w-screen-lg mt-10 rounded-t-3xl p-5"
                onContextMenu={(e) => e.preventDefault()}
            >
                <Grid 
                    rows={gridSize}
                    cols={gridSize}
                    reset={resetCells}
                    conway={startConway}
                    interval={interval}
                
                />
                
            </div>

            <div className="flex flex-row items-center justify-between bg-rblack rounded-b-lg p-2 pl-7 pr-7 h-20 w-3/4 max-w-screen-lg mb-5">

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



                <div className="flex flex-col text-yellow">
                    <Form.Label className="mb-2 -mt-2 font-bold text-lg">
                        Interval (ms): {interval}
                    </Form.Label>
                    <Form.Range
                        min={100}
                        max={2000}
                        value={interval}
                        onChange={handleIntervalChange}
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
                    onClick={handleStartConway}
                >
                    Start/Stop
                </Button>
            </div>



            
        </div>




        <div className="flex h-[75vh] bg-jet justify-center items-center">
            <div className="flex flex-col w-3/4 h-3/4 bg-rblack rounded-3xl p-10">
                <h1 className="w-full text-center text-3xl text-bright font-bold">Conway's Game of Life</h1>

                <p className="text-bright text-lg font-serif indent-10 mt-10">The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>

                <a className="mt-5 text-yellow text-lg underline hover:text-cambridge" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway's Game of Life Wikipedia</a>
            </div>
        </div>
        </>
    );
}