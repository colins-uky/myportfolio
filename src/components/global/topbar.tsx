
import Link from "next/link";

export default function Topbar() {


    return (

        <nav className="bg-rblack w-screen font-Lato font-bold text-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-around h-16 text-bright">
                    <Link href="/" className="hover:text-cambridge hover:underline decoration-2 underline-offset-4">
                        Home
                    </Link>


                    <div className="relative group">

                        <Link href="/projects" className="hover:text-cambridge hover:underline decoration-2 underline-offset-4">
                            Projects
                        </Link>

                        <div className="absolute left-1/2 transform -translate-x-1/2 pt-8 hidden w-[20vw] h-[15vh] rounded-md bg-rblack text-white group-hover:block">
                            <div className="flex flex-col items-center space-y-2">
            
                                
                                <Link href="/projects/conways">
                                    Conways Game of Life
                                </Link>
                                
                                
                           </div>
                        </div>

                    </div>






                </div>
                
            </div>
        </nav>
    );
}