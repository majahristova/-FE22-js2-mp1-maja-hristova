//The important variabels from HTML

let playercount = 0 ;
let computercount = 0;

let playerh1 = document.querySelector('#player');
let computerh1 = document.querySelector('#computer')
let playerpoint = document.querySelector('#playerpoint')
let computerpoint = document.querySelector('#computerpoint')
const container = document.querySelector('#highestScore');


const rock = document.querySelector('#button-rock');
const paper = document.querySelector('#button-paper');
const scissor = document.querySelector(' #button-scissor');


//Score and firebase fetch 
const scoreUrl =` https://stensaxpose-1032f-default-rtdb.europe-west1.firebasedatabase.app/`;


async function getdata(){
    const url = scoreUrl + 'highestcore.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    displayScoreInfo(data)
}
getdata();


//The insert name function

const buttonname = document.querySelector('#sendinname');
buttonname.addEventListener('click', changePlayernamelement);

let username ='';

function changePlayernamelement(event) {
    event.preventDefault();
    const inputname = document.querySelector('#inputtext');
    playerh1.innerText = inputname.value;

    username = inputname.value;
    inputname.value = '';
  
}


async function postinfo(obj){
    const newurl = scoreUrl + 'highestcore/.json';

    const init = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    const response = await fetch(newurl,init);
    const newdata = await response.json();
    console.log(newdata)

    getdata();

}

function displayScoreInfo(newdata){
    const arraylist = Object.values(newdata);

    container.innerHTML = '';
    
    arraylist.sort((a,b) => b.score-a.score)
    for (let i= 0; i<5; i++){

    
        const divforscore = document.createElement('div');
        container.appendChild(divforscore);

        const Name = document.createElement('h3');
        divforscore.appendChild(Name);
        Name.innerText = arraylist[i].name;

        const score = document.createElement('p');
        divforscore.appendChild(score);
        score.innerText = arraylist[i].score;
    }
}






//The game 


const startgame = document.querySelector('#game-btn');
console.log(startgame);

startgame.addEventListener('click', gamefunction);



function gamefunction(event) {
    let userchoice;

    //User choices
    if (event.target == rock) {
        userchoice = 'rock';
    }
    else if (event.target == paper) {
        userchoice = 'paper';
    }
    else if (event.target == scissor) {
        userchoice = 'scissor';
    }
    playerh1.innerText = `${username} = ${userchoice}`;
    console.log(userchoice);


    //Computers choices   0 = rock 1 = paper  2 = scissor.


    let choosenByComputer = Math.round(Math.random() * 2);
    console.log(choosenByComputer);

    if(choosenByComputer == 0) {
        computerh1.innerText = `Computer = Rock`;
    }
    else if(choosenByComputer == 1) {
        computerh1.innerText = `Computer = Paper`;
    }
    else if(choosenByComputer == 2) {
        computerh1.innerText = `Computer = Scissor`;
    }



 // iF ROCK WAS CHOSEN
    if (  userchoice == 'rock' && choosenByComputer == 0 ) {
        alert('Its a draw,try again!')
    }
   else if ( userchoice == 'paper' && choosenByComputer == 0 ) {
        playercount++
        playerpoint.innerText = playercount;
    }

    else if (   userchoice == 'scissor' && choosenByComputer == 0 ) {
        computercount++
        computerpoint.innerText =computercount;

    }

// iF PAPER WAS CHOSEN
    if ( userchoice == 'paper' && choosenByComputer == 1  ) {
        alert('Its a draw,try again!')
    }
    else if (userchoice == 'scissor' && choosenByComputer == 1 ) {
        playercount++
        playerpoint.innerText = playercount;
    }

   else if ( userchoice == 'rock' && choosenByComputer == 1 ) {
    computercount++
    computerpoint.innerText =computercount;

    }

//IF SCISSOR WAS CHOSEN
    if ( userchoice == 'scissor' && choosenByComputer == 2 ) {
        alert('Its a draw,try again!')
    }
   else if ( userchoice == 'rock' &&  choosenByComputer == 2  ) {
    playercount++
    playerpoint.innerText = playercount;
    }

    else if ( userchoice == 'paper' && choosenByComputer == 2) {
        computercount++
        computerpoint.innerText =computercount;
    }



//THE SCORE HAS BEEN REACHED. 
    if(playercount == 1) {

        //The game continues 

        playerpoint.innerText = playercount;

    } 
    else if (computercount == 1) {

        setTimeout(() => {
            alert(`You lost against the computer after ${playercount} tries.`)
            const scoreObjectInfo = {
                name: username,
                score : playercount,
            }
        
            postinfo(scoreObjectInfo)
            
            playercount = 0 ;
            computercount = 0;
            playerpoint.innerText = 0;
            computerpoint.innerText = 0;
    
          
          }, 100 )
    }
}

