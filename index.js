import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname,  join } from 'path';
import 'dotenv/config';
import { getSign, getZodiac } from 'horoscope';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    console.log(req.body);

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let dob = req.body.dob;

    let userDOB = dob.split('-');

    console.log(userDOB);
    let userHoroscope = getSign({month:Number(userDOB[1]), day:Number(userDOB[2])});
    let userZodiac = getZodiac(Number(userDOB[0]));

    const response = {
        message: `Thank you ${firstName} ${lastName}! Your date of birth is ${dob}. Submission Sucessfull`,
        horoscope: `Given your date of birth, your horoscope is ${userHoroscope} while your Zodiac sign is ${userZodiac}`,
        sign: userHoroscope
    }
    res.json(response)

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})