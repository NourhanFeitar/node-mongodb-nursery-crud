# Nodejs Nursery System

This project is developed in Javascript using Node.js to run a backend restful server that allows users to perform CRUD operations on models such as Teacher, Class and Child(ren).

It requires the user to be authenticated and the users' roles could restrict the ability to perform specific operations.

The application uses *JWT* to authenticate any requests to the server excluding the rest to login.

MongoDb is used to store all data including users.