import { join } from 'path';
import { promises as fsPromises } from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,
    res: NextApiResponse
) {
    const filePath = join(process.cwd(), 'public/documents', 'Schuh_Colin_Resume.pdf');
    const fileContent = await fsPromises.readFile(filePath);
    
    res.setHeader('Content-Disposition', 'attachment; filename=Schuh_Colin_Resume.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    res.send(fileContent);
}