import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

import bookRoutes from './routes/books.js'
import publicRoutes from './routes/public.js'
import pageRoutes from './routes/pages.js'


const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use('/books', bookRoutes);
app.use('/data', publicRoutes);
app.use('/', pageRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});