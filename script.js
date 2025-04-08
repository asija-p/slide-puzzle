document.addEventListener("DOMContentLoaded", function () {
    const hello = document.querySelector(".hello");
    hello.textContent = "SLIDE PUZZLE"

    const dims = document.querySelector(".dims");
    dims.textContent = "3x3"

    const play = document.querySelector(".play");

    play.addEventListener("click", function () {
        makePuzzle();
    });    
});

const popupContainer = document.querySelector(".popup-container");
const popup = document.getElementById("moveCount");
const closeButton = document.getElementById("closePopup");

closeButton.addEventListener("click", () => {
    popupContainer.classList.remove("show");
});


    const image = 'image.jpg';
    const gridSize = 3;
    const tileSize = 100;

    let moves = 0;

    const puzzleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    

    function makePuzzle() {

        let randomized = puzzleArray.sort(() => Math.random() - 0.5);

        while(!isSolvable(randomized)) randomized = puzzleArray.sort(() => Math.random() - 0.5);

        document.querySelector(".start-screen").style.display = "none";

        const puzzleContainer = document.querySelector('.puzzle-container');
        puzzleContainer.style.backgroundColor='white';

        const puzzle = document.querySelector('.puzzle');

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            puzzle.appendChild(tile);
        }

        const tiles = document.querySelectorAll('.tile');

        tiles.forEach((tile, index) => {
            tile.addEventListener("click", function () {
                if (isAdjacent(index)) {
                    swapTile(index);
                    renderPuzzle();
                    setTimeout(() => {
                        checkIfSolved();
                    }, 0);
                }
            });
        });    
            
        tiles.forEach((tile, index) => {

            const tileNumber = randomized[index];
    
            if (tileNumber === 9) {
                tile.textContent = "";
                tile.style.backgroundImage = "none";
                tile.style.backgroundColor = "transparent";
            } else {
                tile.textContent = tileNumber;
                
                const row = Math.floor((tileNumber - 1) / gridSize);
                const col = (tileNumber - 1) % gridSize;

                tile.style.backgroundImage = `url('image.jpg')`;
                tile.style.backgroundSize = `${tileSize * gridSize}px ${tileSize * gridSize}px`;
                tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
            }
        });
    }

    function isSolvable(array) {
        const flattened = array.filter(n => n !== 9);
        let inversions = 0;

        for (let i = 0; i < flattened.length - 1; i++) {
            for (let j = i + 1; j < flattened.length; j++) {
                if (flattened[i] > flattened[j]) inversions++;
            }
        }

        return inversions % 2 === 0;
    }

    function renderPuzzle() {
        const tiles = document.querySelectorAll('.tile');

        tiles.forEach((tile, index) => {
            const tileNumber = puzzleArray[index];
    
            if (tileNumber === 9) {
                tile.textContent = "";
                tile.style.backgroundImage = "none";
                tile.style.backgroundColor = "transparent";
            } else {
                tile.textContent = tileNumber;
                tile.style.backgroundImage = `url('${image}')`;
                tile.style.backgroundSize = `${tileSize * gridSize}px ${tileSize * gridSize}px`;

                const row = Math.floor((tileNumber - 1) / gridSize);
                const col = (tileNumber - 1) % gridSize;

                tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
            }
        });
        
        
    }


    function isAdjacent(index) {
        const emptyIndex = puzzleArray.indexOf(9);
        const rowDiff = Math.abs(Math.floor(index / gridSize) - Math.floor(emptyIndex / gridSize));
        const colDiff = Math.abs((index % gridSize) - (emptyIndex % gridSize));

        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }


    function swapTile(index) {
        moves++;
        const emptyIndex = puzzleArray.indexOf(9);
        puzzleArray[emptyIndex] = puzzleArray[index]; 
        puzzleArray[index] = 9;
    }

  
    function checkIfSolved() {
    
        const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const isSolved = puzzleArray.every((tileNumber, index) => tileNumber === correctOrder[index]);
    
        if (isSolved) {

            moveCount.textContent = `moves: ${moves}`
            popupContainer.classList.add("show");
        }
    }


    