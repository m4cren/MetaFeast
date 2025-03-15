import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    // i uncomment lang yung asa baba if want i host sa local network
    //paltan to katulad ng sa backend ip address pero dapat magkaiba sila ng port

    server: {
        host: "192.168.1.35",
        port: 1555,
    },
});
