
import Link from "next/link";

export default function Topbar() {


    return (
        <nav className="bg-rblack w-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-around h-16 text-bright">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/projects">
                        Projects
                    </Link>
                   
                    
                   
                </div>
            </div>
        </nav>
    );
}