const equalBtn = document.querySelector('.equal');
const oprs = document.querySelectorAll('.opr');
const acBtn = document.querySelector('.ac');
const btn = document.querySelectorAll('.btn');
const display = document.querySelector('#display');
let num = "";
let opr = "";
let first = "";
let second = "";


function deleteValue(){
    num = num.slice(0,num.length-1);
    updateDisplay(num);
}


equalBtn.addEventListener("click",()=>{
    second = Number(display.value);
    calc(opr,first,second);
});

function handleOperation(e){
    first = Number(num);
    if(num != ""){
        num = "";
        opr = e.target.value;
        display.value = "";
        display.placeholder = "second num";
    }
}

oprs.forEach(op =>{
    op.addEventListener("click",handleOperation);
})

const allClear = (text)=>{
    display.value = "";
    display.placeholder = (typeof text === 'string') ? text : "first num"; 
    console.log("ac pressed ");
    num = "";
    first = "";
    second = "";
    opr = "";
};
acBtn.addEventListener("click",allClear);

function updateDisplay(value){
    display.value = value;
    num = value.toString(); // Allows result to be used for next calculation
}

// **************Event Listner Added on buttons**********
function handleClick(e){
    num = num.toString().concat(e.target.value); 
    display.value = num;
}
btn.forEach(btn => {
    btn.addEventListener("click",handleClick);
});
// *******************************************************


// ********** Reusable Calculating function **************
function calc(opr,first,second){
    if(opr==="/" && second === 0){
        allClear("invalid input"); 
        return; // Stop execution
    }
    let result = 0;
    switch(opr){
        case "+": 
            result = first+second;
            break;
        case "-":
            result = first-second;
            break;
        case "/":
            result = first/second;
            break;
        case "*":
            result = first*second;
            break;
        default:
            result = num;    
    }
    updateDisplay(result);
}
// *************************************************