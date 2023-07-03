import { useEffect } from "react";

import { FaBackspace } from "react-icons/fa";

function getAllIndices(arr: string[], val: string) {
    let indices = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indices.push(i);
        }
    }
    return indices;
}

interface KeyboardProps {
    colors: string[];
    squares: string[];
    handleKeyPress: (event?: React.KeyboardEvent, key?: string) => void;
}

export default function Keyboard({ colors, squares, handleKeyPress}: KeyboardProps) {

    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    ];

    const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

    const handleButtonClick = (key: string) => {
        handleKeyPress(undefined, key);
    }
    

    return (
        <div className="flex flex-col items-center justify-center">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex mb-2">
                    {row.map((letter) => {
                        // Check if the letter is in squares and get its color
                        let indices = getAllIndices(squares, letter);
                        let color = null;
                        for (let index of indices) {
                            let colorAtIndex = colors?.[index];
                            if (colorAtIndex === 'bg-wordle-green') {
                                color = 'bg-wordle-green';
                                break;
                            } else if (colorAtIndex) {
                                color = colorAtIndex;
                            }
                        }
                        if (!color && indices.length > 0) {
                            color = 'bg-dgrey';
                        }

                        return (
                            <button
                                key={letter}
                                className={`mx-1 py-3 px-4 rounded text-xl font-bold ${color ? color : "bg-grey"}`}
                                onClick={() => handleButtonClick(letter)}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            ))}

            <div className="flex mb-2">
                <button
                    className="mx-1 py-3 px-4 rounded text-xl font-bold bg-grey"
                    onClick={() => handleButtonClick('ENTER')}
                >
                    Enter
                </button>

                {bottomRow.map((letter) => {
                    let indices = getAllIndices(squares, letter);
                    let color = null;
                    for (let index of indices) {
                        let colorAtIndex = colors?.[index];
                        if (colorAtIndex === 'bg-wordle-green') {
                            color = 'bg-wordle-green';
                            break;
                        } else if (colorAtIndex) {
                            color = colorAtIndex;
                        }
                    }
                    if (!color && indices.length > 0) {
                        color = 'bg-dgrey';
                    }

                    return (
                        <button
                            key={letter}
                            className={`mx-1 py-3 px-4 rounded text-xl font-bold ${color ? color : "bg-grey"}`}
                            onClick={() => handleButtonClick(letter)}
                        >
                            {letter}
                        </button>
                    );
                })}

                <button
                    className="mx-1 py-3 px-4 rounded text-xl font-bold bg-grey"
                    onClick={() => handleButtonClick('BACKSPACE')}
                >
                    <FaBackspace />
                </button>
            </div>
        </div>
    );
}