'use strict';

console.log('Hola Mundo, desde NodeJS');
console.log(2 + 5);

// console.log(window);
console.log(global);

setInterval(() => {
  console.log('Hola desde NodeJS' + new Date());
}, 1000);