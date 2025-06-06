const formatarDataExibicao = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
};

const formatarDataEnvioBackend = (data) => {
    return new Intl.DateTimeFormat("en-CA").format(new Date(data));
};

export { formatarDataExibicao ,  formatarDataEnvioBackend};