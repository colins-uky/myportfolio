import React, { useState, useEffect, KeyboardEvent } from 'react';

interface SquareProps {
    letter: string;
}

function Square({ letter }: SquareProps) {
    return (
        <div className="flex w-full h-full overflow-hidden bg-jet rounded-lg items-center justify-center">
            <h1 className="text-6xl font-bold text-white m-0">{letter}</h1>
        </div>
    );
}

function Board() {
    const totalSquares = 30;
    const [squares, setSquares] = useState<string[]>(Array(totalSquares).fill(''));
    const [currentSquare, setCurrentSquare] = useState<number>(0);

    function handleKeyDown(event: KeyboardEvent): void {
        if(currentSquare < totalSquares) {
            const keyPressed = event.key.toUpperCase();
            
            if (/^[A-Z]$/.test(keyPressed)) {
                const newSquares = [...squares];
                newSquares[currentSquare] = keyPressed;
                setSquares(newSquares);
                setCurrentSquare(currentSquare + 1);
            }
            else if (keyPressed === 'BACKSPACE' && currentSquare > 0) {
                const newSquares = [...squares];
                newSquares[currentSquare - 1] = '';
                setSquares(newSquares);
                setCurrentSquare(currentSquare - 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown as any);
        return () => window.removeEventListener('keydown', handleKeyDown as any);
    }, [currentSquare, squares]);

    return (
        <div className="grid grid-cols-5 w-full gap-1" style={{gridTemplateRows: "repeat(6, 1fr)"}}>
            {squares.map((letter, index) => <Square key={index} letter={letter} />)}
        </div>
    );
}

export default Board;
