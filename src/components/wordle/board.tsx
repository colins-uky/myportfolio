import React, { useState, useEffect, KeyboardEvent } from 'react';

interface SquareProps {
    letter: string;
    isCurrent: boolean;
    index: number;
    color: string | null;
}

interface BoardProps {
    wordle: string;
    wordleSet: Set<string>;
}

// Helper function for calculateGuessColors() function
function countLetters(str: string) {
    const counts: { [letter: string]: number } = {};
    for (let i = 0; i < str.length; i++) {
        const letter = str[i];
        if (!counts[letter]) {
            counts[letter] = 1;
        } else {
            counts[letter]++;
        }
    }
    return counts;
}


function Board({ wordle, wordleSet }: BoardProps) {
    let upperWordle = wordle ? wordle.toUpperCase() : '';
    const totalSquares = 30;


    // Initialize states for square data
    const [squares, setSquares] = useState<string[]>(Array(totalSquares).fill(''));
    const [flipState, setFlipState] = useState<Array<boolean>>(Array(totalSquares).fill(false));
    const [colors, setColors] = useState<Array<string>>(Array(totalSquares).fill(null));

    // Keep track of current square & row
    const [currentSquare, setCurrentSquare] = useState<number>(0);
    const [currentRow, setCurrentRow] = useState(1);

    // Track last input for animations
    const [lastAction, setLastAction] = useState<"typing" | "backspacing" | "enter" | null>(null);

    const [animateRow, setAnimateRow] = useState<number | null>(null);
    const [blockInput, setBlockInput] = useState(false);


    // SQUARE COMPONENT
    function Square({ letter, isCurrent, index, color }: SquareProps) {
        const row = Math.floor(index / 5) + 1;
        const animation = flipState[index] ? "" : (isCurrent && lastAction === "typing" ? "bounce" : "");
        const animate = flipState[index] ? "" : (row === animateRow ? `flip 0.5s ${index % 5 * 0.4}s forwards` : "");

        const squareColors = flipState[index] ? (color ? `${color} text-white` : 'bg-jet text-white') : (letter ? "border-4 border-dgrey bg-lgrey" : "border-4 border-grey bg-lgrey");

        const backColors = color ? `${color} text-white` : "bg-jet text-white";

    

        
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
    // END SQUARE COMPONENT

    function handleKeyDown(event: KeyboardEvent): void {
        if(currentSquare <= totalSquares) {
            const keyPressed = event.key.toUpperCase();


            if (keyPressed === 'ENTER' && currentSquare === 5 * currentRow) {
                setLastAction('enter');

                // Send only the correct row to handleSubmitGuess
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

        // Use a set to store words as .has() is O(1) where .includes() for arrays is O(n), 
        //                                  hash maps :-)                  in this case n=5757
        if (!wordleSet.has(guess.toLowerCase())) {
            // Guess is NOT in wordle list
            console.log("GUESS NOT IN WORDLE LIST");
            return;
        }

        // Guess IS in wordle list

        // Block the input while the animation is playing
        setBlockInput(true);
        // Increase the row count only if valid guess
        setCurrentRow(currentRow + 1);

        const isGameWon = calculateGuessColors(guess);

       



        // Begin the animation, cancel animation after 2 seconds and allow input
        setAnimateRow(currentRow);
        setTimeout(() => {
            setFlipState(flipState.map((flip, index) => index < currentSquare ? true : flip));
            setBlockInput(false);
        }, 2000);
    }

    function calculateGuessColors(guess: string): boolean {
        const guessCounts = countLetters(guess);
        const wordleCounts = countLetters(upperWordle);

        let newColors = [...colors];
        let countCorrect = 0;


        // Iterate through the characters in guess
        for (let i = 0; i < guess.length; i++) {
            let letter = guess[i];

            

            // If letter is the same in both and in the same position
            // Background color = green
            if (letter === upperWordle[i]) {
                newColors[currentSquare - guess.length + i] = 'bg-wordle-green';

                // Decrease the count for current letter from both as the guess was correct
                wordleCounts[letter]--;
                guessCounts[letter]--;

                // Increase correct count, == 5 means game won
                countCorrect++;
            }
            // letter is in the word but in the incorrect position
            else if (upperWordle.includes(letter)) {
                if (guessCounts[letter] <= wordleCounts[letter]) {
                    newColors[currentSquare - guess.length + i] = 'bg-wordle-yellow';
                    
                }
                guessCounts[letter]--;
                
            }
            // If letter isnt in wordle at all, leave null for bg-jet
        }

        setColors(newColors);


        // Return boolean based on countCorrect
        return countCorrect == 5;
    }


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown as any);
        return () => window.removeEventListener('keydown', handleKeyDown as any);
        
    }, [currentSquare, squares, currentRow, blockInput]);


    useEffect(() => {
        // Resets the game if the wordle changes
        upperWordle = wordle.toUpperCase();
        setSquares(Array(totalSquares).fill(''));
        setCurrentSquare(0);
        setCurrentRow(1);
        setLastAction(null);
        setAnimateRow(null);
        setFlipState(Array(totalSquares).fill(false));
        setColors(Array(totalSquares).fill(null));
      }, [wordle]);

    return (
        <div className="grid grid-cols-5 w-full gap-1.5" style={{gridTemplateRows: "repeat(6, 1fr)"}}>
            {squares.map((letter, index) => <Square key={index} letter={letter} isCurrent={index === currentSquare - 1} index={index} color={colors[index]}/>)}
        </div>
    );
}

export default Board;