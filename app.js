const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/contactdata")
.then(()=>{
    console.log('Database connection done')
}).catch(()=>{
    console.log('Failed')
})





const port = 80;

//Define Mongoose Schema
const  ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenumber: String,
    gender: String,
    adress: String
});

const Contact = mongoose.model('Contact', ContactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})


app.post('/contact', async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.name ||
        !body.email ||
        !body.phonenumber ||
        !body.gender||
        !body.adress
    ) {
        return res.status(400).json({ msg: 'All fields are req...' })
    }
    const result = await Contact.create({
        name: body.name,
        email: body.email,
        phonenumber: body.phonenumber,
        gender: body.gender,
        adress: body.adress
    });
   
    return res.status(201).json({ msg: 'Success' })
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});