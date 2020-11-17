//global variables
const etchGridContainer = document.querySelector(`.etch-grid-container`);
const aside = document.querySelector(`aside`);
const buttonOptions = document.querySelectorAll(`.optionButton`);
const resetButton = document.querySelector(`#reset-button`);
const colorButtons = document.querySelectorAll(`.colorButton`);
let color = `black`; //default value for color

let initialWidth = 16; //base values to plug into our grid creation function (initialGrid)
let initialHeight = 16; //base values to plug into our grid creation function (initialGrid)
let cells = []; //initiating an empty array that will hold our grid divs 

//function declarations & expressions

let initialGrid = (w, h) => { //function that we will plug in width and height grid values for and create and append the divs and push them into an array called cells
    let count = w * h;
    for (let i = 0; i < count; i++) {
        let div = document.createElement(`div`);
        div.classList.add(`etch-grid-cells`);
        etchGridContainer.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
        etchGridContainer.style.gridTemplateRows = `repeat(${h}, 1fr)`;
        etchGridContainer.append(div);
        cells.push(div);
    }
    return cells; //returns our (now full with grids) cells array
}

let colorPick = () => { //function to select color for our etch pad
    colorButtons.forEach(button => button.addEventListener('click', (e) => {
        if (e.target.innerText === 'random') { //return a random color if random button was selected
            let randomColor = Math.floor(Math.random()*16777215).toString(16); //got this from csstricks.com 
            let hexCode = `#${randomColor}`;
            color = hexCode;
            return color;
        } else { //default is black and since it's the only other option besides random it will just default back to black
            color = `black`;
            return color;
        } 
    }));
}

let addEtch = (e) => { //function that makes sure we're selecting a div in our etch container
    if (!e.target.classList.contains('etch-grid-cells')) {
        return;
    } else {
        colorPick(); //function to determine the color based on either default or random button selection
        e.target.style.backgroundColor = color; //sets that color choice to the inline styles of our div
    }
};

function startEtching() { //function that apply's above function to each div in our container
        cells.forEach(cell => cell.addEventListener('mouseover', addEtch)); 
}

function clearEtch() { //removes all of the divs from the etch container
    while (etchGridContainer.firstChild) {
        etchGridContainer.firstChild.remove();
    }
}

function whichButton() { //function that will ammend the grid size depending on the user's choice from the buttons on the page
    buttonOptions.forEach(button => button.addEventListener('click', (e) => {
        let selectedOption = e.target.id; //id should be 16, 28, or 32
        let width = selectedOption;
        let height = selectedOption; 
        clearEtch(); //removes all the divs so we can apply our make grid function
        initialGrid(width, height); //plug those selected width's and height's into our grid creation function
        })
    );
}

function reset() { //returns all of the current divs in container back to original color
    cells.forEach(cell => cell.style.backgroundColor = '#D4D3D3');
}


//event listeners

document.addEventListener('DOMContentLoaded', () => {
    initialGrid(initialWidth, initialHeight); //sets the initial grid of 16x16 on page load
    colorPick(); //putting this on page load allows the user to select random color option before it defaults to black
});

etchGridContainer.addEventListener('mouseup', startEtching); //starts the main etching function when user clicks into the etching container

window.addEventListener('keyup', (e) => { //event listener that will stop the etch function if certain keys are pressed
    if (e.key === 'Backspace' || e.code === 'Space' || e.key === 'Enter') {
        cells.forEach(cell => cell.removeEventListener('mouseover', addEtch));
    } else {
        return;
    }
});

aside.addEventListener('mouseover', () => { //event listener that resets the grid when clicked
    resetButton.addEventListener('click', reset);
    whichButton();
});
























