const countWords = (content) => {
    const words = content.split(/\s+/);
    return words.length;
};

const calculateReadingTime = (wordCount, wordsPerMinute) => {
    const minutes = wordCount / wordsPerMinute;
    return Math.ceil(minutes);
};

export { countWords, calculateReadingTime };
