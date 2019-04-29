const fs = require('fs');
const path = require('path');
const ApacheArrow = require('apache-arrow');

//https://archive.ics.uci.edu/ml/machine-learning-databases/housing/housing.data

/*
1. CRIM      per capita crime rate by town
2. ZN        proportion of residential land zoned for lots over  25,000 sq.ft.
3. INDUS     proportion of non-retail business acres per town
4. CHAS      Charles River dummy variable (= 1 if tract bounds river; 0 otherwise)
5. NOX       nitric oxides concentration (parts per 10 million)
6. RM        average number of rooms per dwelling
7. AGE       proportion of owner-occupied units built prior to 1940
8. DIS       weighted distances to five Boston employment centres
9. RAD       index of accessibility to radial highways
10. TAX      full-value property-tax rate per $10,000
11. PTRATIO  pupil-teacher ratio by town
12. B        1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town
13. LSTAT    % lower status of the population
14. MEDV     Median value of owner-occupied homes in $1000's
*/

//0.00632  18.00   2.310  0  0.5380  6.5750  65.20  4.0900   1  296.0  15.30 396.90   4.98  24.00

var colunas = Array(14).fill([]);
var linhas = fs.readFileSync(path.join(__dirname, '../../dados/housing.data')).toString().split("\n").forEach(function(linha){
    let valores = linha.split("  ");
    for (var j=0; j< valores.length; j++){
        colunas[j].push(valores[j]);
    }
});

var esquema = {};
esquema.CRIM = ApacheArrow.Float32Vector.from(colunas[0]);
esquema.ZN = ApacheArrow.Float32Vector.from(colunas[1]);
esquema.INDUS = ApacheArrow.Float32Vector.from(colunas[2]);
esquema.CHAS = ApacheArrow.Int32Vector.from(colunas[3]);
esquema.NOX = ApacheArrow.Float32Vector.from(colunas[4]);
esquema.RM = ApacheArrow.Float32Vector.from(colunas[5]);
esquema.AGE = ApacheArrow.Float32Vector.from(colunas[6]);
esquema.DIS = ApacheArrow.Float32Vector.from(colunas[7]);
esquema.RAD = ApacheArrow.Int32Vector.from(colunas[8]);

esquema.TAX = ApacheArrow.Float32Vector.from(colunas[9]);
esquema.PTRATIO = ApacheArrow.Float32Vector.from(colunas[10]);
esquema.B = ApacheArrow.Float32Vector.from(colunas[11]);
esquema.LSTAT = ApacheArrow.Float32Vector.from(colunas[12]);
esquema.MEDV = ApacheArrow.Float32Vector.from(colunas[13]);

const table = ApacheArrow.Table.new(esquema);

fs.writeFileSync(path.join(__dirname, '../../dados/housing.arrow'), table.serialize());

console.log("convertido " + table.count() + " linhas");