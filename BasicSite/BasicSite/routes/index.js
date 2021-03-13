'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'T346tf478wyo9',
    database: 'Basic_Site'
})

connection.connect(function (err) {
    if (err) {
        console.log("SQL CONNECTION FAILED!" + err.stack);
        return;
    }
    else {
        console.log("SQL connected successfuly...");
        return;
    }

});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('Index', { title: 'Basic Site' });
});

router.post('/Login', function (req, res) {

    var UserName = req.param('EUser');
    var Password = req.param('EPassword');
    console.log('Attempted sign in as ' + UserName);

    var RejectedCharacters = /[^A-Z, a-z, 0-9]/g;
    var Filter = UserName.replace(RejectedCharacters, "");

    if (UserName != Filter) {
            console.log('Cannot contain special characters!');
    }

    var GetUser = 'SELECT Username AS ID, Password FROM basic_site.users WHERE Username = ' + mysql.escape(Filter);
    connection.query(GetUser, function (err, result) {
        try {
            var id = result[0].ID;
            var Pass = result[0].Password

            if (id == UserName) {
                bcrypt.compare(Password, Pass, function (err, result) {
                    if (result) {
                        console.log("Signed in successfully");
                        res.cookie(UserName, 'SignedIn');
                        res.send('Cookie sent');
                    }
                    else {
                        console.log("Invalid password!");
                        res.redirect('/');
                    }
                });
            }
            else {
                console.log('Invalid Username');
                res.redirect('/');
            };
        }

        catch (err) {
            console.log(err.stack);
            res.redirect('/');
        };
    });
});
    
router.post('/Register', function (req, res) {

    var FirstName = req.param('FName');
    var LastName = req.param('LName');
    var Email = req.param('Email');
    var NewUserName = req.param('UserName');
    var NewPassword = req.param('Password');
    var ConfirmPassword = req.param('CPassword');

    if (NewPassword.length < 8 || NewPassword.length > 16) {
        console.log('Password must be 8 - 16 characters');
        res.redirect('/');
    };

    var SpecialChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    var Nums = /[0-9]+/g;
    var Upper = /[A-Z, a-z]+/g;

    //var val = NewPassword.search(Nums)

    if (ConfirmPassword != NewPassword) {
        console.log('Your passwords do not match');
        res.redirect('/');
    };

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(ValidPass, saltRounds, function (err, hash) {

            console.log('Attempted Registration as First Name: ' + FirstName + ' Last Name: '
                + LastName + ' Email: ' + Email + ' Username: ' + NewUserName + ' Password: '
                + NewPassword + ' Confirm Password: ' + ConfirmPassword);

            var CreateUser = "INSERT INTO users (UserEmail, FirstName, LastName, Password, Username) VALUES ?";
            var values = [[Email, FirstName, LastName, hash, NewUserName]];

            connection.query(CreateUser, [values], function (err, result) {

                if (err) {
                    console.log(err);
                }

                else {
                    console.log(result);
                    res.send('Created Successfuly');
                }
            });
        });
    });
});

module.exports = router;