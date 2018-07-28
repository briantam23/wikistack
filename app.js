const { db } = require('./models');
const express = require("express");
const morgan = require('morgan');
const layout = require("./views/layout");
const models = require('./models')
const app = express();
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use('/wiki', wikiRouter); //or, in one line: app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));
app.use('/wiki/:slug', require('./views/wikipage'))

app.get("/", (req, res, next) => {
    res.send(layout(""));
})

db.authenticate().
then(() => {
    console.log('connected to the database');
})

const PORT = 3000;

const init = async () => {
    await models.User.sync({force: true})
    await models.Page.sync({force: true})
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`)
    });
}

init();