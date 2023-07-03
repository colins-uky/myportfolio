import Image from "next/image";
import { useState } from "react";
import Modal from "../modal";

interface PhotoGalleryProps {
    imgArr: any[];
    setInterval: React.Dispatch<React.SetStateAction<number>>;
}



export default function PhotoGallery({ imgArr, setInterval }: PhotoGalleryProps) {
    const [activeImage, setActiveImage] = useState('');
    const [isModalLoading, setIsModalLoading] = useState(true);

    // Modal variables
    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false);
        setInterval(15000);
        setIsModalLoading(true);
    } 



    const handleImageClick = (image: any) => {
        setActiveImage(image);
        setShow(true);
        setInterval(300000);
    }

    const handleImageLoad = () => {
        setIsModalLoading(false);
        console.log('Image Loaded');
    }

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
            {imgArr.map((image, index) => (
                <div key={index} className="overflow-hidden flex items-center">
                    <div onClick={() => handleImageClick(image)} className="cursor-pointer">
                        <Image src={image} alt={`Gallery image ${index + 1}`} width={500} height={300} objectFit="cover" />
                    </div>
                </div>
            ))}
          
            
        </div>


        <Modal isVisible={show} onClose={() => handleClose()} isLoading={isModalLoading} >
            <Image src={activeImage} alt="Image preview" onLoad={handleImageLoad}/>
        </Modal>
        </>
    );
}
