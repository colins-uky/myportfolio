import { useState, useEffect, useRef } from "react";

type Cell = {
    row: number;
    col: number;
    alive: boolean;
};

type GridProps = {
    rows: number;
    cols: number;
    reset: boolean;
    conway: boolean;
    interval: number;
}



export default function Grid({ rows, cols, reset, conway, interval }:GridProps) {


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



    const toggleCell = (row: number, col: number, isLeftClick: boolean) => {
        if (isDragging.current) {
            setCells((prevCells) =>
                prevCells.map((cell) =>
                    cell.row === row && cell.col === col ? { ...cell, alive: isLeftClick } : cell
                )
            );
        }
        
    };

    function resetCells() {
        setCells(() => {
            const initialCells: Cell[] = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    initialCells.push({ row, col, alive: false });
                }
            }

            return initialCells;
        })
    }

    // Logic for the rules of John Horton Conways game of life
    /* 
      1.  Any live cell with two or three live neighbours survives.
      2.  Any dead cell with three live neighbours becomes a live cell.
      3.  All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    */
    function Conways_Game_Of_Life() {
        console.log("CONWAYS GAME OF LIFE!");

        // Copy cells array
        let newCells = cells;


        // Get alive cells to test neighbors
        let aliveCells = cells.filter(cell => cell.alive);

        // Conways Main logic //

        aliveCells.forEach((cell) => {
            const row = cell.row;
            const col = cell.col;


            // Define the neighbor coordinates
            const offsets = [
                [-1, -1], [-1, 0], [-1, 1],
                [0,  -1],          [0,  1],
                [1,  -1], [1,  0], [1,  1]
            ];

            // Iterate over each neighbor
            offsets.forEach(([rowOffset, colOffset]) => {
                const newRow = row + rowOffset;
                const newCol = col + colOffset;
            });
        });

    }




    useEffect(() => {
        resetCells();
    }, [rows, cols, reset])

    useEffect(() => {
        let timerId: number | undefined;
      
        if (conway) {
            timerId = window.setInterval(() => {
                Conways_Game_Of_Life();
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
    }, [conway, interval]);


    return (
        <div
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '1px',
          }}
          onMouseLeave={handleMouseUp}
          className="flex w-full h-full"
        >
          {cells.map((cell, index) => (
            <div
              key={index}
              onMouseDown={(e) => handleMouseDown(e, cell.row, cell.col)}
              onMouseUp={handleMouseUp}
              onMouseEnter={(e) => toggleCell(cell.row, cell.col, isDragging.current && e.buttons === 1)}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                backgroundColor: cell.alive ? '#FFB100' : '#343434',
                cursor: 'pointer',
              }}
            ></div>
          ))}
        </div>
    );

    
}