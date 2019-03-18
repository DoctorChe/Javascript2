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
            let stats = JSON.parse(data);
            console.log(req);
            console.log(req.body);
            // console.log(req.body['product_name']);
            // let newEntry = JSON.stringify({action: action});
            let time = moment().format('dddd, MMMM DD YYYY, h:mm:ss');
            console.log(time);
            // let newEntry = new Entry(action);
            let newEntry = new Entry(action, 'продукт', time);
            // console.log(JSON.stringify(newEntry));
            stats.push(JSON.stringify(newEntry));
            // stats.push(newEntry);
            // console.log(stats);
            // console.log(data);
            // let newCart = JSON.stringify("new entry");
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