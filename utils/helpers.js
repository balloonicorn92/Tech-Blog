module.exports = {
    plural_format: (word, amount) => {
        if (amount != 1) {
            return `${word}s`
        }
        return word;
    }
}