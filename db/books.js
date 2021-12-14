import { writeFile, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataUrl = join(__dirname, 'books.json')
const data = readFileSync(dataUrl);

const booksDb = JSON.parse(data);

export const writeDb = (data) => {
    writeFile(join(__dirname, 'books.json'), data, (err) => {
        if (err) throw err;
    });
}

export default booksDb;
export {
    dataUrl
}