import { Router } from 'express';
import booksDb, { writeDb } from "../db/books.js";

const bookRoutes = Router();

bookRoutes.get('/', (req, res) => {
    res.render('index.ejs')
});

// Get all books
bookRoutes.get('/', (req, res) => {
    res.status(200).json(booksDb);
})

// Create a new book
bookRoutes.post('/', (req, res) => {
    const { title, category, description, author } = req.body;
    const data = {
        "Category": category,
        "Author": author,
        "Description": description
    }
    booksDb[title] = data;

    const booksData = JSON.stringify(booksDb);
    writeDb(booksData)
    
    res.status(200).json({ success: true });
})

// Update a book
bookRoutes.patch('/:title', (req, res) => {
    const { title } = req.params;
    const data = req.body;

    const oldData = booksDb[title];

    booksDb[title] = { ...oldData, ...data };
    
    const booksData = JSON.stringify(booksDb);
    writeDb(booksData)
    
    res.status(200).json({ message: 'Book updated successfully' });
})

// Delete a book
bookRoutes.delete('/:title', (req, res) => {
    const { title } = req.params;
    
    delete booksDb[title];

    const booksData = JSON.stringify(booksDb);
    writeDb(booksData)

    res.status(200).json({ message: 'Book deleted successfully' });
})


export default bookRoutes;