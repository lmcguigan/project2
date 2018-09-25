var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
});
router.get("/search", function (req, res) {
    res.render("search");
});

router.get("/manage", function (req, res) {
    db.reservations.findAll({}).then(function(results){
        res.render("manage", {reservations: results});
    })
    
});
module.exports = router;