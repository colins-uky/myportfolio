import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from "react-bootstrap/Button";
import Keyboard from './keyboard';
import PopUp from './popUp';
import Modal from '../global/modal';





interface SquareProps {
    letter: string;
    isCurrent: boolean;
    index: number;
    color: string | null;
}

interface BoardProps {
    initialWordle: string;
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

function Board({ initialWordle, WordleSet, getRandomWordle }: BoardProps) {

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

    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);

    const [winningStreak, setWinningStreak] = useState(0);
    const [upperWordle, setUpperWordle] = useState(wordle ? wordle.toUpperCase() : '');

    let title = showWordle ? `Wordle: ${wordle}` : 'Wordle'

    // SQUARE COMPONENT
    function Square({ letter, isCurrent, index, color }: SquareProps) {
        const row = Math.floor(index / 5) + 1;
        const animation = flipState[index] ? "" : (isCurrent && lastAction === "typing" ? "bounce" : "");
        const animate = flipState[index] ? "" : (row === animateRow ? `flip 0.5s ${index % 5 * 0.4}s forwards` : "");

        const squareColors = flipState[index] ? (color ? `${color} text-white` : 'bg-jet text-white') : (letter ? "border-[3px] sm:border-4 border-dgrey bg-lgrey" : "border-[3px] sm:border-4 border-grey bg-lgrey");

        const backColors = color ? `${color} text-white` : "bg-jet text-white";

    

        
        return (
            <div className={`w-full aspect-square relative rounded-sm ${animation}`} style={{animation: animate, transformStyle: 'preserve-3d', animationFillMode: 'forwards'}}>
                <div className={`absolute w-full h-full flex items-center justify-center ${squareColors}`} style={{ backfaceVisibility: 'hidden' }}>
                    <h1 className="text-xl sm:text-3xl font-bold m-0">{letter}</h1>
                </div>
                <div className={`absolute w-full h-full flex items-center justify-center ${backColors}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h1 className="text-xl sm:text-3xl font-bold m-0" style={{transform: 'rotateX(180deg) rotateY(180deg)'}}>{letter}</h1>
                </div>
            </div>
        );
    }
    // END SQUARE COMPONENT


    // WORDLE GAME FUNCTIONS
    const calculateGuessColors = useCallback((guess: string) => {
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
    }, [colors, currentSquare, upperWordle]);

    const handleSubmitGuess = useCallback((guessArr: string[]) => {
        const guess = guessArr.join('');

        // Use a set to store words as .has() is O(1) where .includes() for arrays is O(n), 
        //                                  hash maps :-)                  in this case n=5757
        if (!WordleSet.has(guess.toLowerCase())) {
            // Guess is NOT in wordle list
            setShowPopUp(true);
            return;
        }

        // Guess IS in wordle list

        // Block the input while the animation is playing
        setBlockInput(true);
        // Increase the row count only if valid guess
        setCurrentRow(currentRow + 1);

        const gameWon = calculateGuessColors(guess);



        // Begin the animation, cancel animation after 2 seconds and allow input
        setAnimateRow(currentRow);
        setTimeout(() => {
            setFlipState(flipState.map((flip, index) => index < currentSquare ? true : flip));
            setBlockInput(false);
            setIsGameWon(gameWon);
            setIsGameLost(!isGameWon && currentRow === 6);
        }, 2000);

    }, [WordleSet, calculateGuessColors, currentRow, currentSquare, flipState, isGameWon]);


    const handleKeyDown = useCallback((event: React.KeyboardEvent | undefined, key?: string): void => {
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
    }, [currentSquare, squares, currentRow, blockInput, handleSubmitGuess]);
    // END WORDLE GAME FUNCTIONS


    const handleCloseWinWindow = () => {
        setIsGameWon(false);
        setWordle(getRandomWordle());
    }

    const handleCloseLoseWindow = () => {
        setIsGameLost(false);
        setWordle(getRandomWordle());
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown as any);
        return () => window.removeEventListener('keydown', handleKeyDown as any);
        
    }, [currentSquare, squares, currentRow, blockInput, handleKeyDown]);

    useEffect(() => {
        // Resets the game if the wordle changes
        setUpperWordle(wordle.toUpperCase());
        setSquares(Array(totalSquares).fill(''));
        setCurrentSquare(0);
        setCurrentRow(1);
        setLastAction(null);
        setAnimateRow(null);
        setFlipState(Array(totalSquares).fill(false));
        setColors(Array(totalSquares).fill(null));
        setShowWordle(false);
    }, [wordle]);


    useEffect(() => {
        console.log(isGameLost);
        if (isGameWon) {
            setWinningStreak((prevWinStreak) => ++prevWinStreak)
        }
        else if (isGameLost) {
            setWinningStreak(0);
        }
    }, [isGameLost, isGameWon])

    return (
        <>
        <h1 className="text-pink font-bold text-4xl lg:text-5xl 2xl:text-7xl text-center my-2 sm:my-6 [text-shadow:_2px_2px_5px_rgb(252_100_113_/_100%)]">
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
        

        <Modal isVisible={isGameWon} onClose={handleCloseWinWindow} noBlur={true}>
            <div className='flex flex-col py-4 px-10 mx-4 sm:mx-24 items-center'>
                <h1 className='text-pink text-3xl sm:text-5xl font-bold pb-4 sm:pb-8'> Nice Job! </h1>

                <h1 className='text-bright text-2xl sm:text-4xl pb-4 font-bold'> The word was <span className='text-pink'>{wordle}</span></h1>

                <p className='text-bright text-xl sm:text-2xl font-bold align-start'>Winning streak: <span className='text-pink'>{winningStreak}</span></p>
            </div>
        </Modal>

        <Modal isVisible={isGameLost} onClose={handleCloseLoseWindow} noBlur={true}>
            <div className='flex flex-col py-4 px-10 mx-4 sm:mx-24 items-center'>
                <h1 className='text-pink text-3xl sm:text-5xl font-bold pb-4 sm:pb-8'> Game Over! </h1>

                <h1 className='text-bright text-2xl sm:text-4xl font-bold pb-4'> The word was <span className='text-pink'>{wordle}</span></h1>

                <p className='text-bright text-xl sm:text-2xl font-bold align-start'>Winning streak: <span className='text-pink'>{winningStreak}</span></p>
            </div>
        </Modal>
        </>
    );
}

export default Board;

