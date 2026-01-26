const express = require('express');
const data = require('../data/user.json');
const { getAllUser, getSingleUserById, PushUser, DeleteUserById, GetSubscriptionDetails, UpdateUserById } = require('../controllers/user-controller');

const users = data.users;


const router = express.Router();

/**
 * route : /user
 * method : GET
 */
router.get('/', getAllUser);

/**
 * route : /user/:id
 * method : GET
 * desc  : Get a user by ID
 */
router.get('/:id',getSingleUserById )

/**
 * route: /user
 * method : post
 * des : Create/Rgister a new user
 */

router.post('/', PushUser )


/**
 * route : /user/:id
 * method : PUT
 * des    : Update user by ID
 */

router.put('/:id',UpdateUserById)

/**
 * route : /user/:id
 * method : delete
 * des : Delating a user by their ID 
 */

router.delete('/:id', DeleteUserById)
/**
 * route : /subscription-details/:id
 * method : get
 */

router.get('/subscription-details/:id',GetSubscriptionDetails )


module.exports = router;