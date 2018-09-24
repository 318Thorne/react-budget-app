// objext destructuring
// const person = {
//     name: 'william',
//     age: 24,
//     location: {
//         city: 'newcastle',
//         temp: 92
//     }
// };
// const {name = 'anon' , age} = person; // can have defaults;
// console.log(`${name} is ${age}`);

// const {city, temp: temperature} = person.location; //can rename, can get nested
// if (city && temperature){
//     console.log(`${temp} in ${city}`);
// }

// array destructuring

const address = ['1299 s juniper steet', 'philiy', 'pensyl', '19192'];

const [, city, state, zip] = address;

console.log(`you are in ${city} ${state}`);