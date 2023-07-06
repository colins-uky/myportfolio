import { ChangeEvent, useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";






////////////////// SORTING FUNCTIONS HERE //////////////////
// Define generator function to store the previous state

function* insertionSort(arr: number[]): Generator<{array: number[], index: null | number, comparison: boolean}, void, unknown> {
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


function* mergeSort(arr: number[], l:number = 0, r: number = arr.length - 1): Generator<{array: number[], index: null | number, comparison: boolean}, void, unknown> {
    
    // If left index is equal to or greater than right (i.e. length of array is 1)
    if (l >= r) {
        return;
    }

    // Get middle index as an integer
    const m = l + Math.floor((r-l) / 2);


    // Recurse with left subarray
    yield* mergeSort(arr, l, m);

    // Recurse with right subarray
    yield* mergeSort(arr, m + 1, r)

    // Call merge function on the way back up from recursion tree
    yield* merge(arr, l, m, r);


    // return final sorted array
    yield {array: [...arr], index: null, comparison: false}

}   


function* merge(arr: number[], l: number, m: number, r: number): Generator<{array: number[], index: null | number, comparison: boolean}, void, unknown> {
    
    // Define indeces
    let i = l, j = m + 1;

    const temp = [...arr];

    for (let k = l; k <= r; k++) {

        // If unsorted items left in left sub-array
        if (i > m) {
            arr[k] = temp[j++];
        }
            // If unsorted items left in right sub-array
        else if (j > r) {
            arr[k] = temp[i++];
        }

        // Choose the smallest of the left and right sub-arrays to go into arr
        // Increase i & j after indexing
        else if (temp[j] < temp[i]) {
            arr[k] = temp[j++];
        }
        else {
            arr[k] = temp[i++];
        }

        yield {array: [...arr], index: k, comparison: true}
    }
}


function* bubbleSort(arr: number[]): Generator<{array: number[], index: null | number, comparison: boolean}, void, unknown> {
    const n = arr.length;

    // Loop through all elements in arr
    for (let i = 0; i < n; i++) {
        // Nested for loop [O(n^2) oof!]

        for (let j = 0; j < (n-i-1); j++) {
            
            // iterate through arr from 0 to n-i-1 (bottom-up)
            // Swap places with element if greater than current element 
            if (arr[j] > arr[j+1]) {

                // swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;


            }

            yield {array: [...arr], index: j+1, comparison: true};
        }

        yield {array: [...arr], index: null, comparison: false};
    }

}


function* quickSort(arr: number[], l:number = 0, r:number = arr.length-1): Generator<{array: number[], index: null | number, comparison: boolean}, void, unknown> {

    // If left index is less than right index (i.e. sub array is atleast length 2)
    // sub array of length 1 is considered sorted
    if (l < r) {

        let partitionGen = partition(arr, l, r);
        let pIndex = l;
        let result;


        // Do while ensures the body of do is executed at least once
        do {
            result = partitionGen.next();


            if (!result.done) {
                yield result.value;
            }
            else {
                // Get last yield from partition() as partition index
                pIndex = result.value;
            }
        }
        while (!result.done)
        


        // Recurse down left of partition
        yield* quickSort(arr, l, pIndex - 1);

        // Recurse down right of partition
        yield* quickSort(arr, pIndex + 1, r);


    }
}


function* partition(arr: number[], l:number, r:number): Generator<{array: number[], index: null | number, comparison: boolean}, number, unknown> {

    // Choose right-most element as pivot
    const pivot = arr[r];

    // Define left iterable
    let i = l - 1;

    for (let j = l; j <= r-1; j++) {
        // If current element in sub array is less than pivot
        if (arr[j] < pivot) {
            
            i++;

            // Swap arr[j] with arr[i]
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;

            yield {array: [...arr], index: j, comparison: true};
        }

        
    }
    
    // Swap pivot element with greater element
    let temp = arr[i+1];
    arr[i+1] = arr[r];
    arr[r] = temp;

    yield {array: [...arr], index: i+1, comparison: false};

    // Return index where partition took place
    return i+1;
}


function* bogoSort(arr: number[]): Generator<{array: number[], index: null | number, comparison: boolean}, void, unknown> {
    const len = arr.length;
    let randArr = [...arr];
    let isSorted = false;

    while (!isSorted) {
        isSorted = true;
        for (let i = 1; i < len; i++) {
            if (randArr[i-1] > randArr[i]) {
                isSorted = false;
                randArr = randomArray(len);
                break;
            }
            else {
                yield {array: [...randArr], index: i-1, comparison: true};
            }
        }
    }

    yield {array: [...randArr], index: null, comparison: false};
    
}

////////////////// END SORTING FUNCTIONS ///////////////////


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



const NUM_ITEMS = 25;


export default function Sort() {

    const [barCount, setBarCount] = useState(50);
    const [array, setArray] = useState(randomArray(NUM_ITEMS));
    const [interval, setInterval] = useState(20);


    const [startSort, setStartSort] = useState(false);
    const [startScan, setStartScan] = useState(false);

    const [isSorted, setIsSorted] = useState(false);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    

    const [comparisonCounter, setComparisonCounter] = useState(0);

    const [algorithm, setAlgorithm] = useState('Merge');


   const buttonTitle = startSort ? 'Stop' : 'Start';



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

    const handleResetSort = useCallback(() => {
        let arr = randomArray(barCount);
        setArray(arr);
        setStartSort(false);
        setActiveIndex(null);
        setScanGen(scanArray(barCount));
        setIsSorted(false);
        setComparisonCounter(0);
    }, [barCount])

    function handleChangeAlg(event: React.ChangeEvent<HTMLSelectElement>) {
        setAlgorithm(event.target.value);

    }

    function handleIntervalChange(event: ChangeEvent<HTMLInputElement>) {
        setInterval(Number(event.target.value));
    }

    function handleBarCountChange(event: ChangeEvent<HTMLInputElement>) {
        setBarCount(Number(event.target.value));
    }

    function* scanArray(n: number) {
        for (let i = 0; i < n; i++) {
            yield i;
        }
    }









    useEffect(() => {
        switch (algorithm) {
            case 'Merge':
                setSortGen(mergeSort(array));
                break;
            case 'Insertion':
                setSortGen(insertionSort(array));
                break;
            case 'Bubble':
                setSortGen(bubbleSort(array));
                break;
            case 'Quick':
                setSortGen(quickSort(array));
                break;
            case 'Bogo':
                setSortGen(bogoSort(array));
                setInterval(100);
                break;
            default:
                setSortGen(mergeSort(array));
        }


    }, [array, algorithm]);

    useEffect(() => {
        handleResetSort();
    }, [barCount, algorithm, handleResetSort]);





    // Define sort/scan generator functions

    const [scanGen, setScanGen] = useState(scanArray(barCount));

    const [sortGen, setSortGen] = useState(insertionSort(array));

    // Main useEffect for rendering the array, 
    // to change algorithms, change the sortGen useState variable.
    useEffect(() => {
        let timerId: number | undefined;
        
        if (startSort) {
            timerId = window.setInterval(() => {

                const result = sortGen.next();
                if (!result.done) {
                    setArray(result.value.array);
                    setActiveIndex(result.value.index);

                    if (result.value.comparison) {
                        // function form of set State to use the most recent state
                        setComparisonCounter(prevCounter => prevCounter + 1);
                    }
                }
                else {
                    setStartSort(false);           
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
    }, [startScan, interval, scanGen]);


    return (
        <div className="flex flex-col h-full w-full">
        
            <div className="flex flex-row items-end bg-jet h-full w-full">


                {array.map((value, index) => (
                    <div
                        key={index}
                        className="grow"
                        style={{
                            height: `${(value / (barCount)) * 100}%`,
                            borderRight: index < array.length - 1 ? '1px solid #343434' : 'none',
                            backgroundColor: isSorted ? '#62929E' : (index === activeIndex ? '#62929E' : '#FBFFFE'),
                        }}
                    />
                ))}



            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">




                <Form.Select className="bg-jet w-16 sm:w-32 h-12 rounded-2xl text-center text-munsell text-sm lg:text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                             onChange={handleChangeAlg}
                >
                    <option value="Merge">Merge Sort</option>
                    <option value="Insertion">Insertion Sort</option>
                    <option value="Bubble">Bubble Sort</option>
                    <option value="Quick">Quick Sort</option>
                    <option value="Bogo">Bogo Sort</option>
                </Form.Select>

                

                <div className="flex flex-col text-munsell sort w-16 sm:w-36">
                    <Form.Label className="mb-2 -mt-2 font-bold text-xs sm:text-lg">
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


                <div className="flex flex-col text-munsell sort w-16 sm:w-36">
                    <Form.Label className="mb-2 -mt-2 font-bold text-xs sm:text-lg">
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
                    <Form.Label className="font-bold text-sm sm:text-lg">
                        Comparisons: {comparisonCounter}
                    </Form.Label>
                </div>


                <Button 
                    className="bg-jet w-16 sm:w-32 h-12 rounded-2xl text-munsell text-sm lg:text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleResetSort}

                >
                    Reset 
                </Button>



                <Button
                    className="bg-jet w-16 sm:w-32 h-12 rounded-2xl text-munsell text-sm lg:text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleStartSort}
                >
                    {buttonTitle}
                </Button>


            </div>

        </div>
    );
}