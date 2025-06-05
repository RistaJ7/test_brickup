const formatarDataExibicao = (data) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
};

const formatarDataEnvioBackend = (data) => {
    return new Intl.DateTimeFormat("en-CA").format(new Date(data));
};

export { formatarDataExibicao ,  formatarDataEnvioBackend};