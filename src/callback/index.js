function sum(num1,num2) {
    return num1 + num2;    
}

function calc(num1,num2, callback) {
    return callback(num1,num2);
}

// funcion sum como tercer argumento, no es necesario el () porque no se esta invocando
console.log(calc(2,2,sum)); // asi se invoca la funcion callback

//-----

setTimeout(() => {
    console.log('Hola JavaScript');
}
, 5000);

function grettin(name) {
    console.log('Hola', name);
}

// funcion como argumento
setTimeout(grettin, 5000, 'Francisco');
















function execCallback(callback) {
    setTimeout(saludo, 2000, 'Francisco');
}
function saludo(name) {
    console.log('Hola', name);
}
execCallback(saludo);