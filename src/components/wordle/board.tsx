import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Keyboard from './keyboard';
import PopUp from './popUp';





interface SquareProps {
    letter: string;
    isCurrent: boolean;
    index: number;
    color: string | null;
}

interface BoardProps {
    initialWordle: string;
    WordleList: string[];
    WordleSet: Set<string>;
    getRandomWordle: () => string;
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



const totalSquares = 30;

function Board({ initialWordle, WordleList, WordleSet, getRandomWordle }: BoardProps) {

    const [squares, setSquares] = useState<string[]>(Array(totalSquares).fill(''));
    const [colors, setColors] = useState<Array<string>>(Array(totalSquares).fill(null));

    const [wordle, setWordle] = useState(initialWordle);


    const [showWordle, setShowWordle] = useState(false);

    // Initialize states for square data
    const [flipState, setFlipState] = useState<Array<boolean>>(Array(totalSquares).fill(false));

    // Keep track of current square & row
    const [currentSquare, setCurrentSquare] = useState<number>(0);
    const [currentRow, setCurrentRow] = useState(1);

    // Track last input for animations
    const [lastAction, setLastAction] = useState<"typing" | "backspacing" | "enter" | null>(null);

    const [animateRow, setAnimateRow] = useState<number | null>(null);
    const [blockInput, setBlockInput] = useState(false);

    const [showPopUp, setShowPopUp] = useState(false);


    let title = showWordle ? `Wordle: ${wordle}` : 'Wordle'
    let upperWordle = wordle ? wordle.toUpperCase() : '';



    // SQUARE COMPONENT
    function Square({ letter, isCurrent, index, color }: SquareProps) {
        const row = Math.floor(index / 5) + 1;
        const animation = flipState[index] ? "" : (isCurrent && lastAction === "typing" ? "bounce" : "");
        const animate = flipState[index] ? "" : (row === animateRow ? `flip 0.5s ${index % 5 * 0.4}s forwards` : "");

        const squareColors = flipState[index] ? (color ? `${color} text-white` : 'bg-jet text-white') : (letter ? "border-4 border-dgrey bg-lgrey" : "border-4 border-grey bg-lgrey");

        const backColors = color ? `${color} text-white` : "bg-jet text-white";

    

        
        return (
            <div className={`w-full aspect-square relative rounded-sm ${animation}`} style={{animation: animate, transformStyle: 'preserve-3d', animationFillMode: 'forwards'}}>
                <div className={`absolute w-full h-full flex items-center justify-center ${squareColors}`} style={{ backfaceVisibility: 'hidden' }}>
                    <h1 className="text-[2em] font-bold m-0">{letter}</h1>
                </div>
                <div className={`absolute w-full h-full flex items-center justify-center ${backColors}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h1 className="text-[2em] font-bold m-0" style={{transform: 'rotateX(180deg) rotateY(180deg)'}}>{letter}</h1>
                </div>
            </div>
        );
    }
    // END SQUARE COMPONENT

    function handleKeyDown(event: React.KeyboardEvent | undefined, key?: string): void {
        if(currentSquare <= totalSquares) {
            let keyPressed = '';
            if (key) {
                keyPressed = key;
            }
            else if (event) {
                keyPressed = event.key.toUpperCase();
            }

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
        if (!WordleSet.has(guess.toLowerCase())) {
            // Guess is NOT in wordle list
            setShowPopUp(true);
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
        <>
        <h1 className="text-pink sorting font-bold text-3xl lg:text-5xl 2xl:text-7xl text-center mt-1 [text-shadow:_2px_2px_5px_rgb(252_100_113_/_100%)]">
            {title}
        </h1>
        <div className={`flex flex-col ${showPopUp ? "animate-shake" : ""}`}>
            <div className="flex w-[60vw] lg:w-[40vw] max-w-[400px] bg-rblack rounded-t-3xl mt-2 shadow-lg shadow-rblack p-4">

                <div className="grid grid-cols-5 grow gap-1.5" style={{gridTemplateRows: "repeat(6, 1fr)"}}>
                    {squares.map((letter, index) => <Square key={index} letter={letter} isCurrent={index === currentSquare - 1} index={index} color={colors[index]}/>)}
                </div>

            </div>


            <div className="flex flex-row-reverse aspect-[30/4] w-[60vw] lg:w-[40vw] max-w-[400px] bg-rblack rounded-b-3xl mb-6 shadow-lg shadow-rblack pb-3 px-3 justify-between">
                <Button
                    className="bg-jet w-1/3 h-full rounded-xl text-pink text-xs lg:text-lg font-bold shadow-md hover:shadow-pink transition hover:scale-110"
                    tabIndex={-1}
                    onClick={(e) => {
                        setWordle(getRandomWordle());
                        setShowWordle(false);
                        e.currentTarget.blur();
                    }}
                >
                    New Game
                </Button>

                <Button
                    className="bg-jet w-1/3 h-full rounded-xl text-pink text-xs lg:text-lg font-bold shadow-md hover:shadow-pink transition hover:scale-110"
                    tabIndex={-1}
                    onClick={(e) => {
                        setShowWordle(!showWordle);
                        e.currentTarget.blur();
                    }}
                >
                    Reveal Word
                </Button>
            </div>

        </div>

        <div>
            <Keyboard 
                colors={colors}
                squares={squares}
                handleKeyPress={handleKeyDown}
            />
        </div>

        <PopUp
            message='Not a valid word. Try again.'
            visibility={showPopUp}
            setVisibility={setShowPopUp}
        />
        </>
    );
}

export default Board;

