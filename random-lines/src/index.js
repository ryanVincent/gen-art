const createVertex = require('./vertex.js');
const { createPolyFromAdjacentPoly, createRandomPoly } = require('./poly.js');

const canvas =document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const lineCount = 400
const minimumDistance = 10
const h = canvas.height;
const segments = 50;
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
        poly = createPolyFromAdjacentPoly(poly, i, minimumDistance, color, variance, seedVariance, segments, ctx);
        console.log(poly);
    }
    painting.contours.push(poly);
    poly.draw();
}
