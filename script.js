let rainButton = document.getElementById('rainbowButton')
let drawButton = document.getElementById('drawButton');
let fillButton = document.getElementById('fillButton');
let eraserButton = document.getElementById('eraserButton');
drawButton.classList.add('clickedButton');
let drawMode = 'draw';

let mouseStatus = 'up'
document.body.addEventListener('mousedown', () => {
    mouseStatus = 'down';
})
document.body.addEventListener('mouseup', () => {
    mouseStatus = 'up';
})

let gridButton = document.getElementById('gridButton');
let clearButton = document.getElementById('clearButton');
gridButton.classList.add('clickedButton');
let gridMode = 'on';

let canvas = document.getElementById('canvas');
let slider = document.getElementById('sizeInput');
let sizeText = document.getElementById('sizeText');
slider.value = 25;
sizeText.textContent = `Size: ${slider.value}x${slider.value}`;
buildCanvas(25);

let drawColor = document.getElementById('drawColorBox');
let bgColor = document.getElementById('bgColorBox');
drawColor.value = '#000000';
bgColor.value = '#ffffff';

drawColor.oninput = () => {

}

function changeDraw(color) {
    drawColor.value = color;
}

function changeBg(color) {
    let bgPixels = document.getElementsByClassName('bgPixel');
    (Array.from(bgPixels)).forEach(element => {
        element.style.backgroundColor = color;
    });
}

function setContrast(color) {
    let pixelBorders = document.getElementsByClassName('pixelBorder');
    let bg = hex2rgb(color);
    console.log(bg);
    let brightness = (0.2126*bg['r'] + 0.7152*bg['g'] + 0.0722*bg['b']);
    if (brightness <= 50) {
        (Array.from(pixelBorders)).forEach(element => {
            element.style.border = 'white solid 0.1px';
        });
    }
    else {
        (Array.from(pixelBorders)).forEach(element => {
            element.style.border = 'black solid 0.1px';
        });
    }
}

function removePixels() {
    let pixel = canvas.firstElementChild;
    while (pixel) {
        canvas.removeChild(pixel);
        pixel.removeEventListener('click', function onClick(event) {
            draw(event);
        });
        pixel = canvas.firstElementChild;
    }
}

function buildCanvas (size) {
    removePixels();
    gridMode = 'on';
    gridButton.classList.add('clickedButton');
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (row=1; row <= size; row++) {
        for (column=1; column <= size; column++) {
            let pixel = document.createElement('div');
            pixel.className = 'bgPixel pixelBorder';
            pixel.addEventListener('mousedown', function onClick(event) {
                draw(event);

            });
            pixel.addEventListener('mouseover', function onClick(event) {
                if (mouseStatus === 'up') {
                    null;
                }
                else if (mouseStatus === 'down') {
                    draw(event);
                }
            });
            pixel.id = `${column},${row}`;
            canvas.appendChild(pixel);
        }
    }
}

slider.oninput = () => {
    sizeText.textContent = `Size: ${slider.value}x${slider.value}`;
}

function hex2rgb(hex) {
    var validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!validHEXInput) {
        return false;
    }
    var output = {
        r: parseInt(validHEXInput[1], 16),
        g: parseInt(validHEXInput[2], 16),
        b: parseInt(validHEXInput[3], 16),
    };
    return output;
}

rainButton.addEventListener('click', () => {
    rainClick();
});
drawButton.addEventListener('click', () => {
    drawClick();
});
fillButton.addEventListener('click', () => {
    fillClick();
});
eraserButton.addEventListener('click', () => {
    eraserClick();
});

function rainClick() {
    if (drawMode === 'rainbow') {
        drawMode = 'draw';
        rainButton.classList.remove('clickedButton')
    }
    else {
        drawMode = 'rainbow';
        rainButton.classList.add('clickedButton')
        drawButton.classList.add('clickedButton');
        fillButton.classList.remove('clickedButton');
        eraserButton.classList.remove('clickedButton');
    }
}

function drawClick() {
    if (drawMode === 'draw') {
        null;
    }
    else {
        drawMode = 'draw';
        rainButton.classList.remove('clickedButton')
        drawButton.classList.add('clickedButton');
        fillButton.classList.remove('clickedButton');
        eraserButton.classList.remove('clickedButton');
    }
}

function fillClick() {
    if (drawMode === 'fill') {
        null;
    }
    else {
        drawMode = 'fill';
        rainButton.classList.remove('clickedButton')
        drawButton.classList.remove('clickedButton');
        fillButton.classList.add('clickedButton');
        eraserButton.classList.remove('clickedButton');
    }
}

function eraserClick() {
    if (drawMode === 'eraser') {
        null;
    }
    else {
        drawMode = 'eraser';
        rainButton.classList.remove('clickedButton')
        drawButton.classList.remove('clickedButton');
        fillButton.classList.remove('clickedButton');
        eraserButton.classList.add('clickedButton');
    }
}

gridButton.addEventListener('click', () => {
    gridClick();
});

clearButton.addEventListener('click', () => {
    clearClick();
});

function gridClick() {
    let pixelBorders = document.getElementsByClassName('pixelBorder');
    if (gridMode === 'on') {
        gridMode = 'off'
        gridButton.classList.remove('clickedButton');

        (Array.from(pixelBorders)).forEach(element => {
            element.style.borderStyle = 'none';
        });
    }
    else {
        gridMode = 'on';
        gridButton.classList.add('clickedButton');

        (Array.from(pixelBorders)).forEach(element => {
            element.style.borderStyle = 'solid';
        });
    }
}

