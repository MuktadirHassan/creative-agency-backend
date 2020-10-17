const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Firebase ADMIN
const admin = require('firebase-admin');
if(admin.apps.length === 0)
{
        admin.initializeApp({
            credential: admin.credential.cert({
                "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                "client_email": process.env.FIREBASE_CLIENT_EMAIL,
                "project_id": process.env.FIREBASE_PROJECT_ID
            }),
            databaseURL: process.env.FIRE_DB
        });

}


// Import Routes
const order = require('./routes/order');
const addService = require('./routes/addService');
const getServices = require('./routes/getServices');
const userSpecificService = require('./routes/userSpecificService');
const addReview = require('./routes/addReview');
const getReviews = require('./routes/getReviews');
const allOrders = require('./routes/allOrders');
const updateStatus = require('./routes/updateStatus');
const makeAdmin = require('./routes/makeAdmin');
const getAdmin = require('./routes/getAdmin');
const authAdmin = require('./routes/authAdmin');

// Connect to DB
require('dotenv').config();
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },
    () => console.log('DB connection established'),
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Route Middlewares
app.use('/',getServices);
app.use('/',getReviews)
app.use('/',getAdmin);
app.use('/customer', order);
app.use('/admin',authAdmin,addService);
app.use('/admin',authAdmin, allOrders);
app.use('/admin',authAdmin,updateStatus);
app.use('/admin',authAdmin,makeAdmin);
app.use('/userSpecificService',userSpecificService);
app.use('/addReview', addReview);






app.listen(process.env.PORT || 8080,() => console.log('Server listening on port 8080'));