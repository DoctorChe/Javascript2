const moment = require('moment');
const fs = require('fs');

const logger = (name, action) => {
    fs.readFile('dist/server/db/stats.json', 'utf-8', (err, data) => {
        if(err){
            console.log('Can`t read file')
        } else {
            const stat = JSON.parse(data);
            moment.locale('ru');
            stat.push({
                action: action,
                prod_name: name,
                time: moment().format('DD MMM YYYY, H:mm:ss'),
            });
            fs.writeFile('dist/server/db/stats.json', JSON.stringify(stat, null, 4), (err) => {
                if(err){
                    console.log('Can`t write file')
                }
            })
        }
    })
};

module.exports = logger;