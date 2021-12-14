import { Router } from 'express';
import  booksDb from '../db/books.js'

const pageRoutes = Router();

pageRoutes.get('/', (req, res) => {
    res.render('index.ejs')
});

pageRoutes.get('/library', (req, res) => {
    res.render('library.ejs', { books: booksDb})
});

pageRoutes.get('/create', (req, res) => {
    res.render('create.ejs')
});

pageRoutes.get('/update', (req, res) => {
    res.render('update.ejs')
});


export default pageRoutes;