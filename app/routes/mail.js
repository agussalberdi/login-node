const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();

var User = require('../models/user');
var Mail = require('../models/mail');

router.post('/enviado', (req, res) => {
    let r = req.body;
    console.log(r);

    let promise = User.findOne({email: r.receptor}).exec();

    promise.then(user =>{
        if (!user){
            res.render('profile', {user: req.user, message: 'El destinatario no existe'});
        }
        else{
            const idReceptor = user._id;
            r.emisor = req.id_user;
            r.receptor = [idReceptor];
            let newMail = new Mail(r);
            let promise = newMail.save();

            promise
                .then(mail => {
                    res.render('enviado');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
});

router.get('/enviado', (req, res) =>{
    res.render('enviado');
});

module.exports = router;