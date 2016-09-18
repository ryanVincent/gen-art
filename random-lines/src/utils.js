const getDistance = (minimumDistance) => {
    return minimumDistance + Math.random() * (minimumDistance / 2) - (minimumDistance / 4);
}

module.exports = {
    getDistance: getDistance
};
