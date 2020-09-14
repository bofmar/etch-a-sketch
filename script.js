const canvas = document.querySelector(".canvas-area");
const body = document.querySelector("body");

let canChangeColor = false;
let colorIsRandom = false;
let paintColor = "black";
let gridSize = 16;

createGrid();

//clear button
let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", createGrid);

//eraser button
let eraser = document.querySelector("#eraser");
eraser.addEventListener("click", ()=>{
    paintColor = "white";
});

//toggle grid
let toggleGridButton = document.querySelector("#toggle-grid");
toggleGridButton.addEventListener("click", toggleGrid);

//pick color
let pickColorButton = document.querySelector("#pick-color");
pickColorButton.value = paintColor;
pickColorButton.addEventListener("input", (e)=>{
    paintColor = e.target.value;
},false);

//random colors
let randomButton = document.querySelector("#random");
randomButton.addEventListener("click", () =>{
    if(colorIsRandom){
        colorIsRandom = false;
        paintColor = pickColorButton.value;
    }
    else{
        colorIsRandom = true;
    }
});

//toggle instructions
let instructionToggle = document.querySelector("#toggle-instructions");
instructionToggle.addEventListener("click", toggleInstructions)

//generate new grid
let gridSizeInput = document.querySelector("#grid-number-picker");
gridSizeInput.value = gridSize;
let gridSizeButton = document.querySelector("#grid-number-button");
gridSizeButton.addEventListener("click", ()=>{
    gridSize = gridSizeInput.value;
    if(gridSize > 100){
        gridSize = 100;
    }
    if(gridSize < 1){
        gridSize = 1;
    }
    createGrid();
    gridSizeInput.value = gridSize;
});

//prevent the user from dragging the grid around
document.querySelector('body').addEventListener('mousedown', function(e) {
    e.preventDefault();
});

function createGrid() {
    canvas.style.setProperty("--grid-size", gridSize);
    canvas.textContent = "";
    let totalDivs = Math.pow(gridSize, 2);
    for (let i = 0; i < totalDivs; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("canvas-item");
        canvas.appendChild(newDiv);
    }
    activateCellsFunctionality();
}

function activateCellsFunctionality() {
    let gridSquares = document.querySelectorAll(".canvas-item");
    gridSquares.forEach(gridSquare => gridSquare.addEventListener("mousedown", () => {
        canChangeColor = true;
    })); //checks if the user has his mouse click down and enables coloring

    body.addEventListener("mouseup", () => {
        canChangeColor = false;
    }); //disable coloring if the user lifts his mouse up anywhere in the body

    gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", changeColor));

    //when user clicks on a cell, always color that cell
    gridSquares.forEach(gridSquare => gridSquare.addEventListener("click", clickChangeColor));
}

function changeColor(e) {
    if(colorIsRandom){
        paintColor = getRandomHex();
    }
    if (canChangeColor) {
        e.target.style.backgroundColor = paintColor;
    }
}

function clickChangeColor(e) {
    if(colorIsRandom){
        paintColor = getRandomHex();
    }
    e.target.style.backgroundColor = paintColor;
}

function toggleGrid(e){
    let squares = document.querySelectorAll(".canvas-item");
    squares.forEach(square => {
        square.classList.toggle("canvas-item-no-border");
    })
    e.target.classList.toggle("grid-off");
}

function getRandomHex(){
    let hexString = "#";
    for(let i = 0; i < 3; i++){
        //get random number from 0 to 255
        let randomDecimal = getRandomInt(256);
        //convert from decimal to hex
        hexString += Number(randomDecimal).toString(16);
    }
    return hexString;
}

function getRandomInt(max, min){
    if(typeof min === "undefined"){
        //return a random number between 0(inclusive) and max(exclusive)
        return Math.floor(Math.random() * Math.floor(max));
    }
    else{
        //Return a random integer between min(inclusive) and max(exclusive)
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }   
}

function toggleInstructions(){
    let instructionArea = document.querySelector("#instructions");
    instructionArea.classList.toggle("instructions-area-off");
    instructionArea.classList.toggle("instructions-area-on");
}