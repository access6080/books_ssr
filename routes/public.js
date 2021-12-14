import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { dataUrl } from '../db/books.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const publicRoutes = Router();

publicRoutes.get('/', (req, res) => {
    res.sendFile(dataUrl)
});

export default publicRoutes;