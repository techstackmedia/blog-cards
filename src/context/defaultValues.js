const defaultBlogValue = {
    prevPage: () => { },
    nextPage: () => { },
    pageCount: 1,
    handleArticleNav: () => { },
    restaurants: null,
    pageIndex: 1,
};

const defaultBlogDetailValue = {
    renderHTML: () => ({ __html: '' }),
    getRestaurantsPost: () => { },
};

export { defaultBlogValue, defaultBlogDetailValue };
