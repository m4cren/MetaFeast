const useServerAddress = () => {
    const host = "192.168.137.181";
    const port = 1555;

    const server = `http://${host}:8080`;
    return { server, host, port };
};

export default useServerAddress;
