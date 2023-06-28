import React, { useState } from "react";
import { Document, Page } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";


export default function ResumeViewer({ docScale }: {docScale: number}) {
    const [numPages, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSucces({ numPages }: {numPages: number}) {
        setNumPages(numPages);
    }

    return (
        <div className="">
            <Document
                file="/documents/Schuh_Colin_Resume.pdf"
                onLoadSuccess={onDocumentLoadSucces}
            >
                <Page pageNumber={1} scale={docScale} renderTextLayer={false} />
            </Document>
            <p> Page 1 of {numPages}.</p>
        </div>
    );
}

