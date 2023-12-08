import env from "~/utils/env";

const config = {
    api: {
        baseUrl: env.string("REACT_APP_API_BASE_URL", "http://localhost:8080"),
    },
    firebase: {
        apiKey: "AIzaSyA8HC-ThMxX131sgcwKelEniyLvBndvSXk",
        authDomain: "css-battle-clone.firebaseapp.com",
        projectId: "css-battle-clone",
        storageBucket: "css-battle-clone.appspot.com",
        messagingSenderId: "964995637410",
        appId: "1:964995637410:web:c0076aa62114899a64b7fb",
        measurementId: "G-2MB9SGQHS3",
    },
};

export default config;
