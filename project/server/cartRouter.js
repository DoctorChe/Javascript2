const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');
const handlerstats = require('./handlerstats');

router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
    handlerstats(req, res, 'add', 'server/db/stats.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
    handlerstats(req, res, 'change', 'server/db/stats.json');
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
    handlerstats(req, res, 'delete', 'server/db/stats.json');
});

module.exports = router;