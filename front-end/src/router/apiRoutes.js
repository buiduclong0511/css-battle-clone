const apiRoutes = {
    auth: {
        signInWithEmail: () => "/api/auth/sign-in-with-email",
        confirmSignInWithEmail: () => "/api/auth/sign-in-with-email/confirm",
        getCurrentUser: () => "/api/auth/current-user",
        signInWithToken: () => "/api/auth/sign-in-with-token",
    },
    challenge: {
        show: (id) => `/challenges/${id}`,
    },
};

export default apiRoutes;
