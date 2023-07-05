import Topbar from "@/components/global/topbar";
import Link from "next/link";

import Button from "react-bootstrap/Button";





export default function Resume() {


    return (
        <>
        <div className="flex flex-col bg-jet h-screen w-full items-center">
            <Topbar />


            <div className="flex flex-col w-3/4 max-w-5xl justify-center mt-16 mb-4 text-bright">

                <div className="flex flex-row w-full justify-evenly mt-4 mb-16">
                    <Link href="/documents/Schuh_Colin_Resume.pdf" target="_blank" passHref>
                        <Button className="bg-button px-5 py-3 mb-4 rounded-2xl hover:bg-cambridge hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]" variant="primary"
                            >
                            <h1 className="text-lg"> View in Browser </h1>
                        </Button>
                    </Link>


                    <Button className="bg-button text-bright px-5 py-3 mb-4 rounded-2xl hover:bg-cambridge hover:drop-shadow-[0_0_10px_rgba(107,171,144,0.8)]" variant="primary"
                        href="/api/downloadResume">
                        <h1 className="text-lg"> Download Resum&eacute; </h1>
                    </Button>
                </div>
            </div>

            
        </div>
        
        
        
        </>
    )
}