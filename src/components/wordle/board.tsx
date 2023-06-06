import React, { useState, useEffect, KeyboardEvent } from 'react';

interface SquareProps {
    letter: string;
    isCurrent: boolean;
    index: number;
}

interface BoardProps {
    wordle: string;
}



function Board({ wordle }: BoardProps) {
    const upperWordle = wordle ? wordle.toUpperCase() : '';
    const totalSquares = 30;
    const [squares, setSquares] = useState<string[]>(Array(totalSquares).fill(''));
    const [currentSquare, setCurrentSquare] = useState<number>(0);

    const [currentRow, setCurrentRow] = useState(1);
    const [lastAction, setLastAction] = useState<"typing" | "backspacing" | "enter" | null>(null);

    const [animateRow, setAnimateRow] = useState<number | null>(null);

    const [flipState, setFlipState] = useState<Array<boolean>>(Array(totalSquares).fill(false));

    const [blockInput, setBlockInput] = useState(false);

    function Square({ letter, isCurrent, index }: SquareProps) {
        const row = Math.floor(index / 5) + 1;
        const animation = flipState[index] ? "" : (isCurrent && lastAction === "typing" ? "bounce" : "");
        const animate = flipState[index] ? "" : (row === animateRow ? `flip 0.5s ${index % 5 * 0.4}s forwards` : "");

        const squareColors = flipState[index] ? "bg-wordle-green text-white" : (letter ? "border-4 border-dgrey bg-lgrey" : "border-4 border-grey bg-lgrey");
        const backColors = "bg-wordle-green text-white";

        
        return (
            <div className={`w-full h-full relative rounded-sm ${animation}`} style={{animation: animate, transformStyle: 'preserve-3d', animationFillMode: 'forwards'}}>
                <div className={`absolute w-full h-full flex items-center justify-center ${squareColors}`} style={{ backfaceVisibility: 'hidden' }}>
                    <h1 className="text-[3vw] font-bold m-0">{letter}</h1>
                </div>
                <div className={`absolute w-full h-full flex items-center justify-center ${backColors}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h1 className="text-[3vw] font-bold m-0" style={{transform: 'rotateX(180deg) rotateY(180deg)'}}>{letter}</h1>
                </div>
            </div>
        );
    }

    function handleKeyDown(event: KeyboardEvent): void {
        if(currentSquare < totalSquares) {
            const keyPressed = event.key.toUpperCase();


            if (keyPressed === 'ENTER' && currentSquare === 5 * currentRow) {
                setBlockInput(true);
                setCurrentRow(currentRow + 1);

                
                setLastAction('enter');
                


                
                handleSubmitGuess(squares.slice(currentSquare - 5, currentSquare));
                return;
            }
            
            
            if (/^[A-Z]$/.test(keyPressed) && currentSquare < 5 * currentRow && !blockInput) {
                const newSquares = [...squares];
                newSquares[currentSquare] = keyPressed;
                setSquares(newSquares);
                setCurrentSquare(currentSquare + 1);
                setLastAction("typing");
            }
            else if (keyPressed === 'BACKSPACE' && currentSquare > 5 * (currentRow - 1)) {
                const newSquares = [...squares];
                newSquares[currentSquare - 1] = '';
                setSquares(newSquares);
                setCurrentSquare(currentSquare - 1);
                setLastAction("backspacing");
            }
            
            
        }
    };


    function handleSubmitGuess(guessArr: string[]) {
        const guess = guessArr.join('');

        console.log(guess);
        console.log(upperWordle);

        setAnimateRow(currentRow);
                
        setTimeout(() => {
            setFlipState(flipState.map((flip, index) => index < currentSquare ? true : flip));
            setBlockInput(false);
        }, 2000);
    }


    useEffect(() => {
        console.log(currentSquare);
        window.addEventListener('keydown', handleKeyDown as any);
        return () => window.removeEventListener('keydown', handleKeyDown as any);
        
    }, [currentSquare, squares, currentRow, blockInput]);


    useEffect(() => {
        // Resets the game if the wordle changes
        setSquares(Array(totalSquares).fill(''));
        setCurrentSquare(0);
        setCurrentRow(1);
        setLastAction(null);
        setAnimateRow(null);
      }, [wordle]);

    return (
        <div className="grid grid-cols-5 w-full gap-1 gap-y-2" style={{gridTemplateRows: "repeat(6, 1fr)"}}>
            {squares.map((letter, index) => <Square key={index} letter={letter} isCurrent={index === currentSquare - 1} index={index} />)}
        </div>
    );
}

export default Board;
