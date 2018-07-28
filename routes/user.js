const express = require('express');
const router = express.Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages')
const {Page, User} = require('../models')

router.get('/', async(req, res, next) => {
    try{
        const allUsers = await User.findAll();
        res.send(userList(allUsers));
    } catch(error){next(error)};
});
router.post('/', async(req, res, next) => {

});
router.get('/:id', async(req, res, next) => {
    try{
        const userId = await User.findById(req.params.id);
        const userPagesQuery = await Page.findAll({
            where: {
                authorId: req.params.id
            }
        })
        res.send(userPages(userId, userPagesQuery));
    } catch(error){next(error)}
});
router.put('/:id', async(req, res, next) => {

});
router.delete('/:id', async(req, res, next) => {

});


module.exports = router;