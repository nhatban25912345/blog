class NewsController {
    // [GET] /news
    index(req, res) {
        res.render("news");

    }
}

module.exports = NewsController;

const newsController = require("./NewsController");