const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodelogin',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err));