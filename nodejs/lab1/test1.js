const fs = require('fs');
const path = require('path');
const arrow = require('apache-arrow');

const table = arrow.Table.from(fs.readFileSync(path.join(__dirname, '../../dados/housing.arrow')));

console.log(table.filter(arrow.predicate.col('CRIM').lt(0.3)).count());
        
console.log(table.count());
for (var i = 0; i < table.count(); i++){
    console.log(table.get(i).toString());
}