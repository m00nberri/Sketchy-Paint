let canvas = document.getElementById('container');

function buildCanvas (size) {
    pixels = size*size;
    for (i=0, i <= pixels, i++) {
        canvas.innerHTML += `<div class="pixel${i}" id="p${i}">${i}</div>`;
        document.getElementById(`p${i}`).style.gridColumn = 1;
    }
}