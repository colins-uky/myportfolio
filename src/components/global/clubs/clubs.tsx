import { useEffect, useRef, useState } from "react";



export default function Clubs() {

    const clubNames = ['KORA', 'SMILE', 'SnowCats', 'Esports'];
    const [club, setClub] = useState<string>(clubNames[0]);
    const [interval, setIntervalState] = useState<number>(7000); // 7 second cycle
    const intervalRef = useRef<number>();


    const handleChangeClub = (newClub: string) => {
        setClub(newClub);
        setIntervalState(15000); // 15 seconds when user interacts
    };

    const cycleClubs = () => {
        setClub((prevClub) => {
            const currentIndex = clubNames.indexOf(prevClub);
            const nextIndex = (currentIndex + 1) % clubNames.length;
            return clubNames[nextIndex];
        })
    }

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
            
        intervalRef.current = window.setInterval(cycleClubs, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [interval]);


    return (
        <>
        <div className="flex flex-row grow w-full justify-evenly">
            <div className={`flex w-full justify-center rounded-tl-xl cursor-pointer hover:text-cambridge transition ${club === 'KORA' ? 'bg-rblack text-cambridge' : ''}`}
                onClick={() => handleChangeClub('KORA')}>
                <h1 className="text-2xl font-bold"> KORA </h1>
            </div>

            <div className="w-2 bg-bright" />

            <div className={`flex w-full justify-center cursor-pointer hover:text-cambridge transition ${club === 'SMILE' ? 'bg-rblack text-cambridge' : ''}`}
                onClick={() => handleChangeClub('SMILE')}>
                <h1 className="text-2xl font-bold"> SMILE </h1>
            </div>

            <div className="w-2 bg-bright" />

            <div className={`flex w-full justify-center cursor-pointer hover:text-cambridge transition ${club === 'SnowCats' ? 'bg-rblack text-cambridge' : ''}`}
                onClick={() => handleChangeClub('SnowCats')}>
                <h1 className="text-2xl font-bold"> SnowCats </h1>
            </div>

            <div className="w-2 bg-bright" />

            <div className={`flex w-full justify-center rounded-tr-xl cursor-pointer hover:text-cambridge transition ${club === 'Esports' ? 'bg-rblack text-cambridge' : ''}`}
                onClick={() => handleChangeClub('Esports')}>
                <h1 className="text-2xl font-bold"> Esports </h1>
            </div>
        </div>


        <div className="flex flex-col h-full w-full bg-rblack pt-4 rounded-b-xl">
            <p className="text-4xl"> club </p>
        </div>
        </>
    )
}