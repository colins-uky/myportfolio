import { ReactEventHandler, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
    isLoading?: boolean;
    noBlur?: boolean;
}


export default function Modal({ isVisible, onClose, children, isLoading = false, noBlur = false }: ModalProps) {
    if ( !isVisible ) return null;



    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (target.id === 'wrapper') onClose();
    }
    return (
        <div className={`fixed inset-0 bg-rblack bg-opacity-25 ${noBlur ? "" : "backdrop-blur-sm"} flex justify-center items-center z-50`}
            onClick={handleClose}
            id="wrapper"
        >
            <div className="w-fit max-w-[800px] max-w flex flex-col overflow-auto">
                <button className="text-bright text-xl place-self-end"
                        onClick={() => onClose()}>
                    <FontAwesomeIcon icon={faXmark} className="w-8 h-8 hover:text-red"/>
                </button>
                <div className="bg-rblack p-2 rounded modal-content">
                    {isLoading && <p>Loading...</p>}
                    
                    {children}
                    
                </div>
            </div>
        </div>
    )
}