var canvas =document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var lineCount = 400
var minimumDistance = 3
var h = canvas.height;


const createVertex = (x, y) => ({x,y});

const lineProto = {
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.stroke();
    }
}

createLine = (start, end, ctx) => {
    return Object.create(lineProto, {
        start: {
            value: start
        },
        end: {
            value: end
        },
        ctx: {
            value: ctx
        }
    })
}


const polyProto = {
    draw() {
        this.lines.forEach(segement => segement.draw());
    }
}

createPoly = (lines, ctx) => {
    return Object.create(polyProto, {
        lines: {
            value: lines
        },
        ctx: {
            value: ctx
        }
    });
}


getRandomPoly = (start, end, ctx) => {
    var segs = 10;
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
        let lineEnd = createVertex(x  + (direction * Math.random() * 20), segLength * i + segLength);
        line = createLine(lineStart, lineEnd, ctx);
        lines.push(line);

    }

    return createPoly(lines, ctx);

}


for (let i=0; i < lineCount; i++) {
    let start = createVertex(i*minimumDistance, 0);
    let end = createVertex(i*minimumDistance, h);
    let poly = getRandomPoly(start, end, ctx);
    poly.draw();
}
