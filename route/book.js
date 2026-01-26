const express = require('express');
const data = require('../data/book.json');
const books = data.books;

const dataa  = require('../data/user.json')
const users = dataa.users;
const router = express.Router();

const {UserModel , BookModel} = require('../models/index');
const { getAllBooks, getAllBooksById, getIssuedBook, addNewBooks, updateBookById, deleteById } = require('../controllers/book-controller');

/**
 * route : /book
 * des : get all the book 
 * method : GET
 */

router.get('/' , getAllBooks)

/**
 * route : /book/:id
 * method : GET
 * desc  : Get a book by ID
 */

router.get('/:id', getAllBooksById)


/**
 * route: /book
 * method : post
 * des : Add a new book to the system
 */

router.post('/', addNewBooks )


/** 
 * route : /user/:id
 * method : PUT
 * des    : Update book by ID
 */

router.put('/:id',updateBookById)


/**
 * route : /book/:id
 * method : delete
 * des : Delating a book by their ID 
 */

router.delete('/:id' , deleteById )


/**
 * route: /book/issued/forUser
 * method :get 
 * des : Get all the isssued books
 */
router.get('/issued/forUser' , getIssuedBook )


module.exports = router;