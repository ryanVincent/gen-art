const createVertex = require('./vertex.js');
const { createPolyFromAdjacentPoly, createRandomPoly } = require('./poly.js');

const canvas =document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const lineCount = 400
const minimumDistance = 5
const h = canvas.height;
const segments = 70;
const color = 'black';
const variance = 2;
const seedVariance = 5;

let poly;
let painting = {
    contours: []
};

for (let i=0; i < lineCount; i++) {
    if (i === 0) {
        let start = createVertex(i*minimumDistance, 0);
        let end = createVertex(i*minimumDistance, h);
        poly = createRandomPoly(start, end, segments, color, seedVariance, ctx);
    } else {
        poly = createPolyFromAdjacentPoly(poly, i, minimumDistance, color, variance, ctx);
        console.log(poly);
    }
    painting.contours.push(poly);
}

painting.contours.forEach(contour => {
    let startingIndex = Math.floor((contour.lines.length / 2) +  Math.random() * (contour.lines.length / 2)) - 1;

    for (let i = startingIndex; i < contour.lines.length; i++) {
        let line = contour.lines[i];
        line.color = 'white';
    }

    contour.draw();
});
