import { useState } from "react";



export default function Clubs() {

    const [club, setClub] = useState<'KORA' | 'SMILE' | 'SnowCats' | 'Esports'>('KORA');

    return (
        <>
        <div className="flex flex-row grow w-full justify-evenly">
            <div className="flex w-full justify-center cursor-pointer hover:text-cambridge hover:scale-110 transition">
                <h1 className="text-2xl font-bold"> KORA </h1>
            </div>

            <div className="w-2 bg-bright" />

            <div className="flex w-full justify-center cursor-pointer hover:text-cambridge hover:scale-110 transition">
                <h1 className="text-2xl font-bold"> SMILE </h1>
            </div>

            <div className="w-2 bg-bright" />

            <div className="flex w-full justify-center cursor-pointer hover:text-cambridge hover:scale-110 transition">
                <h1 className="text-2xl font-bold"> SnowCats </h1>
            </div>

            <div className="w-2 bg-bright" />

            <div className="flex w-full justify-center cursor-pointer hover:text-cambridge hover:scale-110 transition">
                <h1 className="text-2xl font-bold"> Esports </h1>
            </div>
        </div>


        <div className="flex flex-col h-full w-full bg-rblack">
            p
        </div>
        </>
    )
}