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
    for(let i = 0;i< segs;i++) {
        let x = start.x;
        let prevLine = line;
        var direction = Math.floor(Math.random() * 2 - 1);
        let lineStart;

        if (prevLine) {
            lineStart = Object.assign({}, prevLine.end);
        }
        else {
            lineStart = createVertex(x, start.y + (segLength * i));
        }
        let lineEnd = createVertex(x  + (direction * Math.random() * variance), segLength * i + segLength);
        line = createLine(lineStart, lineEnd, color, ctx);
        lines.push(line);

    }

    return createPoly(lines, color, ctx);
}

const createPolyFromAdjacentPoly = (poly, i, minimumDistance, color, variance, ctx) => {

    return createPoly(poly.lines.reduce((newLines, line, i) => {
        let start;
        let dx = getDistance(minimumDistance);
        if (i == 0) {
            start = createVertex(line.start.x + dx, 0, ctx);
        }
        else {
            start = createVertex(newLines[i-1].end.x , newLines[i-1].end.y, ctx);
        }
        let end = createVertex(line.end.x + getDistance(minimumDistance), line.end.y  + Math.random() * variance - (variance / 2), ctx);
        if (end.y <= start.y) {
            end.y = start.y + Math.random() * variance;
        }
        return [...newLines, createLine(start, end, line.color, ctx)];
    }, []), color, ctx)
}

module.exports = {
    createPoly,
    createPolyFromAdjacentPoly,
    createRandomPoly
}
