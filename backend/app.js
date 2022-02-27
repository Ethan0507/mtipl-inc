// Extrernal module imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const fileUpload = require('express-fileupload');

// Internal module imports
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');

// Start the express server
const app = express();

// Parse the json body
app.use(bodyParser.json());

// Serve static files
// app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    abortOnLimit: true
}));

// Set appropriate Headers on the response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

// Forward requests to appropriate routes
app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

// Handle invalid route
app.use((req, res, next) => {
    const error = new Error("Could not find this route!", 404);
    throw error;
}) 

// Handle errors
app.use((error, req, res, next) => {
    if (req.files) {
        fs.unlink(req.files.image.path, err => {
            if (err) console.log(err);
        })
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!' });
})

// Connect to DB
mongoose.connect(
        'mongodb+srv://mtipl-admin:QSfys9igCBViUbPh@cluster0.lnngt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ).then(() => {
        console.log('Database connected and backend-server is up and running!')
        app.listen(5000);
    }).catch((err) => {
        console.log(err);
    });