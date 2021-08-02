const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection successful'));

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'There must be some name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'There must be some price']
    }
})

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Mountain Hiker',
    rating: 4.8,
    price: 800
});

testTour.save();

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Running Express server on port ${port}`);
});
