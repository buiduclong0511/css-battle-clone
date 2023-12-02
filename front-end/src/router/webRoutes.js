const webRoutes = {
    auth: {
        signIn: () => "/sign-in",
    },
    public: {
        home: () => "/",
        dailyTargets: () => "/daily-targets",
        battles: () => "/battles",
        leaderBoard: () => "/leader-board",
        learnCss: () => "/learn-css",
        challenge: (id) => `/challenges/${id}`,
    },
};

export default webRoutes;
