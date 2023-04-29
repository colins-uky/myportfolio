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
}



export default function Grid({ rows, cols, reset }:GridProps) {


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


    useEffect(() => {
        resetCells();
    }, [rows, cols, reset])



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