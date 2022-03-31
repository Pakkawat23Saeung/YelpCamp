const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            //Your User ID
            author : '62440da03752f709e6ed0122',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum consequuntur molestiae sequi facere inventore dolores dicta rem vero eligendi molestias veritatis tempora error maiores, voluptatum nesciunt ex enim hic. Fugit.',
            price,
            geometry : {
              type : "Point",
              coordinates:[
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images :   [
              {
                url: 'https://res.cloudinary.com/drvosdfju/image/upload/v1648732065/YelpCamp/qvet56nv5ektyvnuo1ns.jpg',
                filename: 'YelpCamp/qvet56nv5ektyvnuo1ns'  
              },
              {
                url: 'https://res.cloudinary.com/drvosdfju/image/upload/v1648732065/YelpCamp/ywm7l6ictrreavmyqekh.jpg',
                filename: 'YelpCamp/ywm7l6ictrreavmyqekh'  
              },
              {
                url: 'https://res.cloudinary.com/drvosdfju/image/upload/v1648732065/YelpCamp/zcupube6r15hdc30ogeu.jpg',
                filename: 'YelpCamp/zcupube6r15hdc30ogeu'
              }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})