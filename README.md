# Library-Management-System

this is library mangement API backend for the management of user and the books.

# Routs and the Endpoints

## /user
GET : Get all the list of users in the system
POST : Create/Rgister a new user

## /user/{id}
GET : Get a user by their ID
put : Updating a user by their ID
DELETE : Delating a user by their ID {Check if the user still has an issued book} && {is there any fine/penalty to be collected}

## /user/subscription-details/{id}
Get : Get a user subscription details by thiere ID
    >> Date of subscription
    >> Valid till?
    >> Fine if any ?


 ## /books
 Get : Get all the books in the system
 POST : Add a new book to the system

 ## /book {id} 
 GET : Get a book by its id 
 PUT : Update a book by its ID
 DELETE : Delete a book by its ID

 ## /books/issued
 GET : Get all the isssued books

 ## /book/issued/wihtFine
 GET : Get all issued books with their fine amount

 ### Subscription Types
    >> Basic (3 monts)
    >>Standared (6 months)
    >>Premium (12 months)

    >> if a user missed the renewal date, then user should be collected with $100
    >> if a user misses his subscription, then user is expected to pay $100
    >> if a user misses both renewal & subscription, then the collected amount should be $200

 ## commands

 npm init
 npm i express
 npm i nodemon --save-dev   // this dependancy only use for devloper site not client side like express   

 npm run dev // to run

 npm i // to restore deleted packages