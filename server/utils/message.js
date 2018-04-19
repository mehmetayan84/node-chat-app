var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

var generateLocationMessage = (from, lattitude, longitude) => {
    return {
        from,
        url: `https://www.google.com.tr/maps?q=${lattitude},${longitude}`,
        createdAt: new Date().getTime()
    }
};

module.exports = {generateMessage, generateLocationMessage};