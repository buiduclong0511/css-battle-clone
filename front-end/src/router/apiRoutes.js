const apiRoutes = {
    auth: {
        signInWithEmail: () => "/api/auth/sign-in-with-email",
        confirmSignInWithEmail: () => "/api/auth/sign-in-with-email/confirm",
    },
    challenge: {
        show: (id) => `/challenges/${id}`,
    },
};

export default apiRoutes;
