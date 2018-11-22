const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();

var User = require('../models/user');
var Mail = require('../models/mail');


router.post('/enviar', (req, res) => {
    let r = req.body;
    console.log(r);

    let promise = User.findOne({email: r.receptor}).exec();

    promise.then(user =>{
        if (!user){
            res.redirect('/error');
        }
        else{
            const idReceptor = user._id;
            r.emisor = req.user; //req.id_user; 
            console.log(r.emisor);

            r.receptor = [idReceptor];
            let newMail = new Mail(r);
            let promise = newMail.save();

            promise
                .then(mail => {
                    res.redirect('/enviado');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
});

router.get('/error', (req, res) => {
    res.render('error', {user: req.user});
});

router.get('/enviado', (req, res) =>{
    res.render('enviado', {user: req.user});
});

router.get('/recibidos', (req, res) =>{
    //let usuario = User.findOne({id: req.user._id});
    let mails = Mail.find({receptor: req.user})
        .then(recibidos =>{
            if (!recibidos){
                res.redirect('/error');
            }
            else{
                res.render('recibidos', {user: req.user, recibidos: recibidos});
                console.log(recibidos);
            }
        });
});

router.get('/enviados', (req, res) =>{
    let mails = Mail.find({emisor: req.user})
        .then(enviados =>{
            if (!enviados){
                res.redirect('/error');
            }
            else{
                res.render('enviados', {user: req.user, enviados: enviados});
                console.log(enviados);
            }
        });
});


module.exports = router;