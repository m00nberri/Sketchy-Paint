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
        pixel = canvas.firstElementChild;
    }
}

function buildCanvas (size) {
    removePixels();
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (row=1; row <= size; row++) {
        for (column=1; column <= size; column++) {
            let pixel = document.createElement('div');
            pixel.className = 'bgPixel pixelBorder';
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
