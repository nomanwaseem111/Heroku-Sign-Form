import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000


let userBase = [];

app.post('/signup', (req, res) => {

    let body = req.body;

    if (!body.firstname || !body.lastname || !body.email || !body.password) {

        res.status(400).send(`
         Required all Field, for example
         
         {
            firstname : "noman",
            lastname : "ahmed",
            email : "noman@abc.com",
            password : "1234",
         }
         `)
        return;
    }

    let isFound = false;

    for (let i = 0; i < userBase.length; i++) {
        if (userBase[i].email === body.email.toLowerCase()) {
            isFound = true;
            break;
        }
    }
    if (isFound) {
        res.status(400).send({ message: "This Email Id is Already Exist" });
    }


    let newUser = {
        userId: nanoid(),
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email.toLowerCase(),
        password: body.password,
    }

    userBase.push(newUser);

    res.status(201).send({ message: 'User is Created' })

})


app.post('/login', (req, res) => {

    let body = req.body;

    if (!body.email || !body.password) {

        res.status(400).send(`
         Required all Field, for example
         
         {
          
            email : "noman@abc.com",
            password : "1234",
         }
         `)
        return;
    }

    let isFound = false;

    for (let i = 0; i < userBase.length; i++) {

        if (userBase[i].email === body.email) {

            isFound = true;
            if (userBase[i].password === body.password) {


                res.status(200).send(
                    {

                        firstname: userBase[i].firstname,
                        lastname: userBase[i].lastname,
                        email: userBase[i].email,
                        message: "Login Successful"
                    })
                return

            } else {
                res.status(404).send({message : 'The email address you entered is\n\'t connected to an account. Create a new account.'})

            }
            return;

        }
    }


    if (!isFound) {
        res.status(401).send({ message: 'The email address or password you entered is\n\'t connected to an account. Find your account and log in.' });
        return;
    }



})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

