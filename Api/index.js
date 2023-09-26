const express  = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body } = require('express-validator');
const cookieParser = require('cookie-parser')
const download = require('image-downloader')
const multer = require('multer')
const fs = require('fs');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
    optionsSuccessStatus: 200,
}))  

app.use(cookieParser())

app.use('/uploads' , express.static(__dirname + '/uploads'))

const secretSalt = bcrypt.genSaltSync(10);
 
const jwtSecrectKey = '@@gauravBhagatTejasMrunal@@'

// connecting database  
   
const dbConnect = async (url) => {
    try{
        db = await mongoose.connect(url);
        console.log("Database Successfully Connected");
    }catch(e) {
        console.log(e.message);
    }
}

dbConnect(process.env.MONGO_URL);

// const url = process.env.MONGO_URL;


// mongoose.connect(url , {useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
//     console.log("DataBase connected Successfull") 
// }).catch( (e) => { 
//     console.log("Error is " , e);
// });

// console.log(process.env.MONGO_URL)
 
app.get('/test' , (req , res) => {
    console.log("Hello ! I am under water")
    res.json('test Ok'); 
} )

 
app.post('/register' , [ body('name' ,"Enter a Valid Name").isLength({ min: 3 }),
                            body('email' , "Enter a Valid E-mail").isEmail(),
                            body('password' , 'Password must be at least 5 characters').isLength({min:5}) 
] , async (req , res) => {
    
    try{ 
        const {name , email , password} = req.body;

        const newUser = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password , secretSalt)
        })

        console.log(newUser)

        res.json(newUser); 
    }catch(e){
        console.log("Error happened " , e);
        res.status(422).json(e);
    }
    
})


app.post('/login' , [ body('email' , "Enter a Valid E-mail").isEmail() ] , async (req , res) => {
    
    try{ 
        const { email , password } = req.body;

        const userPresent = await User.findOne({email});
         
        if(userPresent) {
            console.log("User finded");
            const passOk = bcrypt.compareSync(password , userPresent.password);
            if(passOk){

                jwt.sign({email : userPresent.email , 
                    id : userPresent._id
                } , jwtSecrectKey , {} , (err , token) => {
                    if(err){ 
                        throw err;
                    } 
                    const userLoggedIn = {
                        name : userPresent.name,
                        email : userPresent.email,
                        _id : userPresent._id
                    }
                    res.cookie('token' , token).json(userLoggedIn);
                    console.log(userLoggedIn)
                })
          
                // res.json("User Logined")
            }else{
                res.status(422).json("wrong password entered")
            }  
        }else{
            console.log("User Not found");
            res.status(422).json("User Not found ")
        }
         
    }catch(e){
        console.log("Error happened " , e);
        res.status(422).json(e);
    }
    
})


app.get('/profile' , (req , res) => {

    const {token} = req.cookies;
    // console.log(token)
    if(token) {      
        jwt.verify(token , jwtSecrectKey , {} , async (err , tokenData) => {
            if(err) throw err;
            
            // we are getting user details after login and they are persisting as cookie is storing them
            const {name , email , _id} = await User.findById(tokenData.id)

            res.json({name , email , _id});
        });
    }else{
        res.json(null); 
    }
    
    // res.json(token)
}) 
 

app.post('/logout' , (req , res) => {

    // just reset the cookie
    res.cookie('token' , '').json(true);

})
 
// uploads image

app.post('/upload-by-link' , async (req , res) => {
    
    try{

        const {link} = req.body;

        const newName = 'photo' + Date.now() + '.jpg';
        await download.image({
            url : link,
            // __dirname: 'C:\\Users\\Shree\\Documents\\Web development course\\Final Projects Full Stack\\Airbnb\\Api'
            dest : __dirname + '/uploads/' + newName
        })
 
        res.json(newName);

    }catch(e) {   
        res.status(422).json( {"Error while uploading image " : e.message });
    }
})


