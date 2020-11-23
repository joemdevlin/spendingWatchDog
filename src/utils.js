let randomColor =  function(){
    return '#' + Math.floor(Math.random()*16777215).toString(16)
};

let moneyFormatter = function(num){
    return '$' + num.toLocaleString('us-EN', {maximumFractionDigits: 2})
};
module.exports = {randomColor, moneyFormatter};