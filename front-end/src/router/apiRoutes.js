const apiRoutes = {
    auth: {
        signInWithEmail: () => "/api/auth/sign-in-with-email",
        confirmSignInWithEmail: () => "/api/auth/sign-in-with-email/confirm",
        getCurrentUser: () => "/api/auth/current-user",
        signInWithToken: () => "/api/auth/sign-in-with-token",
        refreshToken: () => "/api/auth/refresh-token",
    },
    task: {
        show: (id) => `/api/tasks/${id}`,
        index: () => "/api/tasks",
    },
    userSolution: {
        create: () => "/api/user-solutions",
    },
};

export default apiRoutes;
