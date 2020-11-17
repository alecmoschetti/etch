//global variables
const etchGridContainer = document.querySelector(`.etch-grid-container`);
const main = document.querySelector(`main`);

let initialWidth = 16;
let initialHeight = 16;
let cells = [];

function createGridCells(w, h) {
    let count = w * h;
    for (let i = 0; i < count; i++) {
        let div = document.createElement(`div`);
        div.classList.add(`etch-grid-cells`);
        etchGridContainer.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
        etchGridContainer.style.gridTemplateRows = `repeat(${h}, 1fr)`;
        etchGridContainer.append(div);
        cells.push(div);
    }
    return cells;
}

createGridCells(initialWidth, initialHeight);

function startEtching(event) {
    if (!event.target) {
        return;
    } else {
        cells.forEach(cell => addEventListener('mouseover', (e) => {
            if (!e.target.classList.contains('etch-grid-cells')) {
                return;
            } else {
                e.target.style.backgroundColor = 'black';
            }
        }));
    }
}

function areWeClicked() {
    let clickCounter = 2;
    if (clickCounter%2 === 0) {
        clickCounter++;
        etchGridContainer.addEventListener('mouseup', startEtching, false);
    } else {
        clickCounter++
        etchGridContainer.removeEventListener('mouseup', startEtching, false);
    }
}

areWeClicked();





















