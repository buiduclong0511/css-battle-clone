const webRoutes = {
    signIn: () => "/sign-in",
    confirmSignInWithEmail: () => "/confirm-sign-in",
    home: () => "/",
    dailyTargets: () => "/daily-targets",
    battles: () => "/battles",
    leaderBoard: () => "/leader-board",
    learnCss: () => "/learn-css",
    task: (id) => `/tasks/${id}`,
    profile: () => "/profile",
    stats: () => "/stats",
    settings: () => "/settings",
};

export default webRoutes;
