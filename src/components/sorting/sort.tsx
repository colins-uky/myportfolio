import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";


export default function Sort() {

    const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const [comparisonCounter, setComparisonCounter] = useState(0);

    const [algorithm, setAlgorithm] = useState('Merge');



    function handleStartSort() {

    }

    function handleResetSort() {

    }

    function handleChangeAlg(event: React.ChangeEvent<HTMLSelectElement>) {
        setAlgorithm(event.target.value);
    }

    useEffect(() => {
        console.log(algorithm);
    }, [algorithm])

    return (
        <div className="flex flex-col h-full w-full">
        
            <div className="flex flex-row bg-jet h-[93%] w-full">

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


                <Button 
                    className="bg-jet w-32 h-12 rounded-2xl text-munsell text-xl font-bold shadow-md hover:shadow-munsell transition hover:scale-110"
                    onClick={handleResetSort}

                >
                    Clear 
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