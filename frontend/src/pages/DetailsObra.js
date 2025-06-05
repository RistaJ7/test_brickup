import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Alert, Row, Col, Table, Typography } from "antd";
import { formatarDataExibicao } from "../services/FormatDateService";
import { fetchObraById } from "../store/ObraSlice";

const { Title } = Typography;

const ObraDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { obraSelecionada, statusObra, errorObra } = useSelector((state) => state.obra);

    useEffect(() => {
        dispatch(fetchObraById(id));
    }, [id, dispatch]);

    if (statusObra === "loading") return <Spin size="large" />;
    if (statusObra === "failed") return <Alert message={errorObra} type="error" showIcon />;
    if (!obraSelecionada) return <Alert message="Obra não encontrada." type="warning" showIcon />;

    return (
        <div style={{ padding: "24px" }}>
            {/* Título da Obra */}
            <Title level={2}>{obraSelecionada.nome}</Title>

            {/* Header com três colunas */}
            <Row gutter={[16, 16]} style={{ marginBottom: "20px", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
                <Col span={8}>
                    <strong>Descrição:</strong>
                    <p>{obraSelecionada.descricao}</p>
                </Col>
                <Col span={8}>
                    <strong>Data de Início:</strong>
                    <p>{formatarDataExibicao(obraSelecionada.dataInicio)}</p>
                </Col>
                <Col span={8}>
                    <strong>Data de Término:</strong>
                    <p>{formatarDataExibicao(obraSelecionada.dataPrevisaoFim)}</p>
                </Col>
            </Row>

            {/* Tabela de Etapas */}
            {obraSelecionada.etapas?.length > 0 ? (
                <>
                    <Title level={3}>Etapas da Obra</Title>
                    <Table
                        dataSource={obraSelecionada.etapas}
                        rowKey="nome"
                        pagination={{ pageSize: 5 }}
                        bordered
                        columns={[
                            { title: "Nome", dataIndex: "nome", key: "nome" },
                            {
                                title: "Status", dataIndex: "status", key: "status", render: (status) => (
                                    <span style={{ color: status === "EM_ANDAMENTO" ? "orange" : status === "CONCLUIDA" ? "green" : "gray" }}>
                                        {status.replace("_", " ")}
                                    </span>
                                )
                            },
                            { title: "Responsável", dataIndex: "responsavel", key: "responsavel" },
                            { title: "Data de Início", dataIndex: "dataInicio", key: "dataInicio", render: formatarDataExibicao },
                            { title: "Data de Fim", dataIndex: "dataFim", key: "dataFim", render: formatarDataExibicao },
                        ]}
                    />
                </>
            ) : (
                <Alert message="Nenhuma etapa encontrada para esta obra." type="info" showIcon />
            )}
        </div>
    );
};

export default ObraDetails;
