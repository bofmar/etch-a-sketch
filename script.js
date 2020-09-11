const canvas = document.querySelector(".canvas-area");
const body = document.querySelector("body");
let canChangeColor = false;

createGrid();

let gridSquares = document.querySelectorAll(".canvas-item");
gridSquares.forEach(gridSquare => gridSquare.addEventListener("mousedown", ()=>{
    canChangeColor = true;
})); //checks if the user has his mouse click down and enables coloring

body.addEventListener("mouseup",()=>{
    canChangeColor = false;
}); //disable coloring if the user lifts his mouse up anywhere in the body

gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", changeColor));

//when user clicks on a cell, always color that cell
gridSquares.forEach(gridSquare => gridSquare.addEventListener("click", clickChangeColor)); 


function createGrid(){
    canvas.style.setProperty("--grid-size", 16);
    let totalDivs = Math.pow(16,2);
    for(let i = 0; i < totalDivs; i++){
        let newDiv = document.createElement("div");
        newDiv.classList.add("canvas-item");
        canvas.appendChild(newDiv);
    }
}

function changeColor(e){
    if(canChangeColor){
        e.target.style.backgroundColor = "black";
    }
}

function clickChangeColor(e){
    e.target.style.backgroundColor = "black";
}