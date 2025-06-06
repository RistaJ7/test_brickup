import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buscarTodasObrasThunk } from "../store/ObraSlice";
import { List, Card, Spin, Alert, Button, Steps, Typography, Row, Col } from "antd";
import { formatarDataExibicao } from "../services/FormatDateService";
import { Link, useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;

const ListObra = () => {
    const dispatch = useDispatch();
    const { obras, status } = useSelector((state) => state.obra);
    const location = useLocation();

    useEffect(() => {
        dispatch(buscarTodasObrasThunk());
    }, [dispatch]);

    return (
        <div style={{ padding: "24px" }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={1} style={{ margin: 0 }}>Obras</Title>
                </Col>
                <Col>
                    <Link
                        to="/createObra"
                        state={{ from: location.pathname }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                        >
                            Criar Nova Obra
                        </Button>
                    </Link>
                </Col>
            </Row>

            {status === "loading" && <Spin size="large" />}
            {status === "failed" && <Alert message="Erro ao carregar obras" type="error" showIcon />}

            {status === "succeeded" && (
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={obras}
                    renderItem={(obra) => {
                        const etapas = obra.etapas || [];

                        const etapasOrdenadas = [...etapas].sort((a, b) => {
                            const statusOrder = {
                                "CONCLUIDA": 0,
                                "EM_ANDAMENTO": 1,
                                "PENDENTE": 2
                            };
                            return statusOrder[a.status] - statusOrder[b.status];
                        });

                        const currentEtapaIndex = etapasOrdenadas.findIndex(etapa => etapa.status === "EM_ANDAMENTO");

                        return (
                            <List.Item>
                                <Card
                                    title={obra.nome}
                                    actions={[
                                        <Link to={`/obraDetails/${obra.id}`} key="details">
                                            <Button type="link">Ver detalhes</Button>
                                        </Link>
                                    ]}
                                >
                                    <p><strong>Autor:</strong> {obra.nome}</p>
                                    <Paragraph
                                        ellipsis={{
                                            rows: 1,
                                            expandable: 'collapsible',
                                        }}
                                        style={{ marginBottom: 8 }}
                                    >
                                        <strong>Descrição:</strong> {obra.descricao}
                                    </Paragraph>
                                    <p><strong>Data início:</strong> {formatarDataExibicao(obra.dataInicio)}</p>
                                    <p><strong>Data previsão fim:</strong> {formatarDataExibicao(obra.dataPrevisaoFim)}</p>
                                    <p><strong>Etapas:</strong> {etapas.length}</p>
                                    {etapasOrdenadas.length > 0 && (
                                        <div
                                            className="custom-scrollbar"
                                            style={{
                                                overflowX: "auto",
                                                maxWidth: "100%",
                                                paddingBottom: 8
                                            }}
                                        >
                                            <div style={{ minWidth: 350, width: "max-content" }}>
                                                <Steps
                                                    style={{ marginTop: 8 }}
                                                    type="inline"
                                                    current={currentEtapaIndex !== -1 ? currentEtapaIndex : 0}
                                                    items={etapasOrdenadas.map(etapa => ({
                                                        title: etapa.nome,
                                                        description: etapa.descricao,
                                                        status: etapa.status === "EM_ANDAMENTO" ? "process" : etapa.status === "CONCLUIDA" ? "finish" : "wait"
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </List.Item>
                        );
                    }}
                />
            )}
        </div>
    );
};

export default ListObra;
