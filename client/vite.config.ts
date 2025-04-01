import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import useServerAddress from "./useServerAddress";

const { host, port } = useServerAddress();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    // i uncomment lang yung asa baba if want i host sa local network
    //paltan to katulad ng sa backend ip address pero dapat magkaiba sila ng port

    server: {
        host: host,
        port: port,
    },
});