// middleware for photo
const photosMiddleware = multer({dest : 'uploads/'});

app.post('/upload' , photosMiddleware.array('photos' , 100) , (req , res) => {

    // console.log(req.files)

    const uploadedFiles = [];

    for(let i=0 ; i<req.files.length ; i++) {
        const fileInfo = req.files[i];
        const {path , originalname} = fileInfo;

        const parts= originalname.split('.');
        const extension = parts[parts.length - 1];

        const newPath = path + '.' + extension;
        fs.renameSync(path , newPath);

        uploadedFiles.push(newPath.replace('uploads\\' , ''));

    }

    res.json(uploadedFiles); 
 
})

   
app.post('/places' , async (req , res) => {

    const {token} = req.cookies;

    const {title , address , addedPhotos ,
        description , perks , extraInfo ,
        checkIn , checkOut , maxGuests , price
    } = req.body;
 
    jwt.verify(token , jwtSecrectKey , {} , async (err , tokenData) => {
        if(err) throw err;
  
        const placeAdded = await Place.create({

            owner : tokenData.id,
            title , 
            address , 
            photos:addedPhotos ,
            description , 
            perks , 
            extraInfo ,
            checkIn , 
            checkOut , 
            maxGuests ,
            price 
        })  
         
        res.json(placeAdded);
    });
 
})  


app.get('/userPlaces' , async (req , res) => {
    const {token} = req.cookies;

    jwt.verify(token , jwtSecrectKey , {} , async (err , tokenData) => {

        const {id} = tokenData;

        res.json(await Place.find({owner : id}))

    });

});

 
app.get('/places/:id' , async (req , res) => {

    const {id} = req.params;

    res.json(await Place.findById(id));

}); 


app.put('/places' , async (req , res) => {

    const {token} = req.cookies;

    const {id , title , address , addedPhotos ,
        description , perks , extraInfo ,
        checkIn , checkOut , maxGuests , 
        price 
    } = req.body;  
  
  
    jwt.verify(token , jwtSecrectKey , {} , async (err , tokenData) => {

        if(err) throw err;

        const placeAdded = await Place.findById(id); 

        // placeAdded.owner gives object id and tokenData.id is string , comparision can't happen .
        // Therefore converting object id to string

        if(tokenData.id === placeAdded.owner.toString() ){
            // we can update          

            placeAdded.set({

                title , 
                address , 
                photos:addedPhotos ,
                description , 
                perks , 
                extraInfo ,
                checkIn , 
                checkOut , 
                maxGuests ,
                price
            })
            await  placeAdded.save()
            res.json('ok');
        }
    }); 
    
})     
 
// getting all the places for index page

app.get('/places' , async (req , res) => {

    res.json(await Place.find());
 
})

app.post('/bookplace' , async  (req , res) => {

        try{

            const {token} = req.cookies;

            if(token){

                jwt.verify(token , jwtSecrectKey , {} , async (err , tokendata) => {

                    if(!tokendata || err) {
                    throw err;
                    }
  
                    const {
                    place,
                    checkIn,
                    checkOut,
                    nameOfUser,
                    numGuests,
                    phone,
                    price,
                    } = req.body;
    
                    const doc = await Booking.create({
                    place,
                    user : tokendata.id,
                    checkIn,
                    checkOut,
                    nameOfUser,
                    numGuests,
                    phone,
                    price,
                    });
 
                    // console.log(doc.place);
                    res.json(doc);

                }) 
            }
            else {
                res.status(401).json("Login or register");
            }

            

        }catch(e) {
            throw e;
        }  
            
})


// to grab all the booking of any user

app.get('/bookings' , (req , res) => {


    const {token} = req.cookies;

    jwt.verify(token , jwtSecrectKey , {} , async (err , tokendata) => {

        if(err) throw err;

        res.json(
          await Booking.find({ user: tokendata.id }).populate("place")
        );

    })



})
        

  
app.listen(4100);    