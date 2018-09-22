



//  THIS IS THE CODE IMPORTED FROM THE PREVIOUS FILE NAMED CONTROLLERS.JS





var express = require("express");
var router = express.Router();
var passport = require('passport-local');
var session = require('express-session');


var db = require("../models");

//Create all routes

router.get("/api/sitters", function (req, res) {
    console.log(req.body.location);
    db.sitters.findAll({
        where: {
          location: req.body.location
        }
      }).then(function (results) {
        var handlebarsObject = {
            sitters: data
        };
        res.render("search", handlebarsObject)
        console.log(results);
        return res.json(results);
    });
});

router.post("/api/reservations", function (req, res) {
    db.reservations.create([
        "date", "customer_id", "sitter_id", "service"
    ], [
            req.body.date, req.body.customer_id, req.body.sitter_id, req.body.service
        ],
        function () {
            res.redirect("/manage");
        }
    )
});
module.exports = router;
