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


    const image = 'image.jpg';
    const gridSize = 3;
    const tileSize = 100;

    const imageUrl = [
        'game1/1.jpg',
        'game1/2.jpg',
        'game1/3.jpg',
        'game1/4.jpg',
        'game1/5.jpg',
        'game1/6.jpg',
        'game1/7.jpg',
        'game1/8.jpg',
    ]

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
        checkIfSolved();
    }


    function isAdjacent(index) {
        const emptyIndex = puzzleArray.indexOf(9);
        const rowDiff = Math.abs(Math.floor(index / gridSize) - Math.floor(emptyIndex / gridSize));
        const colDiff = Math.abs((index % gridSize) - (emptyIndex % gridSize));

        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }


    function swapTile(index) {
        const emptyIndex = puzzleArray.indexOf(9);
        puzzleArray[emptyIndex] = puzzleArray[index]; 
        puzzleArray[index] = 9;
    }

  
    function checkIfSolved() {
        tiles.forEach((tile, index) => {
            
        const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const isSolved = puzzleArray.every((tileNumber, index) => tileNumber === correctOrder[index]);

        if (isSolved) {
            end.textContent = "YOU WON!"
        }
        });
    }


    