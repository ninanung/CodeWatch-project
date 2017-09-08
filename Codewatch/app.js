var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var app = express();
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var http = require("http").Server(app);
var io = require("socket.io")(http);

var setUpPassport = require("./setuppassport");
var routes = require("./routes");

mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(msg);
        var fullMsg = msg[1] + " : " + msg[0];
        io.emit('chat message', fullMsg);
    });
    socket.on('code', function (code) {
        io.emit('code', code);
    });
});

http.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});