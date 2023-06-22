
function route(app) {
    app.get('/', (req, res) => {
        res.render('home');
    });
    
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
    
    app.get('/search', (req, res) => {
        console.log(req.query.q);
        res.render('search');
    });
    
    app.post('/search', (req, res) => {
    
        console.log(req.body);
    
        res.send("");
    });
}

module.exports = route;
