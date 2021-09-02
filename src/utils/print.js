import chalk from 'chalk';

const colors = [ 'green', 'blue', 'yellow','red'];
const print = {};

colors.forEach(color=>{
    print[color] = function(text, isConsole = true) {
         return isConsole ? console.log(chalk[color](text)) : chalk[color](text);
    };
});

export default print;