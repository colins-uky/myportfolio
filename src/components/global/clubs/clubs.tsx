import { useEffect, useRef, useState } from "react";


import koraImg1 from '@/../public/images/KORA/kora-logo.png';
import koraImg2 from '@/../public/images/KORA/Electronics_Box_Alabama_Open.jpg';
import koraImg3 from '@/../public/images/KORA/Robotic_Mining_Competition_Opening_Ceremony.jpg';
import koraImg4 from '@/../public/images/KORA/Lightest_Bot_Award_Alabama.jpg';
import koraImg5 from '@/../public/images/KORA/Teensy_4.1.jpg';
import koraImg6 from '@/../public/images/KORA/Finished_Electronics_Box_Alabama.jpg';
import PhotoGallery from "./photoGallery";

import snowcatsImg1 from '@/../public/images/SnowCats/SnowCats_Logo.jpg';
import snowcatsImg2 from '@/../public/images/SnowCats/SnowCats_Lift.jpg';
import snowcatsImg3 from '@/../public/images/SnowCats/SnowCats_Top_Of_Lift.jpg';
import snowcatsImg4 from '@/../public/images/SnowCats/SnowCats_Sign.jpg';
import snowcatsImg5 from '@/../public/images/SnowCats/SnowCats_Mountain.jpg';
import snowcatsImg6 from '@/../public/images/SnowCats/SnowCats_On_Lift.jpg';

import esportsImg1 from "@/../public/images/Esports/UKY_Esports_Logo.jpg";
import esportsImg2 from "@/../public/images/Esports/Esports_Jersey_Front.jpg";
import esportsImg3 from "@/../public/images/Esports/UKY_Esports_Computers.jpg";
import esportsImg4 from "@/../public/images/Esports/Esports_Jersey_Back.jpg";
import esportsImg5 from "@/../public/images/Esports/UKY_Esports_Room.jpg";
import esportsImg6 from '@/../public/images/Esports/UKY_Esports_Cornerstone.jpg';

import smileImg1 from '@/../public/images/SMILE/Smile_Club_Logo.jpg'
import smileImg2 from '@/../public/images/SMILE/SmileClub_Hike.jpg';
import smileImg3 from '@/../public/images/SMILE/Smile_Club_Walk.jpg';
import smileImg4 from '@/../public/images/SMILE/Smile_Club_Hike.jpg';
import smileImg5 from '@/../public/images/SMILE/Smile_Club_Walk2.jpg';


const clubNames = ['KORA', 'SMILE', 'SnowCats', 'Esports'];

const koraImageArr = [koraImg1, koraImg2, koraImg3, koraImg4, koraImg5, koraImg6];

const snowCatsImageArr = [snowcatsImg1, snowcatsImg2, snowcatsImg3, snowcatsImg4, snowcatsImg5, snowcatsImg6];

const esportsImageArr = [esportsImg1, esportsImg2, esportsImg3, esportsImg4, esportsImg5, esportsImg6];

const smileImageArr = [smileImg1, smileImg2, smileImg3, smileImg4, smileImg5];

export default function Clubs() {

    const [club, setClub] = useState<string>(clubNames[0]);
    const [interval, setIntervalState] = useState<number>(15000); // 15 second cycle
    const intervalRef = useRef<number>();


    const handleChangeClub = (newClub: string) => {
        setClub(newClub);
    };

    

    useEffect(() => {
        const cycleClubs = () => {
            setClub((prevClub) => {
                const currentIndex = clubNames.indexOf(prevClub);
                const nextIndex = (currentIndex + 1) % clubNames.length;
                return clubNames[nextIndex];
            })
        }

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
        <div className="flex flex-row grow w-full justify-evenly h-10">
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


        <div className="flex flex-col h-full w-full min-h-[672px] bg-rblack p-6 pt-8 rounded-b-xl border-x-2 border-b-2">
            {
                club === 'KORA' && <PhotoGallery imgArr={koraImageArr} setInterval={setIntervalState} />
            }
            {
                club === 'SMILE' && <PhotoGallery imgArr={smileImageArr} setInterval={setIntervalState} />
            }
            {
                club === 'SnowCats' && <PhotoGallery imgArr={snowCatsImageArr} setInterval={setIntervalState} />
            }
            {
                club === 'Esports' && <PhotoGallery imgArr={esportsImageArr} setInterval={setIntervalState} />
            }
        </div>
        </>
    )
}