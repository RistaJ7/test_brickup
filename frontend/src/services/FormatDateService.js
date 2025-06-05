const formatarData = (data) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
};

export default formatarData;