function createCounter(min, max) {
  let count = 0; 

  function increment() {
    if (count < max) {
      count++;
      return count;
    }
    return null; 
  }

  function decrement() {
    if (count > min) {
      count--;
      return count;
    }
    return null;
  }

  function reset() {
    count = 0;
    return count;
  }

  function getCount() {
    return count;
  }

  return { increment, decrement, reset, getCount };
}


const counterValue = document.getElementById("counter_value");
const incBtn = document.querySelector(".inc");
const decBtn = document.querySelector(".dec");
const resetBtn = document.querySelector(".res");



const counter = createCounter(0, 10); 


function updateUI(value) {
  if (value === null) {
    alert("Limit reached!");
  } else {
    counterValue.textContent = value;
  }
}


incBtn.addEventListener("click", () => {
  updateUI(counter.increment());
});

decBtn.addEventListener("click", () => {
  updateUI(counter.decrement());
});

resetBtn.addEventListener("click", () => {
  updateUI(counter.reset());
});


// function creatCounter(min,max){
//     let count = 0;

//     function increase(){
//         if(count<max){
//             count+= 1;
//             return count;
//         }
//         return null;
//     }
//     function decrease(min,max){
//         if(count > min){
//             count-=1;
//             return count;
//         }
//         return null;
//     }
//     function getCount(){
//         return count;
//     }
//     return { count, increase, decrease, getCount};
// }

// const incBtn = document.querySelector('.inc');
// const decBtn = document.querySelector('.dec');
// const resBtn = document.querySelector(".res");
// const count = document.querySelector(".counter_value");

// const counter = creatCounter(0,10);

// function updateUI(value){
//     if(value==null){
//         alert("Limit Reached")
//     }else{
//         count.innerText = value;
//     }
// }

// function increase(){
//     updateUI(counter.increase())
// }

// function decrease(){
//     updateUI(counter.decrease())
// }

// function reset(){
//     updateUI(counter.reset());
// }