//Rainbow code modified from https://krazydad.com/tutorials/makecolors.php
let phase = 0;
let steps = 24;
let frequency = 2*Math.PI/steps;
let rainbowI = 0;

function draw(event) {
    let center = 128;
    let width = 127;

    red   = Math.sin(frequency*rainbowI+2+phase) * width + center;
    green = Math.sin(frequency*rainbowI+0+phase) * width + center;
    blue  = Math.sin(frequency*rainbowI+4+phase) * width + center;

    event.target.classList.add('drawPixel');

    if (drawMode === 'draw') {
        event.target.style.backgroundColor = drawColor.value;
        event.target.classList.remove('bgPixel');
    }
    else if (drawMode === 'rainbow') {
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        rainbowI += 1;
        event.target.classList.remove('bgPixel');
    }
    else if (drawMode === 'eraser') {
        event.target.classList.add('bgPixel');
        event.target.classList.remove('drawPixel');
        event.target.style.backgroundColor = bgColor.value;
    }
    else if (drawMode === 'fill') {
        fillMarker(event);
    }
}

function fillMarker(event) {
    let baseColor = window.getComputedStyle(event.target).getPropertyValue('background-color');

    let coords = event.target.id.split(',');
    let xcoord = coords[0];
    let ycoord = coords[1];
    console.log(baseColor)

    let toCheck = 1;
    let checkBook = {};
    let foundLeft = 0;
    let foundRight = 0;

    while (toCheck >= 1) {
        if (toCheck >100) {
            return;
        }
        checkUp();
        fillDown();
        fillDraw();
        console.log('tocheck is:' + toCheck);
        console.log('coords:' + checkBook[`${toCheck}`-1].split(','));
        coords = checkBook[`${toCheck}`-1].split(',');
        xcoord = coords[0];
        ycoord = coords[1];
        console.log('coords[1]' + coords[1])
    }

    function checkUp() {
        toCheck -= 1;
        let targetPixel = document.getElementById(`${xcoord},${ycoord}`);
        while (window.getComputedStyle(targetPixel).getPropertyValue('background-color') === baseColor) {
            ycoord -= 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            if (ycoord === 1) {
                return;
            }
            else if (ycoord < 1) {
                ycoord = parseInt(ycoord) + 1;
                return;
            }
            else if (window.getComputedStyle(targetPixel).getPropertyValue('background-color') !== baseColor) {
                ycoord = parseInt(ycoord) + 1
                targetPixel = document.getElementById(`${xcoord},${ycoord}`);
                return;
            }
        }
    }

    function fillDown() {
        foundLeft = 0;
        foundRight = 0;
        let targetPixel = document.getElementById(`${xcoord},${ycoord}`);
        console.log('fillDown coords:' + xcoord + ' , ' + ycoord)
        while (window.getComputedStyle(targetPixel).getPropertyValue('background-color') === baseColor) {
            targetPixel.classList.add('fillMark');
            if (foundLeft === 0) {
                checkLeft();
            }
            if (foundRight === 0) {
                checkRight();
            }
            ycoord = parseInt(ycoord) + 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            if (ycoord === (parseInt(slider.value))) {
                targetPixel.classList.add('fillMark');
                if (foundLeft === 0) {
                    checkLeft();
                }
                if (foundRight === 0) {
                    checkRight();
                }
                return;
            }
            else if (window.getComputedStyle(targetPixel).getPropertyValue('background-color') !== baseColor) {
                ycoord -= 1;
                targetPixel = document.getElementById(`${xcoord},${ycoord}`);
                return;
            }
            else {
                targetPixel.classList.add('fillMark');
                if (foundLeft === 0) {
                    checkLeft();
                }
                if (foundRight === 0) {
                    checkRight();
                }
            }
        }
    }
    
    function checkLeft() {
        xcoord = parseInt(xcoord) - 1;
        let targetPixel = document.getElementById(`${xcoord},${ycoord}`);
        if (xcoord === 0) {
            xcoord = parseInt(xcoord) + 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            return;
        }
        else if (window.getComputedStyle(targetPixel).getPropertyValue('background-color') === baseColor) {
            checkBook[toCheck] = `${xcoord},${ycoord}`;
            xcoord = parseInt(xcoord) + 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            toCheck += 1;
            console.log('add to tocheck from left, its now;' + toCheck);
            foundLeft = 1;
            return;
        }
        else {
            xcoord = parseInt(xcoord) + 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            return;
        }
    }

    function checkRight() {
        xcoord = parseInt(xcoord) + 1;
        let targetPixel = document.getElementById(`${xcoord},${ycoord}`);
        if (xcoord === parseInt(slider.value)+1) {
            xcoord -= 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            return;
        }
        else if (window.getComputedStyle(targetPixel).getPropertyValue('background-color') === baseColor) {
            checkBook[toCheck] = `${xcoord},${ycoord}`;
            xcoord -= 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            toCheck += 1;
            console.log('add to tocheck from right, its now;' + toCheck);
            foundRight = 1;
            return;
        }
        else {
            xcoord -= 1;
            targetPixel = document.getElementById(`${xcoord},${ycoord}`);
            return;
        }
    }
}


//targetPixel.classList.add('fillMark');
function fillDraw() {     
    let toFill = document.getElementsByClassName('fillMark');
    (Array.from(toFill)).forEach(element => {
        element.style.backgroundColor = drawColor.value;
        element.classList.remove('fillMark');
        element.classList.remove('bgPixel');
        element.classList.add('drawPixel');
    });
}