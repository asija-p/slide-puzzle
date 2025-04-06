document.addEventListener("DOMContentLoaded", function () {
    const hello = document.querySelector(".hello");
    hello.textContent = "WELCOME!"
});

document.addEventListener("DOMContentLoaded", function () {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const size = 3;

    const end = document.querySelector(".end");

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

        const randomized = puzzleArray.sort(() => Math.random() - 0.5);

        while(!isSolvable(randomized)) randomized = puzzleArray.sort(() => Math.random() - 0.5);
            
        tiles.forEach((tile, index) => {

            const tileNumber = randomized[index];
    
            if (tileNumber === 9) {
                tile.textContent = "";
                tile.style.backgroundImage = "none";
                tile.style.backgroundColor = "transparent";
            } else {
                tile.textContent = tileNumber;
                tile.style.backgroundImage = `url(${imageUrl[tileNumber - 1]})`;
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
        tiles.forEach((tile, index) => {
            const tileNumber = puzzleArray[index];
    
            if (tileNumber === 9) {
                tile.textContent = "";
                tile.style.backgroundImage = "none";
                tile.style.backgroundColor = "transparent";
            } else {
                tile.textContent = tileNumber;
                tile.style.backgroundImage = `url(${imageUrl[tileNumber - 1]})`;
            }
        });
        checkIfSolved();
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", function () {
            if (isAdjacent(index)) {
                swapTile(index);
                renderPuzzle();
            }
        });
    });

    function isAdjacent(index) {
        const emptyIndex = puzzleArray.indexOf(9);
        const rowDiff = Math.abs(Math.floor(index / size) - Math.floor(emptyIndex / size));
        const colDiff = Math.abs((index % size) - (emptyIndex % size));

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

    makePuzzle();
})