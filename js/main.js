//Selection Variables from HTML
let startBtn = document.querySelector('.startBtn');
let startDiv = document.querySelector('.start');
let quiz__container = document.querySelector('.quiz__container');
let quiz__details = document.querySelector('.quiz__details');
let section__one = document.querySelector('.section__one');
let counter = document.querySelector('.counter .counter__span');
let question__num = document.querySelector('.question__num');
let qCount = document.querySelector('.qCount');
let question = document.querySelector('.question');
let answers = document.querySelector('.answers');
let nextBtn = document.querySelector('.button');
let timer = document.querySelector('.timer');
let quizResult = document.querySelector('.result');
let section__two  = document.querySelector('.section__two ');
let section__five = document.querySelector('.section__five');
let restartDiv = document.querySelector('.restart');
let restartBtn = document.querySelector('.restartBtn');

//Usable Variables
let index = 0;
let corrAns = 0;
let timeDo;

startBtn.addEventListener('click', () => {
    console.log('start');
    //startBtn.classList.add('hide');
    startDiv.classList.add('hide');
    quiz__container.classList.remove('hide');
});
restartBtn.addEventListener('click', () => {
    window.location.reload();
    //console.log('show');
    //restartDiv.classList.add('hide');
    //startDiv.classList.remove('hide');
    //quiz__container.classList.add('hide'); 
})
/*
function startQuiz() {

} */
function quizQue() {
    let httpRequ = new XMLHttpRequest();
    

    httpRequ.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //4 == your request is finished and response is ready
            //200 == your file is exist
            //console.log(this.responseText);

            //Converting them to JavaScript Object to use it
            let qObjs = JSON.parse(this.responseText);
            //console.log(qObjs);
            let queNum = qObjs.length;
            //console.log(queNum);

            //Counter Function which has the number of Questions
            counting(queNum);

            qNumbers(qObjs[index], queNum);

             //Timer Function
            timerCounter(20, queNum);
            

            //Putting the number of question beside the question
            queCount(qObjs[index], queNum);

            

            //Adding the data of questions from json file
            addQue(qObjs[index], queNum);


            //Clicking on next button
            nextBtn.onclick = function() {

                //Right answer form json
                let rightAns = qObjs[index].correct;
                //console.log(rightAns);
                //Increasing the index after this stage
                index++;

                //Check if the answer is correct of not
                Checking(rightAns, queNum);

    

                //Remove old que
                question__num.innerHTML = '';
                question.innerHTML = '';
                answers.innerHTML = '';

                //Putting the new questions and new number of que again
                
                //Timer Function
                clearInterval(timeDo);
                timerCounter(20, queNum);
                

                addQue(qObjs[index], queNum);

                qNumbers(qObjs[index], queNum);
                queCount(qObjs[index], queNum);

                


               //Result
                resultQu(queNum);
                
            };

        }
    }
    httpRequ.open("GET", "questions.json", true);
    httpRequ.send();
}

quizQue();

function counting(n) {
    counter.innerHTML = n;
}


function queCount(obj, queNum) {
    //console.log(obj);

    if (index < queNum) {
    //Question number h2
    let quN = document.createElement('h2');
    quN.className = 'question__count'
    //Question number text
    let quNText = document.createTextNode(`${obj['num']}-`);
    //Append text to h2
    quN.appendChild(quNText);
    //Appening the number to question__num
    question__num.appendChild(quN)
    }
} 

function qNumbers(obj, queNum) {
    if (index < queNum) {
        qCount.innerHTML = `${obj['num']}`;
    }
    
}
//Adding Questions Function
function addQue(obj, qC) {
    if (index < qC) {
    //console.log(obj);
    //console.log(qC);
    //Question
    let que = document.createElement('h2');
    //Question Text
    let queText = document.createTextNode(obj['question']);

    //Appending question text to heading
    que.appendChild(queText);
    //Appending question to question div in html
    question.appendChild(que);

    //Answers
    for (let i = 1; i <= 3; i++) {
        //Answer Div
        let answerDiv = document.createElement('div');
        //Div class
        answerDiv.className = 'answer';
        //Radio Input
        let input = document.createElement('input');
        //Input Details name, id , data-attribute
        input.name = 'que';
        input.type = 'radio';
        input.id = `answer-${i}`;
        input.dataset.ans = obj[`answer-${i}`];

        //Label
        let label = document.createElement('label');
        label.htmlFor = `answer-${i}`;
        //label text
        let labelTe = document.createTextNode(obj[`answer-${i}`]);

        //Add text to label
        label.appendChild(labelTe);

        //Add input and label to answer
        answerDiv.appendChild(input);
        answerDiv.appendChild(label);

        //Add to answers Div from html
        answers.appendChild(answerDiv);
    }
    }
}

//Function Checking
function Checking(corA, qch) {
    //console.log(corA);
    //console.log(qch);
    let ansS = document.getElementsByName('que');
    console.log(ansS)
    let checkedAn;

    for (let i = 0; i < ansS.length; i++) {

        if(ansS[i].checked) {
            checkedAn = ansS[i].dataset.ans;

        }
    }
    console.log(`right ${corA} choosen ${checkedAn}`);
    if (corA === checkedAn) {
        corrAns++;
        //console.log('good');
    }
}

//Result Function
function resultQu(re) {
    let resu;
    if (index === re) {
        question.remove();
        answers.remove();
        nextBtn.remove();
        section__two .remove();
        counter.remove();
        timer.remove();
        quiz__details.remove();
        section__one.remove();
        restartDiv.classList.remove('hide');
        

        if (corrAns > (re / 2) && corrAns < re) {
            resu = `   <div class="result good"> 
            <h3 class="quiz__result">Quiz Result</h3>
            <img src="images/man-who-thinks-idea-is-admired-by-thumbs-up_1150-35044-removebg-preview.png" alt="" class="perfect__img">
            <h2>Great Job</h2>
            <span class="score__title">Your Score</span>
            <span class="score__num"> <span class="good">${corrAns}</span>
                /${re}</span>
        </div>
            `
        } else if  (corrAns === re) {
            resu = ` <div class="result perfect"> 
            <h3 class="quiz__result">Quiz Result</h3>
            <img src="images/successful-businessmen-stand-knees-holding-huge-golden-goblet-hands_1016-5195-removebg-preview (1).png" alt="" class="perfect__img">
            <h2>Congradulations!</h2>
            <span class="score__title">Your Score</span>
            <span class="score__num"> <span class="perfect">${corrAns}</span>
                /${re}</span>
        </div>`
        } else {
            resu = `<div class="result bad"> 
            <h3 class="quiz__result">Quiz Result</h3>
            <img src="images/organic-flat-complain-concept_23-2148952279-removebg-preview.png" alt="" class="perfect__img">
            <h2>You have not pass the quiz</h2>
            <span class="score__title">Your Score</span>
            <span class="score__num"> <span class="bad">${corrAns}</span>
                /${re}</span>
        </div>`
        }
        quizResult.innerHTML = resu;
        quizResult.style.padding = '5px';
        quizResult.style.marginTop = '5px'
    }
}
//Timer Function
function timerCounter(time, nu) {
    if (index < nu) {
        let min, sec;
        

        timeDo = setInterval(function () {
            min = parseInt(time / 60);
            sec = parseInt(time % 60);

            min = min < 10? `0${min}`: min;
            sec = sec < 10? `0${sec}` : sec;

            timer.innerHTML = `${min}:${sec}`;

            if (--time < 0) {
                clearInterval(timeDo);
                nextBtn.click();
            }
        }, 1000)
    }
}