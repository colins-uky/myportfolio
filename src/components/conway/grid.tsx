import { ChangeEvent, useState, useEffect, useRef, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Automata from "./conway_prefabs.json";

type Cell = {
    row: number;
    col: number;
    alive: boolean;
};

interface GridProps {
    prefab_automaton: string;
}




export default function Grid({ prefab_automaton }: GridProps) {

    const [interval, setInterval] = useState(150);
    const [conwayCounter, setConwayCounter] = useState(0);
    const [conway, setConway] = useState(false);

    const [rows, setRows] = useState(25);
    const [cols, setCols] = useState(25);


    const buttonTitle = conway ? 'Stop' : 'Start';

    // Initialize 1D array of cell objects with row, column, and alive state
    // Initialize all cells to dead
    const [cells, setCells] = useState<Cell[]>(() => {

        const initialCells: Cell[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                initialCells.push({ row, col, alive: false });
            }
        }

        return initialCells;

    });

    const isDragging = useRef<boolean>(false);

    


    const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
        e.preventDefault();
        isDragging.current = true;

        const leftClick = e.button === 0;
        toggleCell(row, col, leftClick);
    }

    const handleMouseUp = () => {
        isDragging.current = false;
    }


    function handleSliderChange(event: ChangeEvent<HTMLInputElement>) {
        setCols(Number(event.target.value));
        setRows(Number(event.target.value));
    }

    function handleIntervalChange(event: ChangeEvent<HTMLInputElement>) {
        setInterval(Number(event.target.value));
    }

    function handleClearCells() {
        resetCells();
    }

    function handleStartConway() {
        setConway(!conway);
    }


    function buildAutomaton(automaton: string) {
        
    }

    function logAliveCells() {
        console.log(cells.filter(cell => cell.alive));
    }

    
    

    function toggleCell(row: number, col: number, isLeftClick: boolean) {
        if (isDragging.current) {
            setCells((prevCells) =>
                prevCells.map((cell) =>
                    cell.row === row && cell.col === col ? { ...cell, alive: isLeftClick } : cell
                )
            );
        }
        
    };

    const resetCells = useCallback(() => {
        setCells(() => {
            const initialCells: Cell[] = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    initialCells.push({ row, col, alive: false });
                }
            }

            return initialCells;
        });
        setConwayCounter(0);
        setConway(false);
    }, [rows, cols]);

    const countAliveNeighbors = useCallback((row: number, col: number, cells: Cell[]): number => {

        let aliveNeighbors = 0;

        // Define the neighbor coordinates
        const offsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0,  -1],          [0,  1],
            [1,  -1], [1,  0], [1,  1]
        ];


        offsets.forEach(([rowOffset, colOffset]) => {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;

            // Check if cell row and column is between 0 and rows and cols
            if  (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols)  {
                // (newRow, newCol) should be a valid index, 
                // so neighbor is the cell at (newRow, newCol).
                const neighbor = cells.find(cell => cell.row === newRow && cell.col === newCol);

                // Check if neighbor exists and if it is alive
                if (neighbor && neighbor.alive) {
                    aliveNeighbors++;
                }
            }
        });

        return aliveNeighbors;
    }, [rows, cols]);

    // Logic for the rules of John Horton Conways game of life
    /* 
      1.  Any live cell with two or three live neighbours survives.
      2.  Any dead cell with three live neighbours becomes a live cell.
      3.  All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    */
    const Conways_Game_Of_Life = useCallback((currentCells: Cell[]):Cell[] => {

        let newCells = currentCells.map((cell) => {

            const aliveNeighbors = countAliveNeighbors(cell.row, cell.col, currentCells);

            let newAliveStatus = cell.alive;

            if (cell.alive) {
                // 1.  Any live cell with two or three live neighbours survives.
                newAliveStatus = aliveNeighbors === 2 || aliveNeighbors === 3;
            }
            else {
                // 2.  Any dead cell with three live neighbours becomes a live cell.
                newAliveStatus = aliveNeighbors === 3;
            }

            // 3.  All other live cells die in the next generation. 
            //     Similarly, all other dead cells stay dead.
            //     ( If none of the conditions above are satisfied 
            //     then alive status will not have changed)

            return { ...cell, alive: newAliveStatus };

        });

        return newCells;
    }, [countAliveNeighbors])


    


    // Listens for changes in row and column state vars
    // For Grid size slider
    useEffect(() => {
        resetCells();
    }, [rows, cols, resetCells]);


    // Listens for changes to conway boolean or interval number
    // If conway is true, conways game of life is executed periodically every interval milliseconds
    useEffect(() => {
        let timerId: number | undefined;
      
        if (conway) {
            timerId = window.setInterval(() => {
                setCells((currentCells) => {
                    return Conways_Game_Of_Life(currentCells);
                });
                setConwayCounter((prevCounter) => prevCounter + 1);
            }, interval);
        } else {
            if (timerId !== undefined) {
                window.clearInterval(timerId);
            }
        }
      
        // Clean up the effect when the component is unmounted or the props change
        return () => {
            if (timerId !== undefined) {
                window.clearInterval(timerId);
            }
        };
    }, [conway, interval, Conways_Game_Of_Life]);



    useEffect(() => {
        console.log("PREFAB CHANGED!");
        buildAutomaton(prefab_automaton);
    }, [prefab_automaton])


    return (
        <>
        <div className="flex flex-col bg-rblack w-3/4 max-w-3xl aspect-square mt-10 rounded-t-3xl p-5 shadow-lg shadow-rblack"
                onContextMenu={(e) => e.preventDefault()}
        >
        <div
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '1px',
          }}
          onMouseLeave={handleMouseUp}
          className="flex w-full aspect-square"
        >
          {cells.map((cell, index) => (
            <div
              key={index}
              onMouseDown={(e) => handleMouseDown(e, cell.row, cell.col)}
              onMouseUp={handleMouseUp}
              onMouseEnter={(e) => toggleCell(cell.row, cell.col, isDragging.current && e.buttons === 1)}
              onContextMenu={(e) => e.preventDefault()}
              style={{               //        yellow   :    jet
                backgroundColor: cell.alive ? '#FFB100' : '#343434',
                cursor: 'pointer',
              }}
              className="aspect-square"
            ></div>
          ))}
        </div>


        </div>

        <div className="flex flex-row items-center justify-between bg-rblack rounded-b-3xl pb-2 pl-7 pr-7 h-15 w-3/4 max-w-3xl shadow-lg shadow-rblack">

            <div className="flex flex-col text-yellow conway">
                <Form.Label className="mb-2 -mt-2 font-bold text-sm sm:text-lg">
                    Grid Size: {cols}
                </Form.Label>
                <Form.Range
                    className="w-12 sm:w-24"
                    min={10}
                    max={45}
                    value={cols}
                    onChange={handleSliderChange}
                />
            </div>



            <div className="flex flex-col text-yellow conway">
                <Form.Label className="mb-2 -mt-2 font-bold text-sm sm:text-lg">
                    Interval (ms): {interval}
                </Form.Label>
                <Form.Range
                    className="w-12 sm:w-24"
                    min={100}
                    max={2000}
                    value={interval}
                    onChange={handleIntervalChange}
                />
            </div>

            <div className="flex flex-col text-yellow">
                <Form.Label className="font-bold text-sm sm:text-lg">
                    Count: {conwayCounter}
                </Form.Label>
            </div>


            <Button 
                className="bg-jet w-16 sm:w-32 h-12 rounded-xl text-yellow text-sm sm:text-xl font-bold hover:shadow-md hover:shadow-yellow transition hover:scale-110"
                onClick={handleClearCells}

            >
                Clear 
            </Button>



            <Button
                className="bg-jet w-16 sm:w-32 h-12 rounded-xl text-yellow text-sm sm:text-xl font-bold hover:shadow-md hover:shadow-yellow transition hover:scale-110"
                onClick={handleStartConway}
            >
                {buttonTitle}
            </Button>
        </div>
        </>
    );            
}