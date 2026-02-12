// "of" in loops is used for arrays and "in" for keys of object
const arr = [1,2,3,4,5];
let theme = "dark";
function arraySum(arr){
    let sum=0 ;
    for(let num of arr){
        sum+= num;
    }
    return sum;
}

console.log(arraySum(arr));


document.querySelector('#theme-btn').addEventListener('click',()=>{
    const body = document.querySelector('body')
    if(theme === "dark"){
            body.style.backgroundColor = 'white';
            theme = "light"
    }else{
            body.style.backgroundColor = 'rgb(66, 66, 66)';
            theme = "dark"
    }
    
})
