const fs = require('fs');
const ApacheArrow = require('apache-arrow');

const table = ApacheArrow.Table.from([fs.readFileSync('../../dados/housing.arrow')]);

console.log(table.count());
for (var i = 0; i < table.count(); i++){
    console.log(table.get(i).toString());
}