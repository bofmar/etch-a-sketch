const canvas = document.querySelector(".canvas-area");

createGrid();

let gridSquares = document.querySelectorAll(".canvas-item");
gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", changeColor));

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
    e.target.style.backgroundColor = "black";
}