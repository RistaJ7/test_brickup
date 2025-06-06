import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Alert, Row, Col, Table, Typography, Progress, Button, Popconfirm, message } from "antd";
import { formatarDataExibicao } from "../../services/FormatDateService";
import { buscarObraPorIdThunk, buscarQuantEtapasConcluidasObraThunk } from "../../store/ObraSlice";
import AddEtapaEmObra from "./components/AddEtapaEmObra";
import BotaoVoltar from "../components/BackButton";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateEtapaModal from "./components/UpdateEtapa";
import UpdateObraModal from "./components/UpdateObra";

const { Title, Paragraph } = Typography;

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
    const [modalUpdateObraVisible, setModalUpdateObraVisible] = useState(false);

    useEffect(() => {
        dispatch(buscarObraPorIdThunk(id));
        dispatch(buscarQuantEtapasConcluidasObraThunk(id));
    }, [id, dispatch]);

    const handleEtapaAdicionada = () => {
        dispatch(buscarObraPorIdThunk(id));
        dispatch(buscarQuantEtapasConcluidasObraThunk(id));
    };

    const handleOpenUpdateModal = (etapa) => {
        setEtapaSelecionada(etapa);
        setModalUpdateVisible(true);
    };

    const handleCloseUpdateModal = () => {
        setModalUpdateVisible(false);
        setEtapaSelecionada(null);
    };

    const handleOpenUpdateObraModal = () => setModalUpdateObraVisible(true);
    const handleCloseUpdateObraModal = () => setModalUpdateObraVisible(false);

    const handleDeleteEtapa = (etapa) => {
        // Aqui você deve despachar a ação para remover a etapa
        // Exemplo:
        // dispatch(removerEtapa(etapa.id)).then(() => handleEtapaAdicionada());
        message.success("Etapa excluída com sucesso!");
    };

    if (statusObra === "loading") return <Spin size="large" />;
    if (statusObra === "failed") return <Alert message={errorObra} type="error" showIcon />;
    if (!obraSelecionada) return <Alert message="Obra não encontrada." type="warning" showIcon />;

    return (
        <div style={{ padding: "24px" }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <BotaoVoltar />
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleOpenUpdateObraModal}
                    >
                        Atualizar Obra
                    </Button>
                </Col>
            </Row>
            <Title level={2}>{obraSelecionada.nome}</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: "20px", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
                <Col span={6}>
                    <strong>Descrição:</strong>
                    <Paragraph
                        ellipsis={{
                            rows: 2,
                            expandable: 'collapsible',
                        }}
                        style={{ marginBottom: 0 }}
                    >
                        {obraSelecionada.descricao}
                    </Paragraph>
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
                    <strong>Progresso da Obra:</strong>
                    <div style={{ marginTop: 8 }}>
                        {statusQuantEtapas === "loading" ? (
                            <Spin />
                        ) : (
                            <Progress type="circle" percent={quantEtapasConcluidas || 0} />
                        )}
                    </div>
                </Col>
            </Row>

            <Row justify="end">
                <Col>
                    <AddEtapaEmObra obraId={obraSelecionada.id} onEtapaAdicionada={handleEtapaAdicionada} />
                </Col>
            </Row>

            <Title level={3} style={{ marginTop: 0 }}>Etapas da Obra</Title>
            {obraSelecionada.etapas?.length > 0 ? (
                <>
                    <Table
                        dataSource={obraSelecionada.etapas}
                        rowKey="nome"
                        pagination={{ pageSize: 4 }}
                        bordered
                        columns={[
                            { title: "Nome", dataIndex: "nome", key: "nome", align: "center" },
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
                                title: "Atualizar Etapa",
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
                            {
                                title: "Excluir Etapa",
                                key: "excluir",
                                align: "center",
                                render: (_, etapa) => (
                                    <Popconfirm
                                        title="Tem certeza que deseja excluir esta etapa?"
                                        onConfirm={() => handleDeleteEtapa(etapa)}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Button danger icon={<DeleteOutlined />} >
                                            Excluir
                                        </Button>
                                    </Popconfirm>
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
            <UpdateObraModal
                obra={obraSelecionada}
                visible={modalUpdateObraVisible}
                onClose={handleCloseUpdateObraModal}
                onUpdated={handleEtapaAdicionada}
            />
        </div>
    );
};

export default ObraDetails;

