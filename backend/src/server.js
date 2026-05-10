const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/dbConnection.js');
const errorMiddleware = require('./middleware/errorHandler.js');

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error Handler
app.use(errorMiddleware);


connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})