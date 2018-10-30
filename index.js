const data = require('./data/build.json');

class Wash {
    /**
     * Creates a new instance of WashYourMouthOutWithSoap.
     * @constructor
     */
    constructor () {
        this.locales = Object.keys(data);
    }

    static clean (phrase) {
        return phrase
            .toLowerCase()
            .replace(/[\s+]+/g, ' ');
    }

    static tokenize (phrase) {
        const withPunctuation = phrase
            .replace('/ {2,}/', ' ')
            .split(' ');
        const withoutPunctuation = phrase
            .replace(/[^\w\s]/g, '')
            .replace('/ {2,}/', ' ')
            .split(' ');

        return withPunctuation.concat(withoutPunctuation);
    }

    /**
     * Returns an array of supported locales.
     * @return {array} Array of ISO-X-X locales.
     */
    supported () {
        return this.locales;
    }

    /**
     * Returns an array of bad words for the specified locale.
     * @param  {string} locale ISO-X-X locale code
     * @return {Array}         Array of bad words
     */
    words (locale) {
        return data[locale];
    }

    /**
     * Checks an arbitrary input string against the bad word list for the
     * specified locale.
     * @param  {string} locale ISO-X-X locale code
     * @param  {string} phase  Input phrase
     * @return {boolean}       Does the phrase contain a bad word?
     */
    check (locale, phrase) {
        // Check to see if locale is supported. If not, return false.
        if (typeof data[locale] === 'undefined') return false;

        // Clean and tokenize user input
        const tokens = Wash.tokenize(Wash.clean(phrase));

        // Check against list
        for (let i in tokens) {
            if (this.words(locale).indexOf(tokens[i]) !== -1) return true;
        }

        return false;
    }
}

module.exports = new Wash();
