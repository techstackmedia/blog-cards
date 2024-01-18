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

const defaultThemeValue = {
    toggleDarkMode: () => { },
    isDark: false,
};

const defaultBlogBookmarkValue = {
    bookMark: null,
    errorDelete: null,
    successDelete: null,
    isDeleteLoading: false,
    prevPage: () => { },
    nextPage: () => { },
    handleArticleNav: () => { },
    deleteBookmark: () => { },
    pageCount: null,
    pageIndex: 1,
};

const defaultAuthContext = {
    isRegisterLoading: false,
    userRegister: null,
    handleRegisterChange: () => { },
    handleRegisterSubmit: () => { },
    inputRegisterEmailUsenameError: null,
    inputRegisterPasswordError: null,
    isLoginLoading: false,
    userLogin: null,
    handleLoginChange: () => { },
    handleLoginSubmit: () => { },
    inputLoginEmailUsenameError: null,
    inputLoginPasswordError: null,
    authToken: null,
};

export {
    defaultBlogValue,
    defaultBlogDetailValue,
    defaultThemeValue,
    defaultBlogBookmarkValue,
    defaultAuthContext,
};
