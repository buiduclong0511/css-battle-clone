const apiRoutes = {
    auth: {
        signInWithEmail: () => "/api/auth/sign-in-with-email",
        confirmSignInWithEmail: () => "/api/auth/sign-in-with-email/confirm",
        getCurrentUser: () => "/api/auth/current-user",
        signInWithToken: () => "/api/auth/sign-in-with-token",
    },
    task: {
        show: (id) => `/api/tasks/${id}`,
        index: () => "/api/tasks",
    },
};

export default apiRoutes;
