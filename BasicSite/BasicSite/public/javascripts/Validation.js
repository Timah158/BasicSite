'use strict';
var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function Validate(ValidVarChar, ValidChar, OnlyNum, ValidEmail,) {

    function ValidVarChar() {
        const FilterNum = /[^A-Z, a-z, 0-9]/g;
        var Filter = ValidVarChar.replace(FilterNum, "");
    };

    function ValidChar() {
        const RejectedCharacters = /[^A-Z, a-z]/g;
        var ValidChar = ValidChar.replace(RejectedCharacters, "");
    };

    function OnlyNum() {
        const NonNum = /[^0-9]/g;
        var ValidNum = OnlyNum.replace(NonNum, "");
    };

    function ValidEmail() {
        const EmailChar = /[^A-Z, a-z, 0-9,.,@]/g;
        var ValidEmail = ValidEmail.replace(EmailChar, "");
    };
};
    function ValidPass() {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(Password, salt, function (err, hash) {
            });
        });

    };
