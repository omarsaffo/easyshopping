const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' data:;");
//   next();
// });

app.use('/', express.static(path.join(__dirname, 'home'), { index: 'home.html'})); //default inisializer

// Enable CORS for all routes
app.use(cors());
//
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON data in the request body
app.use(express.json());

app.use('/home', express.static(path.join(__dirname, 'home')));
// Serve static files from the 'shopper' folder
app.use('/shopper', express.static(path.join(__dirname, 'shopper')));
// Serve static files from the 'writer' folder
app.use('/writer', express.static(path.join(__dirname, 'writer')));

app.use('/contact-us', express.static(path.join(__dirname, 'contact-us')));
let receivedList = [];

// Endpoint to receive the list from the writer
app.post('/api/send-list', (req, res) => {
//   const { list } = req.body;
  console.log('Received List before:', receivedList);
  receivedList = req.body;
  console.log('Received List:', receivedList); 
  res.send('List received successfully.');
});

// Endpoint to get the received list for the shopper
app.get('/api/get-received-list', (req, res) => {
  console.log("list value :" , receivedList)
  res.json({ list: receivedList });
  console.log("list recieved :" , receivedList)
});

app.post('/api/send-email', (req, res) => {
    // Extract form data from the request
    const { name, email, message } = req.body;

    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'easyshopping.utiliser@gmail.com', // Replace with your Gmail email address
            pass: 'tpwh eqhc hrle rncn', // Replace with your Gmail password or generate an app password
        },
    });

    // Configure the email options
    const mailOptions = {
        from: 'easyshopping.utiliser@gmail.com',
        to: 'ghaith.saffo@gmail.com', // Replace with your actual email address
        subject: 'New Contact Us Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});