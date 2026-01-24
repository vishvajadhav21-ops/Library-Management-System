const express = require('express');
const data = require('../data/user.json')
const users = data.users;


const router = express.Router();

/**
 * route : /user
 * method : GET
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

/**
 * route : /user/:id
 * method : GET
 * desc  : Get a user by ID
 */
router.get('/:id', (req, res) => {

    const id = Number(req.params.id);

    const singleUser = users.find((each) => each.id === id);

    if (!singleUser) {
        return res.status(404).json({
            success: false,
            message: `user not found for id ${id}`
        });
    }

    res.status(200).json({
        success: true,
        data: singleUser
    });
});

/**
 * route: /user
 * method : post
 * des : Create/Rgister a new user
 */

router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

    if (!id || !name || !surname || !email || !subscriptionType || !subscriptionDate) {
        return res.status(401).json({
            success: false,
            message: "please provide all the required feilds"
        })
    }

    const setUser = users.find((each) => each.id === id);
    if (setUser) {
        return res.status(409).json({
            success: false,
            message: `user id already exists ${id}`
        })
    }

    users.push({ id, name, surname, email, subscriptionType, subscriptionDate })

    res.status(200).json({
        success: true,
        message: "added successfully!"
    })
})

/**
 * route : /user/:id
 * method : put
 * des  : Updating a user by their ID
 */
// not working on postman
/**
 * route : /user/:id
 * method : PUT
 * des    : Update user by ID
 */

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = req.body

    // check user exists
    const setUser = users.find(user => user.id === id)
    if (!setUser) {
        return res.status(404).json({
            success: false,
            message: `User not found at id ${id}`
        })
    }
    datausers = users.map(user => {
        if (user.id === id) {
            return {
                ...user,
                ...data
            }
        }
        return user
    })

    res.status(200).json({
        success: true,
        data: datausers,
        message: "User updated successfully"
    })
})

/**
 * route : /user/:id
 * method : delete
 * des : Delating a user by their ID 
 */

router.delete('/:id', (req, res) => {

    const id = Number(req.params.id);

    const setUser = users.find((each) => each.id === id);
    if (!setUser) {
        return res.status(404).json({
            success: true,
            message: "this id is not available in data"
        })
    }

    const findId = users.filter((each) => each.id != id);

    res.status(200).json({
        success: true,
        data: findId,
        message: "delete successfully"
    })
})
/**
 * route : /subscription-details/:id
 * method : get
 */

router.get('/subscription-details/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((each) => each.id === id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: `user not found for id ${id}`
        })
    }

    // extract the subscription details
    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        }
        else {
            date = new Date();
        }

        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if (user.subscriptionType === 'Basic') {
            date = date + 90;
        } else if (user.subscriptionType === 'Standard') {
            date = date + 180;
        }
        else if (user.subscriptionType === 'premium') {
            date = date + 365;
        }
        return date;
    }

    // subscription expiration calculation
    let returnDate = getDateInDays(user.retuenDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpireDate = subscriptionType(subscriptionDate)

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpireDate < currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        subscriptionDateLeft: subscriptionExpireDate - currentDate,
        returnDate: returnDate < currentDate ? "book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpireDate <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data: data
    })
})


module.exports = router;