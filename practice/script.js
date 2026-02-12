// call method

// let name = {
//     firstName : "Manish",
//     lastName : "Makode",
// }

// let printFullName =  function(town,state){
//     console.log(`first name : ${this.firstName} and last name : ${this.lastName}, town : ${town}, state : "${state}`);
// }

// printFullName.call(name,"betul","uttarakhand");

// apply method
// printFullName.apply(name,["betul","chhatisgarh"])


// <<<<<<<<<<< call and apply method get invoked immidiately >>>>>>>>>>>>>>


// let printName = printFullName.bind(name);
// printName("bhopal","karnatak");

// let printName = printFullName.bind(name,"bhopal");
// printName("karnatak");

// let printName = printFullName.bind(name,"bhopal","karnatak");
// printName();

// <<<<<<<<<<< bind method creates a copy of original method and takes a object as first argument >>>>>>>>>>>>>


// const greet = (name) => {
//     console.log("hello " + name);
// }
// function start(main,end) {
//     setTimeout(() => {
//         console.log("start");
//         main(end);
//     }, 1000);
// }

// const main = (end) => {
//     setTimeout(() => {
//         greet("manish")
//         end();
//     }, 3000);
// }


// function end() {
//     setTimeout(()=>{
//         console.log("end");
//     },1000)
// }

// start(main,end);

// <<<<<<<<<<<<<<<<<<< promises >>>>>>>>>>>>>>>>>>>>>>>>>

// console.log("start");

// const myPromise = new Promise((resolve,reject)=>{
//     const state = false;
//     setTimeout(()=>{
//         if(state){
//             resolve("promise resolved");
//         }else{
//             reject("promise rejected");
//         }
//     },5000)
// })

// myPromise.then((data)=>{
//     console.log("Promise resolved with data "+data);
//     console.log("end");
// }).catch((error)=>{
//     console.log("got error : "+error);
//     console.log("end");
// })

// <<<<<<<<<<<<<< async await >>>>>>>>>>>>>

// function fetchAPI(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log("Data Fetching");
//             resolve({name:"manish",age:13});
//         },2000);
//     })
// }

// const getData = async ()=>{
//     const response = await fetchAPI();
//     return response;
// }

// const response = getData();

// response.then((data)=>{
//     console.log("recieved data : "+ data.name);
// }).catch((error)=>{
//     console.log("error occured "+ error)
// });


function User(name,age){
    this.name = name;
    this.age = age;
}
const grades = {
    status:"pending"
}
User.prototype.greet = function(){
    console.log(`welcome ${this.name}`);
}
const obj = new User("manish",20);

obj.greet();
obj.__proto__ = grades;
console.log(obj.status);



// <<<<<<<<<<< 02/02/2026    >>>>>>>>>>>>>>>>>>>>>


function firstPromise(){
    return fetch();
}

function secondPromise(){
    return fetch();
}

function thirdPromise(){
    return fetch();
}

function main(){
    return Promise.all(firstPromise(),secondPromise(),thirdPromise());
}

const finalResult = main();

finalResult.then().catch();

