// 1) Presents the player with an option to enter their name and then 
// display it X
// 2) Presents the player with a dice and a roll button  X
// 3) When the roll button is hit, the dice rolls and the value it returns is 
// added to a counter X
// 4) For as long as the player hasn’t rolled a 6, they continue rolling 
// 5) If the player rolls a 6, it’s game over - and it should ask them to 
// play again  X
// Bonus) keep a track of the number of rolls used in each session and 
// create a high-score table, where the fewest number of rolls to 15 is 
//objects and variables X
let username = prompt("Enter your name!");
!username ? username = "Not Entered" : true; 
const dice ={
    1: "./1.png",
    2: "./2.png",
    3:"./3.png",
    4: "./4.png",
    5: "./5.png",
    6: "./6.png"
}
let score = 0;
let scoreObject = {}
let path = []
//queries
const button = document.getElementById("rollButton")
const diceImage = document.getElementById("dice")
const playagain = document.getElementById("playagain")
const scores = document.getElementById("scores")
const Name = document.getElementById("name");
const scoreDisplay = document.getElementById("score")
Name.innerText = username;
scoreDisplay.innerText = score;
const highScores =[];
//functions

const diceRoll = ()=>{
    return Math.floor((Math.random() * 6) + 1);
}
const addPath = (path,highscore)=>{
    highScores.push(score);
    scoreObject[highscore] = path;
    console.log("highscores: ",highScores)
    console.log(scoreObject)
}
const displayScores = ()=>{
    const str = highScores.sort((a,b)=>a-b).reverse().map( (highScore,i) =>{
        if(i === 0){
           return `${highScore}: ${scoreObject[highScore]} <= HIGH SCORE`
        }
       return `${highScore}: ${scoreObject[highScore]}`});
    console.log(str);
    str.forEach( s =>{
        const p = document.createElement("p");
        p.innerText = s;
        scores.append(p);
    })
}
function reset() {
    playagain.style.display === "none" ? playagain.style.display = "block" : playagain.style.display = "none";
    button.style.display === "block" ? button.style.display = "none" : button.style.display = "block";
    displayScores();
    diceImage.setAttribute("src","");
 
}
//events
button.addEventListener("click", ()=>{
    const diceValue = diceRoll();
    const diceSRC = dice[diceValue]
    diceImage.setAttribute("src",diceSRC);
    if(diceValue === 6){
       button.style.display = "none";
       playagain.style.display = "block";
       addPath(path,score);
       setTimeout(()=>{
           diceImage.setAttribute("src","")
       },1000)
    }else{
        score+= diceValue;
        scoreDisplay.innerText = score;
       path.push(diceValue);
    }
})
playagain.addEventListener("click", e =>{
    if(e.target.tagName === "BUTTON"){
        score = 0;
        path = [];  
        scores.innerHTML = "";
        reset();
    }
})