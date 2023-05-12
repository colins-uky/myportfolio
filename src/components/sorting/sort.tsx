import { ChangeEvent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";



const NUM_ITEMS = 20;


export default function Sort() {

    const [array, setArray] = useState(randomArray(NUM_ITEMS));
    const maxInt = Math.max(...array);
    const [interval, setInterval] = useState(150);
    const [startSort, setStartSort] = useState(false);

    const [comparisonCounter, setComparisonCounter] = useState(0);

    const [algorithm, setAlgorithm] = useState('Merge');




    function randomArray(n: number): number[] {
        // Creates new array from iterable object of length n,
        // Fills the array with its index + 1
        // arr = [1, 2, 3, ..., n]
        const arr = Array.from({ length: n }, (_, i) =>  i + 1 );

        // Smart Fisher-Yates array shuffling algorithm 
        // Time Complexity = O(n) => only 1 loop :-)
        for (let i = n-1; i >= 1; i--) {
            // Generate random integer j in range [0, i]
            let j = Math.floor(Math.random() * (i + 1));

            // Swap arr[i] and arr[j]
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        return arr;
    }

    function handleStartSort() {

    }

    function handleResetSort() {
        setArray(randomArray(NUM_ITEMS));
    }

    function handleChangeAlg(event: React.ChangeEvent<HTMLSelectElement>) {
        setAlgorithm(event.target.value);
        setArray(randomArray(NUM_ITEMS));
    }

    function handleIntervalChange(event: ChangeEvent<HTMLInputElement>) {
        setInterval(Number(event.target.value));
    }

    useEffect(() => {
        console.log(algorithm);
    }, [algorithm])

    return (
        <div className="flex flex-col h-full w-full">
        
            <div className="flex flex-row items-end bg-jet h-[93%] w-full">


                {array.map((value, index) => (
                    <div
                        key={index}
                        className="bg-bright grow"
                        style={{
                            height: `${(value / maxInt) * 100}%`,
                            borderRight: index < array.length - 1 ? '1px solid #000' : 'none',
                        }}
                    />
                ))}



            </div>

            <div className="flex flex-row justify-evenly items-center bg-rblack h-[7%] pt-1">




                <Form.Select className="bg-jet w-44 h-12 rounded-2xl text-center text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                             onChange={handleChangeAlg}
                >
                    <option value="Merge">Merge Sort</option>
                    <option value="Quick">Quick Sort</option>
                    <option value="Insertion">Insertion Sort</option>
                    <option value="Bubble">Bubble Sort</option>
                    <option value="Bogo">Bogo Sort</option>
                </Form.Select>




                <div className="flex flex-col text-munsell">
                    <Form.Label className="font-bold text-lg">
                        Comparisons: {comparisonCounter}
                    </Form.Label>
                </div>


                <div className="flex flex-col text-munsell sort">
                    <Form.Label className="mb-2 -mt-2 font-bold text-lg">
                        Interval (ms): {interval}
                    </Form.Label>
                    <Form.Range
                        className="slider"
                        min={100}
                        max={2000}
                        value={interval}
                        onChange={handleIntervalChange}
                    />
                </div>


                <Button 
                    className="bg-jet w-32 h-12 rounded-2xl text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleResetSort}

                >
                    Reset 
                </Button>



                <Button
                    className="bg-jet w-32 h-12 rounded-2xl text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleStartSort}
                >
                    Start/Stop
                </Button>


            </div>

        </div>
    );
}