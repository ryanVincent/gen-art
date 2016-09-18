const lineProto = {
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }
}

const createLine = (start, end, color, ctx) => {
    return Object.create(lineProto, {
        start: {
            value: start
        },
        end: {
            value: end
        },
        color: {
            value: color || '#000',
            writable: true
        },
        ctx: {
            value: ctx
        }
    })
}

module.exports = createLine;
