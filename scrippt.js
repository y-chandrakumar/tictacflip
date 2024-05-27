const single = document.getElementById("btn-one");
const multi = document.getElementById("btn-two");
let matter=document.getElementById("text");
const gameDiv = document.querySelector(".game-div");

let coin=document.getElementById("coin");
let one=document.getElementById("one");
let two=document.getElementById("two");
let grid = document.querySelector(".grid");

const btn = document.getElementById("albtn");
let currentPlayer = "X"; 
let currentcoin="(";
let flip=false;
let isGameOver = false;
let acell= ["","","","","","","","",""];
 




function createTicTacToeGrid() {
    acell= ["","","","","","","","",""];
    btn.style.display="none";
    flip=false;
     
     coin.style.display="flex";
     coin.style.visibility="visible";
     console.log(coin.display);
    let grid = document.querySelector(".grid");


    gameDiv.style.display = "block"; 
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const scell1 = document.createElement("div");
        const scell2 = document.createElement("div");
        scell1.classList.add("scell");
        scell1.id=2*i+"";
        scell2.classList.add("scell");
        scell2.id=2*i+1+"";
        cell.appendChild(scell1);
        cell.appendChild(scell2);
        scell1.textContent = "";
        scell1.textContent = "";
        grid.appendChild(cell);
    }

    let scellbox=document.getElementsByClassName("scell");
    for(let i=0;i<scellbox.length;i++){
        scellbox[i].style.justifyContent = i % 2 === 0 ? 'flex-end' : 'flex-start';

    }

    
    matter.innerHTML=currentPlayer+"'s  Turn";
}




function checkGameOver() {

    let scellbox=document.getElementsByClassName("scell");


    for(let i=0;i<scellbox.length;i=i+2){
        if(scellbox[i].textContent==")" && scellbox[i+1].textContent=="("){
        acell[i/2]="X";
        console.log(acell);
        }
        else if(scellbox[i].textContent=="(" && scellbox[i+1].textContent==")" ){
            acell[i/2]="O";
            console.log(acell);
        }
    }
   
   
     
   

    const cels = document.querySelectorAll(".cell");
  

     

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        
        if ((acell[a]==="X" || acell[a]==="O") &&

        acell[a]=== acell[b] && acell[a] === acell[c]) {
          
         isGameOver = true;
       matter.innerHTML=acell[a]+" Won";
            animate(a,b,c,cels);
            return; 
        }
    }
    
    //idea here is partial diogonal's starting box noted and check weather all are same if same tehen we will check if its eitehr o or x
    const winningCombinationstwo = [
        [0, 7, 14], [1, 8, 15], [2, 7, 12], 
        [2, 9, 16], [3, 8, 13], [4, 9, 14], 
    ];

    for (const combination of winningCombinationstwo) {
        const [a, b, c] = combination;
        
        if ((scellbox[a].textContent==="(" || scellbox[a].textContent===")") &&

        scellbox[a].textContent=== scellbox[b].textContent && scellbox[a].textContent === scellbox[c].textContent) {
          
        if( scellbox[a+1].textContent!=="" && scellbox[a+1].textContent!=scellbox[a].textContent  && scellbox[a+1].textContent=== scellbox[b+1].textContent && scellbox[a+1].textContent === scellbox[c+1].textContent ){


         isGameOver = true;
       
            animateadv(a,b,c,scellbox);
            return; }
        }
    }

    for(let i=0;i<scellbox.length;i++){
        if(scellbox[i].textContent==""){
            isGameOver=false;
            return ;
        }
    }
    flip=true;
    coin.style.visibility="hidden";
            return ;
        
    }



    
  function animateadv(a,b,c,scellbox){
    scellbox[a].classList.add("winning-cell");
    scellbox[a+1].classList.add("winning-cell");
    scellbox[b].classList.add("winning-cell");
    scellbox[b+1].classList.add("winning-cell");
    scellbox[c].classList.add("winning-cell");
    scellbox[c+1].classList.add("winning-cell");
    matter.innerHTML="Click here to restart";

    return;

  }
  
    
    


