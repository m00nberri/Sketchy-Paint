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

function changeBg(color) {
    let bgPixels = document.getElementsByClassName('bgPixel');
    (Array.from(bgPixels)).forEach(element => {
        element.style.backgroundColor = color;
    });
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