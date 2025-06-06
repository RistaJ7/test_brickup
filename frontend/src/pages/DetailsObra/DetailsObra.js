import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Alert, Row, Col, Table, Typography, Progress, Button } from "antd";
import { formatarDataExibicao } from "../../services/FormatDateService";
import { fetchObraById, fetchQuantEtapasConcluidasObra } from "../../store/ObraSlice";
import AddEtapaEmObra from "./components/AddEtapaEmObra";
import BotaoVoltar from "../components/BackButton";
import { ReloadOutlined } from "@ant-design/icons";
import UpdateEtapaModal from "./components/UpdateEtapaModal";

const { Title } = Typography;

const ObraDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        obraSelecionada,
        statusObra,
        errorObra,
        quantEtapasConcluidas,
        statusQuantEtapas
    } = useSelector((state) => state.obra);

    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [etapaSelecionada, setEtapaSelecionada] = useState(null);

    useEffect(() => {
        dispatch(fetchObraById(id));
        dispatch(fetchQuantEtapasConcluidasObra(id));
    }, [id, dispatch]);

    const handleEtapaAdicionada = () => {
        dispatch(fetchObraById(id));
        dispatch(fetchQuantEtapasConcluidasObra(id));
    };

    const handleOpenUpdateModal = (etapa) => {
        setEtapaSelecionada(etapa);
        setModalUpdateVisible(true);
    };

    const handleCloseUpdateModal = () => {
        setModalUpdateVisible(false);
        setEtapaSelecionada(null);
    };

    if (statusObra === "loading") return <Spin size="large" />;
    if (statusObra === "failed") return <Alert message={errorObra} type="error" showIcon />;
    if (!obraSelecionada) return <Alert message="Obra não encontrada." type="warning" showIcon />;

    return (
        <div style={{ padding: "24px" }}>
            <BotaoVoltar />
            <Title level={2}>{obraSelecionada.nome}</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: "20px", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
                <Col span={6}>
                    <strong>Descrição:</strong>
                    <p>{obraSelecionada.descricao}</p>
                </Col>
                <Col span={6}>
                    <strong>Data de Início:</strong>
                    <p>{formatarDataExibicao(obraSelecionada.dataInicio)}</p>
                </Col>
                <Col span={6}>
                    <strong>Data de Término:</strong>
                    <p>{formatarDataExibicao(obraSelecionada.dataPrevisaoFim)}</p>
                </Col>
                <Col span={6} style={{ textAlign: "center" }}>
                    <strong>Progresso das Etapas:</strong>
                    <div style={{ marginTop: 8 }}>
                        {statusQuantEtapas === "loading" ? (
                            <Spin />
                        ) : (
                            <Progress type="circle" percent={quantEtapasConcluidas || 0} />
                        )}
                    </div>
                </Col>
            </Row>

            <Row justify="end" style={{ marginBottom: "16px" }}>
                <Col>
                    <AddEtapaEmObra obraId={obraSelecionada.id} onEtapaAdicionada={handleEtapaAdicionada} />
                </Col>
            </Row>

            {obraSelecionada.etapas?.length > 0 ? (
                <>
                    <Title level={3}>Etapas da Obra</Title>
                    <Table
                        dataSource={obraSelecionada.etapas}
                        rowKey="nome"
                        pagination={{ pageSize: 5 }}
                        bordered
                        columns={[
                            { title: "Nome", dataIndex: "nome", key: "nome" , align: "center" },
                            {
                                title: "Status", dataIndex: "status", key: "status", render: (status) => (
                                    <span style={{ color: status === "EM_ANDAMENTO" ? "orange" : status === "CONCLUIDA" ? "green" : "gray" }}>
                                        {status.replace("_", " ")}
                                    </span>
                                ), align: "center"
                            },
                            { title: "Responsável", dataIndex: "responsavel", key: "responsavel", align: "center" },
                            { title: "Data de Início", dataIndex: "dataInicio", key: "dataInicio", render: formatarDataExibicao, align: "center" },
                            { title: "Data de Fim", dataIndex: "dataFim", key: "dataFim", render: formatarDataExibicao, align: "center" },
                            {
                                title: "Ações",
                                key: "acoes",
                                align: "center",
                                render: (_, etapa) => (
                                    <Button
                                        icon={<ReloadOutlined />}
                                        onClick={() => handleOpenUpdateModal(etapa)}
                                    >
                                        Atualizar
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </>
            ) : (
                <Alert message="Nenhuma etapa encontrada para esta obra." type="info" showIcon />
            )}
            <UpdateEtapaModal
                etapa={etapaSelecionada}
                visible={modalUpdateVisible}
                onClose={handleCloseUpdateModal}
                onUpdated={handleEtapaAdicionada}
            />
        </div>
    );
};

export default ObraDetails;

