/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const createVertex = __webpack_require__(1);
	const { createPolyFromAdjacentPoly, createRandomPoly } = __webpack_require__(2);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	const createVertex = (x, y) => ({x,y});

	module.exports = createVertex;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const createVertex = __webpack_require__(1);
	const createLine = __webpack_require__(3);
	const { getDistance } = __webpack_require__(4);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const getDistance = (minimumDistance) => {
	    return minimumDistance + Math.random() * (minimumDistance / 2) - (minimumDistance / 4);
	}

	module.exports = {
	    getDistance: getDistance
	};


/***/ }
/******/ ]);