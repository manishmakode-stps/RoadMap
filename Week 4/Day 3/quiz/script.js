import quizData from "./data.js";

let currIndex = 0;
let score = 0;
const options = document.querySelectorAll('.option');
const progress = document.querySelector('.progress');
const reset = document.querySelector('.reset');
const restart = document.querySelector('.restart');
const len = quizData.length;
progress.innerText = `Progress ${currIndex+1} / ${len}`;


const renderQuestion = (index)=>{
    const que = document.querySelector('.question_section');
    const opA = document.querySelector('#optionA');
    const opB = document.querySelector('#optionB');
    const opC = document.querySelector('#optionC');
    const opD = document.querySelector('#optionD');
    que.innerText = `${index+1}. ${quizData[index].question}`;
    opA.innerText = quizData[index].options[0];
    opB.innerText = quizData[index].options[1];
    opC.innerText = quizData[index].options[2];
    opD.innerText = quizData[index].options[3];
    
}

options.forEach((option)=>{
    option.addEventListener('click',(e)=>{
        if(e.target.getAttribute('value') == quizData[currIndex].correct){
            score++;
        }
        if(currIndex+1 <=len-1){
            currIndex++;
            console.log(`current index ${currIndex}`);
            
            renderQuestion(currIndex);
        }else{
            showScore();
        }
        progress.innerText = `Progress ${currIndex+1} / ${len}`;
    })
})

const resetApp = ()=>{
    currIndex = 0;
    progress.innerText = `Progress ${currIndex+1} / ${len}`;
    score = 0;
    renderQuestion(0);
}
restart.addEventListener('click',resetApp);
reset.addEventListener('click',resetApp);


const showScore = () => {
    console.log(`score : ${score}`);
    
  const result = document.querySelector('.result');

  result.innerHTML = `
    <p>You scored ${score} out of ${len}</p>
    <button class="restart">Restart</button>
  `;
  result.style.display = 'flex';

  result.querySelector('.restart').addEventListener('click', () => {
      result.style.display = 'none';
      resetApp();
  });
}

renderQuestion(0);

