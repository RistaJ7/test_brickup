import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchObras } from "../store/ObraSlice";
import { List, Card, Spin, Alert, Button, Steps } from "antd";
import { formatarDataExibicao } from "../services/FormatDateService";
import { Link, useLocation } from "react-router-dom";

const ListObra = () => {
    const dispatch = useDispatch();
    const { obras, status } = useSelector((state) => state.obra);
    const location = useLocation();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchObras());
        }
    }, [status, dispatch]);

    return (
        <div style={{ padding: "24px" }}>
            <h1>Obras</h1>

            {status === "loading" && <Spin size="large" />}
            {status === "failed" && <Alert message="Erro ao carregar obras" type="error" showIcon />}

            {status === "succeeded" && (
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={obras}
                    renderItem={(obra) => {
                        const etapas = obra.etapas || [];
                        const currentEtapaIndex = etapas.findIndex(etapa => etapa.status === "em andamento");

                        return (
                            <List.Item>
                                <Link to={`/obraDetails/${obra.id}`}>
                                    <Card title={obra.nome}>
                                        <p><strong>Autor:</strong> {obra.nome}</p>
                                        <p><strong>Descrição:</strong> {obra.descricao}</p>
                                        <p><strong>Data início:</strong> {formatarDataExibicao(obra.dataInicio)}</p>
                                        <p><strong>Data previsão fim:</strong> {formatarDataExibicao(obra.dataPrevisaoFim)}</p>

                                        {etapas.length > 0 && (
                                            <Steps
                                                style={{ marginTop: 8 }}
                                                type="inline"
                                                current={currentEtapaIndex !== -1 ? currentEtapaIndex : 0}
                                                items={etapas.map(etapa => ({
                                                    title: etapa.nome,
                                                    description: etapa.descricao,
                                                    status: etapa.status === "EM_ANDAMENTO" ? "process" : etapa.status === "CONCLUIDA" ? "finish" : "wait"
                                                }))}
                                            />
                                        )}
                                    </Card>
                                </Link>
                            </List.Item>
                        );
                    }}
                />
            )}
            <Link
                to="/createObra"
                state={{ from: location.pathname }}>
                <Button
                    type="primary"
                    size="large"
                >
                    Criar Obra
                </Button>
            </Link>
        </div>
    );
};

export default ListObra;
