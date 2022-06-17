let canvas = document.getElementById('canvas');

function buildCanvas (size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (row=1; row <= size; row++) {
        for (column=1; column <= size; column++) {
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            canvas.appendChild(pixel);
        }
    }
}

buildCanvas(10);