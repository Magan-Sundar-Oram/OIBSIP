const express = require('express');
const app = express();
const cors = require('cors')
const collection = require('./mongo');
const path = require('path');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://msoram7377:Oram7846md@cluster0.p1f46hy.mongodb.net/loginauth";


app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect(uri)
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));


async function hashPassword(password) {
    const res = await bcryptjs.hash(password, 10)
    return res;
}
async function compare(userPass, hashPass) {
    const res = await bcryptjs.compare(userPass, hashPass);
    return res;
}

app.get('/', (req, res) => {
    if (req.cookies.jwt) {
        const verify = jwt.verify(req.cookies.jwt, 'qwashywtyopkqucbxmjhdslkhzzilkndewjkcnauefkncsufwcknsowankweognd')
        res.render('home', { username: verify.username })
    } else {
        res.render('login')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup');
})
app.post('/signup', async (req, res) => {
    try {
        const uname = (req.body.username).trim();
        const upass = (req.body.password).trim();
        const check = await collection.findOne({ username: uname });
        if (check) {
            // return res.redirect('/login');
            res.send('<h1>user already exits</h1>');
        } else {
            const token = jwt.sign({ username: uname }, 'qwashywtyopkqucbxmjhdslkhzzilkndewjkcnauefkncsufwcknsowankweognd')

            res.cookie('jwt', token, {
                maxAge: 600000,
                httpOnly: true
            })

            const data = {
                username: uname,
                password: await hashPassword(upass),
                token: token
            }
            await collection.insertMany([data])
            return res.redirect('/login')
        }
    } catch (err) {
        return res.status(500).json({ status_code: 500, status: 'failure', message: err.stack })

    }
})

app.post('/login', async (req, res) => {
    try {
        const uname = (req.body.username).trim();
        const upass = (req.body.password).trim();
        const check = await collection.findOne({ username: uname });
        const passCheck = await compare(upass, check.password)
        if (check && passCheck) {
            res.cookie('jwt', check.token, {
                maxAge: 30000,
                httpOnly: true
            })
            res.render('home', { username: uname });
        } else {
            res.send('<h1>Wrong Credentials</h1>');
        }
    } catch (err) {
        res.send(err)
    }
})

app.listen(port, () => {
    console.log('Server started...')
})