const webRoutes = {
    signIn: () => "/sign-in",
    confirmSignInWithEmail: () => "/confirm-sign-in",
    home: () => "/",
    dailyTargets: () => "/daily-targets",
    battles: () => "/battles",
    leaderBoard: () => "/leader-board",
    learnCss: () => "/learn-css",
    challenge: (id) => `/challenges/${id}`,
};

export default webRoutes;