function animate(a,b,c,cels){

    cels[a].classList.add("winning-cell");
    cels[b].classList.add("winning-cell");
    cels[c].classList.add("winning-cell");
    matter.innerHTML="Click here to restart";
    console.log("player",cels[a].textContent,"won");
    
 
    return;
}


grid.addEventListener("click", (event) => {
            console.log("CLICKED "+event.target.id);
            if (!isGameOver && event.target.classList.contains("scell") && !event.target.textContent) {

                if(currentPlayer=="X"){
                    event.target.classList.add("X");

                    if(currentcoin=="("){
                        event.target.style.backgroundImage = "url('files/chevron-left-red.svg')";
                        }
        
        
                        else{
                            event.target.style.backgroundPosition="right";
                            event.target.style.backgroundImage = "url('files/chevron-right-red.svg')";
                        }
                    
               }
                else{
                    event.target.classList.add("O"); 
                    if(currentcoin=="("){
                        event.target.style.backgroundImage = "url('files/chevron-left.svg')";
                        }
                        else{    
                            event.target.style.backgroundPosition="right";  
                       event.target.style.backgroundImage = "url('files/chevron-right.svg')";
                        }   
                }
                

                
    
                    event.target.textContent = currentcoin;
    
    
               
               

                
                if(currentPlayer==="X"){
                    matter.style.color="black";
                    currentPlayer = "O";}
                    else{
                    matter.style.color="red";
                    currentPlayer="X";
                } 
                matter.innerHTML=currentPlayer+"'s  Turn";
                checkGameOver();
               
            }
    









           else if(!isGameOver && flip && event.target.classList.contains(currentPlayer) ){
            console.log("came here");


            console.log(event.target.id);
                if( event.target.textContent=="("){
                    if(currentPlayer=="X"){
                        event.target.style.backgroundPosition="right"; 
                        event.target.style.backgroundImage = "url('files/chevron-right-red.svg')";
                    }
                    else{
                        event.target.style.backgroundPosition="right"; 
                        event.target.style.backgroundImage = "url('files/chevron-right.svg')";
                    }
                event.target.textContent=")"
            
            }

                else if( event.target.textContent==")"){
                   
                    if(currentPlayer=="X"){

                        event.target.style.backgroundImage = "url('files/chevron-left-red.svg')";
                    }
                    else{
                        event.target.style.backgroundImage = "url('files/chevron-left.svg')";
                    }
                    
                    event.target.textContent="("}

                    if(currentPlayer=="X"){
                        matter.style.color="black";
                        currentPlayer="O";
                    }
                    else if(currentPlayer=="O"){
                        matter.style.color="red";
                        currentPlayer="X";
                    }
                    matter.innerHTML=currentPlayer+"'s  Turn";
                    checkGameOver();
            }
        }


        
        
        
        
        );
        

        single.addEventListener("click",()=>{
        matter.textContent="Not available come back soon"  
          
        })
        multi.addEventListener("click",()=>{
            coin.display="flex";
            createTicTacToeGrid();
            
        })
        one.addEventListener("click",()=>{
            one.style.backgroundColor="yellow";
            two.style.backgroundColor="transparent";
            currentcoin="(";


        })

        two.addEventListener("click",()=>{
            one.style.backgroundColor="transparent";
            two.style.backgroundColor="yellow";
            currentcoin=")";

        })

        matter.addEventListener("click",()=>{
            if(matter.innerHTML=="Click here to restart"){
   

                setTimeout(()=>{
                    isGameOver=false;
            
                   
                    while (grid.firstChild) {
                        grid.removeChild(grid.firstChild);
                    }
                       createTicTacToeGrid();
                        currentPlayer="X";
                        matter.style.color="red";
                        matter.innerHTML=currentPlayer+"'s  turn";
                   
                },1000)
            }
        })


      

      
        