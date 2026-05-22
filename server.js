require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/connect');
const app = express();
const bookClubRoutes = require('./routes/bookClubRoutes')
const membersRoutes = require('./routes/membersRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

//Get port from .env file
const port = process.env.PORT || 3000;

//MIDDLEWARE: MUST PUT THIS BEFORE ROUTES OR POST WILL NOT WORK
//Rather than using bodyParser, use express.json to do the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //tells Express to parse incoming form data so it can be accessed in req.body

//ROUTES
app.use('/bookClub', bookClubRoutes);
app.use('/members', membersRoutes);

//SWAGGER: API DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//ERRORS
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});


//CONNECT TO DB AND START SERVER
const startServer = async () => {
    try {
        //Connect to database
        await connectDB();
        //Start server on port listed in .env file
        app.listen(port, () => console.log(`Database listening and server running on port ${port}`));

    } catch (err) {
        console.error(err);
    }
}

startServer();