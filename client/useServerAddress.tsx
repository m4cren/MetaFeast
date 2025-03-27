const useServerAddress = () => {
    const host = "192.168.1.33";

    const server = `http://${host}:8080`;
    return { server, host };
};

export default useServerAddress;
