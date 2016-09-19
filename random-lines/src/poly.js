const createVertex = require('./vertex.js');
const createLine = require('./line.js');
const { getDistance } = require('./utils.js');

const polyProto = {
    draw() {
        this.lines.forEach(segement => segement.draw());
    }
}

const createPoly = (lines, color, ctx) => {
    return Object.create(polyProto, {
        lines: {
            value: lines
        },
        color: {
            value: color || '#000'
        },
        ctx: {
            value: ctx
        }
    });
}

const createRandomPoly = (start, end, segs, color, variance, ctx) => {
    var segLength = end.y / segs;
    var lines = [];
    let line;
    let prevLine;
    for(let i = 0;i< segs;i++) {

        if (prevLine) {
            lineStart = Object.assign({}, prevLine.end);
        } else {
            lineStart = createVertex(start.x, start.y);
        }
        line = createRandomLineFromPoint(lineStart.x, lineStart.y, segLength, prevLine, variance, color, i, ctx);
        prevLine = line;
        lines.push(line);

    }

    return createPoly(lines, color, ctx);
}

const createRandomLineFromPoint = (startX, startY, segLength, prevLine, variance, color, i , ctx) => {
    let x = startX;
    var direction = Math.random() * 2 - 1;
    let lineStart = createVertex(x, startY);
    let lineEnd = createVertex(x  + (direction * Math.random() * variance), startY + segLength);
    console.log((direction * Math.random() * variance));
    return createLine(lineStart, lineEnd, color, ctx);
}

const createPolyFromAdjacentPoly = (poly, i, minimumDistance, color, variance, seedVariance, maxSegs, ctx) => {
    var segLength = 20;
    let segs = maxSegs - (Math.random() * (maxSegs * 0.66));
    // let segs = Math.random() * maxSegs;

    let lines = [];
    for (let i = 0; i < maxSegs; i++) {
        let adjacentLine = poly.lines[i];
        let previousLine = lines[i-1]
        let start;
        let dx = getDistance(minimumDistance);

        if (i > segs) {
            break;
        }

        if (!adjacentLine) {
            lines.push(createRandomLineFromPoint(previousLine.end.x, previousLine.end.y, segLength, previousLine, seedVariance, color, i, ctx));
            continue;
        }

        if (i == 0) {
            start = createVertex(adjacentLine.start.x + dx, 0, ctx);
        } else {
            start = createVertex(previousLine.end.x , previousLine.end.y, ctx);
        }
        let end = createVertex(adjacentLine.end.x + getDistance(minimumDistance), adjacentLine.end.y  + Math.random() * variance - (variance / 2), ctx);
        if (end.y <= start.y) {
            end.y = start.y + Math.random() * variance;
        }

        lines.push(createLine(start, end, color, ctx));
    }

    return createPoly(lines, color, ctx);
}

module.exports = {
    createPoly,
    createPolyFromAdjacentPoly,
    createRandomPoly
}
