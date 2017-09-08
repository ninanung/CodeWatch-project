var express = require("express");
var passport = require("passport");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var User = require("./models/user");
var Board = require("./models/board");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
};

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    sess = req.session;
    sess.user = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/delete/:title", function (req, res) {
    var forDelete = req.params.title;
    Board.findOneAndRemove({ title: forDelete }, function (err, board) {
        if (err) {
            console.log("board delete err!");
            res.redirect("/board/" + req.param.title);
        }
        else res.redirect("/");
    });
});

router.get("/", function (req, res, next) {
    User.find()
        .sort({ createdAt: "descending" })
        .exec(function (err, users) {
            if (err) { return next(err); }

            var page = req.params.page;
            if (page == null) { page = 1; }
            var skipSize = (page - 1) * 10;
            var limitSize = 10;
            var pageNum = 1;
            Board.count({ deleted: false }, function (err, totalCount) {
                if (err) throw err;
                pageNum = Math.ceil(totalCount / limitSize);
                Board.find({ deleted: false })
                    .sort({ date: -1 })
                    .skip(skipSize)
                    .limit(limitSize)
                    .exec(function (err, Contents) {
                        if (err) throw err;
                        res.render("index", { users: users, contents: Contents, pagination: pageNum });
                    });
            });
        });
});

router.get("/index/:page", function (req, res, next) {
    User.find()
        .sort({ createdAt: "descending" })
        .exec(function (err, users) {
            if (err) { return next(err); }

            var page = req.params.page;
            if (page == null) { page = 1; }
            var skipSize = (page - 1) * 10;
            var limitSize = 10;
            var pageNum = 1;
            Board.count({ deleted: false }, function (err, totalCount) {
                if (err) throw err;
                pageNum = Math.ceil(totalCount / limitSize);
                Board.find({ deleted: false })
                    .sort({ date: -1 })
                    .skip(skipSize)
                    .limit(limitSize)
                    .exec(function (err, Contents) {
                        if (err) throw err;
                        res.render("index", { users: users, contents: Contents, pagination: pageNum });
                });
            });
        });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (err) console.log("session destroy err occured!");
        console.log("session destroyed!");
    });
    res.redirect("/");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.post("/signup", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.confirmpassword;
    if (password === confirmPassword) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return next(err); }
            if (user) {
                req.flash("error", "User already exists.");
                return res.redirect("/signup");
            }
            var newUser = new User({
                username: username,
                password: password
            });
            newUser.save(function (err) {
                if (err) return next(err);
                req.flash("info", "Sign up success! Please log in.");
                return res.redirect("/");
            });
        });
    }
    else {
        req.flash("error", "Password not confirmed.");
        res.redirect("/signup");
    }
});

router.get("/makeboard", function (req, res) {
    sess = req.session;
    res.render("makeboard", { writer: sess.user.name() });
});

router.post("/makeboard", function (req, res, next) {
    sess = req.session;
    var username = sess.user.name();
    if (req.body.password) {
        var password = req.body.password;
        var confirmPassword = req.body.confirmpassword
        if (password === confirmPassword) {
            console.log("password confirmed.");
            var boardTitle = req.body.title;
            Board.findOne({ title: boardTitle }, function (err, board) {
                if (err) return next(err);
                if (board) {
                    req.flash("error", "Same title already exist.")
                    res.redirect("/makeboard");
                }
            })
            var newBoard = new Board({
                writer: username,
                password: password,
                title: boardTitle
            });
            var url = "/board/" + boardTitle;
            newBoard.save(function (err) {
                if (err) {
                    req.flash("error", "Unknown error.")
                    res.redirect("/makeboard");
                }
                return res.redirect(url);
            });
        }
        else {
            req.flash("error", "Password not confirmed.");
            res.redirect("/makeboard");
        }
    }
    else {
        var boardTitle = req.body.title;
        Board.findOne({ title: boardTitle }, function (err, board) {
            if (err) return next(err);
            if (board) {
                req.flash("error", "Same title already exist.")
                res.redirect("/makeboard");
            }
        })
        var newBoard = new Board({
            writer: username,
            password: password,
            title: boardTitle
        });
        var url = "/board/" + boardTitle;
        newBoard.save(function (err) {
            if (err) {
                req.flash("error", "Unknown error.")
                res.redirect("/makeboard");
            }
            return res.redirect(url);
        });
    }
});

router.get("/board/:title", function (req, res, next) {
    Board.findOne({ title: req.params.title }, function (err, board) {
        if (err) return next(err);
        sess = req.session;
        return res.render("board", { board: board, visiter: sess.user.name() });
    })
});

router.post("/board/:title", function (req, res, next) {
    Board.findOne({ title: req.params.title }, function (err, board) {
        if (err) return next(err);
        if (!board) return next(404);
        if (req.body.unlock) {
            if (board.password !== req.body.unlock) {
                req.flash("error", "Wrong password.");
                res.redirect("/");
            }
            else res.redirect("/board/" + board.title);
        }
        else if (req.body.code) {
            board.code = req.body.code;
            board.explanation = req.body.explanation;
            board.saved = true;
            board.save(function (err) {
                if (err) return next(err);
                res.redirect("/board/" + board.title);
            });
        }
        else if (req.body.comment) {
            sess = req.session;
            var writer = sess.user.name();
            var comment = req.body.comment;
            board.comment.push({ name: writer, memo: comment });
            board.save(function (err) {
                if (err) return next(err);
                res.redirect("/board/" + board.title);
            });
        }
        else if (board.saved) {
            board.saved = false;
            board.save(function (err) {
                if (err) return next(err);
                res.redirect("/board/" + board.title);
            });
        }
    });
});

router.get("/search", function (req, res) {
    res.render("search", { contents: false });
});

router.post("/search", function (req, res) {
    var searchWord = req.body.search;
    var searchCondition = { $regex: searchWord };
    sess = req.session;
    Board.find({ deleted: false, $or: [{ title: searchCondition }, { code: searchCondition }, { writer: searchCondition }] }).sort({ date: -1 }).exec(function (err, Contents) {
        if (err) throw err;
        res.render("search", { visiter: sess.user.name(), contents: Contents });
    });
});

module.exports = router;