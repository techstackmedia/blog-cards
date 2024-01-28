const countWords = (content) => {
    const words = content?.split(/\s+/);
    return words?.length;
};

const calculateReadingTime = (wordCount, wordsPerMinute) => {
    const minutes = wordCount / wordsPerMinute;
    return Math.ceil(minutes);
};

const contentTruncate = (descriptions) => {
    const textArray = descriptions
        ?.map((paragraph) => {
            return paragraph.children.map((child) => {
                if (child.text) {
                    return child.text;
                } else if (child.children) {
                    return child.children.map((item) => item.text);
                } else {
                    return child.url;
                }
            });
        })
        .join(' ')
        .split(' ');
    const truncatedWords =
        textArray?.length > 50
            ? `${textArray
                .splice(0, 40)
                .join(' ')
                .replaceAll(' ,', ' ')
                .replaceAll(',,', ',')}...`
            : `${textArray?.join(' ').replaceAll(' ,', ' ').replaceAll(',,', ',')}`;

    const content = textArray?.join(' ');

    return { truncatedWords, content };
};

export { countWords, calculateReadingTime, contentTruncate };
