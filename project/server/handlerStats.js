const fs = require('fs');
const moment = require('moment');

function Entry(action="", product="", time="") {
    this.action = action;
    this.product = product;
    this.time = time;
}

let handlerstats = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let product_name = "product_name";
            fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                } else {
                    product_name = JSON.parse(data).find(el => el.id_product === +req.params.id).product_name;
                }
            });
            // console.log(product_name);
            let stats = JSON.parse(data);
            let time = moment().format('dddd, MMMM DD YYYY, h:mm:ss');
            let newEntry = new Entry(action, product_name, time);
            stats.push(JSON.stringify(newEntry));
            fs.writeFile(file, JSON.stringify(stats, null, 4), (err) => {
                // if(err){
                //     res.sendStatus(404, JSON.stringify({result:0, text: err}));
                // } else {
                //     res.send(JSON.stringify({result: 1}))
                // }
            })
        }
    })
};

module.exports = handlerstats;