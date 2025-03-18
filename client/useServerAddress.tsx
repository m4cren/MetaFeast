const useServerAddress = () => {
    const host = "192.168.1.4";

    const server = `http://${host}:6969`;
    return { server, host };
};

export default useServerAddress;
