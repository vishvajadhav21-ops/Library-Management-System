const express = require('express');

 // const data = require('./data/user.json');
 // const users = data.users;

const userRouter = require('./route/user');
const bookRouter = require('./route/book')

const app = express();
const Port = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "home page"
    });
});



app.use('/user' , userRouter);
app.use('/book' , bookRouter)

app.listen(Port, () => {
    console.log(`server runs on http://localhost:${Port}`);
});
