const {UserModel , BookModel} = require('../models/index');
const IssuedBook = require('../dtos/book-dto')

// get method
/**
 * route : /book
 * des : get all the book 
 * method : GET
 */
// router.get('', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })

exports.getAllBooks = async(req ,res) =>{
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success : false,
            message  : "there are not books availabel"
        });
    };
    
    res.status(200).json({
        success: true,
        data: books
    }); 
}

/**
 * route : /book/:id
 * method : GET
 * desc  : Get a book by ID
 */
// router.get('/:id', (req, res) => {
//     const id = Number(req.params.id);

//     const singleBook = books.find((each) => each.id === id);
//     if (!singleBook) {
//         return res.status(404).json({
//             success: false,
//             message: `user not found for id ${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: singleBook
//     })

// })

exports.getAllBooksById = async(req ,res) =>{
    const {id} = req.params;
    const books = await BookModel.findById(id);
 if (!books) {
        return res.status(404).json({
            success: false,
            message: `user not found for id ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: books
    })
}

/**
 * route: /book/issued/forUser
 * method :get 
 * des : Get all the isssued books
 */
// router.get('/issued/forUser' , (req , res)=>{
//     const userWithIssuedBook = users.filter((each)=>{
//         if(each.issuedBook){
//             return each;
//         }
//     })

//     const issuedBooks = [];

//     userWithIssuedBook.forEach(each => {
//        const book = books.find((book) => book.id === Number(each.issuedBook));
        
//        book.issuedBy = each.name;
//        book.issuedDate = each.issuedDate;
//        book.retuenDate = each.retuenDate;

//        issuedBooks.push(book);
//     });

//     if(!issuedBooks === 0){
//         return res.status(404).json({
//             success :false,
//             message : "no books issued you"
//         })
//     }

//     res.status(200).json({
//         success : true,
//         data : issuedBooks
//     })
// })

exports.getIssuedBook = async(req ,res) =>{
    const users = await UserModel.find({
        issuedBook : {$exists : true},
    }).populate("issuedBook");

    const issuedBook = users.map((each) =>{
        return new IssuedBook(each);
    })

    if(issuedBook.length === 0){
        return res.status(404).json({
            success : false,
message : "no books issued yet"
        })
    }

    
    res.status(200).json({
        success : true,
        data : issuedBooks
    })
}

/**
 * route: /book
 * method : post
 * des : Add a new book to the system
 */

// router.post('/', (req, res) => {
//     const { id, name, author, genre, price, publisher } = req.body;

//     if (!id || !name || !author || !genre || !price || !publisher) {
//         return res.status(404).json({
//             success: false,
//             message: "please provide all the required feilds"
//         })
//     }
//     const setBook = books.find((each) => each.id === id);
//     if (setBook) {
//         return res.status(409).json({
//             success: false,
//             message: `user id already exists ${id}`
//         })
//     }

//     books.push({ id, name, author, genre, price, publisher })

//     res.status(200).json({
//         success: true,
//         message: "added successfully!"
//     })

// })

exports.addNewBooks = async (req , res) =>{
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(404).json({
            success : false,
            message : "please provide the data to add a new book"
        })
    }
    await BookModel.create(data);

    const allBooks = await BookModel.find();
     res.status(200).json({
        success: true,
        data : allBooks,
        message: "added successfully!"
    })
}

/** 
 * route : /user/:id
 * method : PUT
 * des    : Update book by ID
 */

// router.put('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const data = req.body;

//     const setBook = books.find((each) => each.id === id);
//     if (!setBook) {
//         return res.status(404).json({
//             success: false,
//             message: `User not found at id ${id}`
//         })
//     }

//     dataBooks = books.map(each =>{
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data
//             }
//         }
//         return each;
//     })

//      res.status(200).json({
//         success: true,
//         data : dataBooks,
//         message: "books updated successfully"
//     })
// })

exports.updateBookById = async(req , res) =>{
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        res.status(404).json({
            success : false,
            message : "upadet not happened"
        })
    }
    const updateBook = await BookModel.findOneAndUpdate(
        {_id : id},
        data,
        {new : true}
    );

    if(!updateBook){
         res.status(404).json({
            success : false,
            message : "upadet not happened"
        })
    }
    res.status(200).json({
        success: true,
        data : updateBook,
        message: "update successfully!"
    })
}

/**
 * route : /book/:id
 * method : delete
 * des : Delating a book by their ID 
 */

// router.delete('/:id' , (req , res) =>{

//     const id = Number(req.params.id);
  
//     const setBook = books.find((each) => each.id === id);
//     if(!setBook){
//         return res.status(404).json({
//             success : true,
//             message : "this id is not available in data"
//         })
//     }

//     const findId = books.filter((each) => each.id != id);

//     res.status(200).json({
//         success :true,
//         data : findId,
//         message : "delete successfully"
//     })
// })

exports.deleteById = async (req , res) =>{
    const {id} = req.params;

    const deleteBook = await BookModel.findById(id);
    if(!deleteBook){
        res.status(404).json({
            success: false,
            message : "invalid"
        })
    }
  await BookModel.findByIdAndDelete(id);
  
   res.status(200).json({
        success :true,
        message : "delete successfully"
    })
}