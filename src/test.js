
const chalk=require('chalk');
const requirejs=require('requirejs');
const Stopwatch = require('statman-stopwatch');
//const stopwatch = new Stopwatch();


function add(n1, n2) { return n1 + n2; }
var ut = function (description,expected, actual, operator) {
    return new Promise((resolve, reject) => {
        if(operator=='=='){
            if (actual === expected) resolve({name:description,result:'passed'});
            else reject({name:description, result:'failed'});
        }
    });
};
function UnitTest(name,expected,actual,operator)
{
    const stopwatch = new Stopwatch(true);
    ut(name,expected,actual,operator).then(r=>{
        
        console.log(chalk.yellowBright(r.name+':'+r.result+"["+Math.round(stopwatch.read())+" ms]"));
    }).catch(e=>console.log(chalk.magenta(e.name+':'+e.result+"["+Math.round(stopwatch.read())+" ms]")));
};

UnitTest("add(1,3)==4",4,add(1,3),'==');
UnitTest("add(2,3)==6",6,add(2,3),'==');
UnitTest("add(-1,-1)==-2",-2,add(-1,-1),'==');


requirejs(['./math'],math=>{
   // console.log(math.add(2,3));
    UnitTest("add(-1,-1)==-2",-2,math.add(-1,-1),'==');
})
