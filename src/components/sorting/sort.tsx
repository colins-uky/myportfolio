import { ChangeEvent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";



const NUM_ITEMS = 25;


export default function Sort() {

    const [barCount, setBarCount] = useState(25);
    const [array, setArray] = useState(randomArray(NUM_ITEMS));
    const maxInt = Math.max(...array);
    const [interval, setInterval] = useState(20);


    const [startSort, setStartSort] = useState(false);
    const [startScan, setStartScan] = useState(false);

    const [isSorted, setIsSorted] = useState(false);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    

    const [comparisonCounter, setComparisonCounter] = useState(0);

    const [algorithm, setAlgorithm] = useState('Merge');




    // Define generator function to store the previous state
    function* insertionSort(arr: number[]) {
        let i = 1;

        while (i < arr.length) {
            let x = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > x) {
                arr[j + 1] = arr[j];
                j--;

                yield {array: [...arr], index: j+1, comparison: true};
            }

            arr[j + 1] = x;
            i++;
            yield {array: [...arr], index: null, comparison: false};
        }

        yield {array: [...arr], index: null, comparison: false};
    }


    function* mergeSort(arr: number[]) {
        
    }


    

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

    function descendingArray(n: number): number[] {
        let arr = [];

        for (let i = n; i > 0; i--) {
            arr.push(i);
        }

        return arr;
    }

    function handleStartSort() {
        setStartSort(!startSort);
    }

    function handleWorstCase() {
        let descendingArr = descendingArray(barCount);

        handleResetSort();

        setArray(descendingArr);
        setSortGen(insertionSort(descendingArr));
    }

    function handleResetSort() {
        let arr = randomArray(barCount);
        setArray(arr);
        setSortGen(insertionSort(arr));
        setStartSort(false);
        setActiveIndex(null);
        setScanGen(scanArray(barCount));
        setIsSorted(false);
        setComparisonCounter(0);
    }

    function handleChangeAlg(event: React.ChangeEvent<HTMLSelectElement>) {
        setAlgorithm(event.target.value);
        let arr = randomArray(barCount)
        setArray(arr);

        setSortGen(mergeSort(arr));

        handleResetSort();
        // setSortGen(merge sort...);
    }

    function handleIntervalChange(event: ChangeEvent<HTMLInputElement>) {
        setInterval(Number(event.target.value));
    }

    function handleBarCountChange(event: ChangeEvent<HTMLInputElement>) {
        setBarCount(Number(event.target.value));
        handleResetSort();
    }

    function* scanArray(n: number) {
        for (let i = 0; i < n; i++) {
            yield i;
        }
    }

    useEffect(() => {
        console.log(algorithm);
        console.log(startSort);
    }, [algorithm, startSort])




    // Define sort/scan generator functions

    const [scanGen, setScanGen] = useState(scanArray(barCount));

    const [sortGen, setSortGen] = useState(insertionSort(array));

    // Main useEffect for sorting the array, 
    // to change algorithms, change the sortGen useState variable.
    useEffect(() => {
        let timerId: number | undefined;
      
        if (startSort) {
            timerId = window.setInterval(() => {

                const result = sortGen.next();
                if (!result.done) {
                    console.log(result);
                    setArray(result.value.array);
                    setActiveIndex(result.value.index);

                    if (result.value.comparison) {
                        // function form of set State to use the most recent state
                        setComparisonCounter(prevCounter => prevCounter + 1);
                    }
                }
                else {           
                    setStartScan(true);         
                    window.clearInterval(timerId);
                }

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
    }, [startSort, interval]);


    // Scanner 

    useEffect(() => {
        let timerId: number | undefined;
        
        if (startScan) {
            timerId = window.setInterval(() => {
                const result = scanGen.next();
                if (!result.done) {
                    setActiveIndex(result.value);
                } else {
                    window.clearInterval(timerId);
                    setActiveIndex(null);
                    setStartScan(false);
                    setIsSorted(true);
                }
            }, interval);
        } else {
            if (timerId !== undefined) {
                window.clearInterval(timerId);
            }
        }
    
        return () => {
            if (timerId !== undefined) {
                window.clearInterval(timerId);
            }
        };
    }, [startScan, interval]);

    return (
        <div className="flex flex-col h-full w-full">
        
            <div className="flex flex-row items-end bg-jet h-[93%] w-full">


                {array.map((value, index) => (
                    <div
                        key={index}
                        className="grow"
                        style={{
                            height: `${(value / maxInt) * 100}%`,
                            borderRight: index < array.length - 1 ? '1px solid #343434' : 'none',
                            backgroundColor: isSorted ? '#62929E' : (index === activeIndex ? '#62929E' : '#FBFFFE'),
                        }}
                    />
                ))}



            </div>

            <div className="flex flex-row justify-evenly items-center bg-rblack h-[7%] pt-1">




                <Form.Select className="bg-jet w-44 h-full rounded-2xl text-center text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                             onChange={handleChangeAlg}
                >
                    <option value="Merge">Merge Sort</option>
                    <option value="Quick">Quick Sort</option>
                    <option value="Insertion">Insertion Sort</option>
                    <option value="Bubble">Bubble Sort</option>
                    <option value="Bogo">Bogo Sort</option>
                </Form.Select>

                

                <div className="flex flex-col text-munsell sort">
                    <Form.Label className="mb-2 -mt-2 font-bold text-md">
                        Bars : {barCount}
                    </Form.Label>
                    <Form.Range
                        className="slider"
                        min={10}
                        max={100}
                        value={barCount}
                        onChange={handleBarCountChange}
                    />
                </div>


                <div className="flex flex-col text-munsell sort">
                    <Form.Label className="mb-2 -mt-2 font-bold text-md">
                        Interval (ms): {interval}
                    </Form.Label>
                    <Form.Range
                        className="slider"
                        min={10}
                        max={500}
                        step={10}
                        value={interval}
                        onChange={handleIntervalChange}
                    />
                </div>


                <div className="flex flex-col text-munsell">
                    <Form.Label className="font-bold text-lg">
                        Comparisons: {comparisonCounter}
                    </Form.Label>
                </div>


                <Button 
                    className="bg-jet w-28 h-full rounded-2xl text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleWorstCase}

                >
                    Worst Case 
                </Button>


                <Button 
                    className="bg-jet w-28 h-full rounded-2xl text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleResetSort}

                >
                    Reset 
                </Button>



                <Button
                    className="bg-jet w-32 h-full rounded-2xl text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleStartSort}
                >
                    Start/Stop
                </Button>


            </div>

        </div>
    );
}