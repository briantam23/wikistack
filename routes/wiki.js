const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const {Page, User} = require('../models');
//const {User} = require('../models')
const wikipage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async(req, res, next) => {
    try{
        const allPages = await Page.findAll();
        res.send(main(allPages));

    } catch(error) {next(error)}
});
router.post('/', async(req, res, next) => {
    try{
        /* const page = new Page({
            title: req.body.title,
            content: req.body.content
        });
        await page.save(); */

        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        });
        const page = await Page.create(req.body);
        page.setAuthor(user);
        console.log(page.dataValues);
        res.redirect(`/wiki/${page.slug}`);
    } catch(error) { next(error) }
});
router.get('/add', async(req, res, next) => {
    res.send(addPage());
});
router.get('/:slug', async(req, res, next) => {
    try {
        const pageSlug = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        const pageAuthor = await pageSlug.getAuthor();
        res.send(wikipage(pageSlug, pageAuthor));
    } catch(error) {next(error)}
});

module.exports = router;