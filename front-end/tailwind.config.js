/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                brand: "rgb(255, 223, 0)",
            },
            backgroundColor: {
                primary: "#07080b",
                button: "rgb(50, 63, 74)",
                "button-hover": "#43515e",
                "online-signal": "#ffdf00",
                "sidebar-item-badge": "rgba(255, 223, 0, 0.15)",
                "section-heading": "#101217",
                input: "#0f1117",
                "login-or-divider": "#323f4a",
            },
            backdropBlur: {
                header: "20px",
            },
            backgroundImage: {
                header: "linear-gradient(to right, rgb(24, 29, 35) 50%, rgba(0, 0, 0, 0))",
                sidebar:
                    "linear-gradient(175deg, rgb(29, 35, 43) 0px, rgba(24, 29, 35, 0.7) 85%)",
                "sidebar-item-active":
                    "linear-gradient(95.67deg, rgb(53, 63, 73) 0px, rgba(53, 63, 73, 0) 92.54%)",
                panel: "linear-gradient(94.5deg,rgba(29,35,43,.75) 0.19%,rgba(24,29,35,.563))",
                "login-bottom": "url('/images/login-bottom.png')",
                "login-fade-before":
                    "linear-gradient(to right,#07080b,transparent)",
                "login-fade-after":
                    "linear-gradient(to left,#07080b,transparent)",
            },
            boxShadow: {
                "online-signal":
                    "rgba(255, 223, 0, 0.098) 0px 0px 0px 8.58793px",
                "sidebar-item-badge":
                    "inset 1px 1px 2px rgba(255, 223, 0, 0.2)",
                panel: "0 0 30px rgba(255,223,0,0),0px 20px 50px rgba(0,0,0,.2),inset 1px 1px 3px hsla(0,0%,100%,.1)",
            },
            textColor: {
                primary: "#a0b3c6",
                secondary: "#6b7b8e",
                heading: "#eff5fb",
                highlight: "#eff5fb",
                "button-label": "#fff",
                "online-number": "#cbd1e1",
            },
            borderColor: {
                sidebar: "#20262e",
                input: "#323f4a",
            },
            width: {
                sidebar: "218px",
            },
            height: {
                header: "60px",
                footer: "40px",
            },
            padding: {
                "main-layout": "60px",
                panel: "32px",
            },
            animation: {
                "online-signal": "pulse 2s infinite",
            },
            keyframes: {
                pulse: {
                    "0%": {
                        transform: "scale(.75)",
                        "box-shadow": "0 0 0 0 rgba(255, 223, 0, 0.7)",
                    },
                    "70%": {
                        transform: "scale(1)",
                        "box-shadow": "0 0 0 10px rgba(255, 223, 0, 0)",
                    },
                    "100%": {
                        transform: "scale(0.75)",
                        "box-shadow": "0 0 0 0 rgba(255, 223, 0, 0)",
                    },
                },
            },
        },
    },
    plugins: [],
};
