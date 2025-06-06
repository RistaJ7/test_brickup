import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, Input, DatePicker, Select, Alert } from "antd";
import { formatarDataEnvioBackend } from "../../../services/FormatDateService";
import { adicionarEtapa } from "../../../store/EtapaSlice";

const { Option } = Select;

const AddEtapaEmObra = ({ obraId, onEtapaAdicionada }) => {
    const dispatch = useDispatch();
    const { statusEtapas, errorEtapas } = useSelector((state) => state.etapa);

    const [modalVisible, setModalVisible] = useState(false);
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [form] = Form.useForm();

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const handleCloseFeedback = () => {
        setFeedbackVisible(false);
    };

    const handleSubmit = async (values) => {
        const etapa = {
            obra: { id: obraId },
            nome: values.nome,
            status: values.status,
            responsavel: values.responsavel,
            dataInicio: formatarDataEnvioBackend(values.dataInicio),
            dataFim: formatarDataEnvioBackend(values.dataFim),
        };

        try {
            await dispatch(adicionarEtapa(etapa)).unwrap();
            setFeedbackVisible(true);
        } catch (error) {
            console.error("Erro ao adicionar etapa:", error);
            setFeedbackVisible(true);
        }

        setTimeout(() => {
            handleCloseModal();
            onEtapaAdicionada();
        }, 2000);
    };


    return (
        <>
            <Button type="primary" size="medium" onClick={handleOpenModal}>
                Adicionar Etapa
            </Button>

            <Modal title="Adicionar Etapa" open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Informe o nome da etapa" }]}>
                        <Input placeholder="Nome da etapa" />
                    </Form.Item>

                    <Form.Item label="Status" name="status" rules={[{ required: true, message: "Selecione um status" }]}>
                        <Select placeholder="Selecione um status">
                            <Option value="PENDENTE">Pendente</Option>
                            <Option value="EM_ANDAMENTO">Em Andamento</Option>
                            <Option value="CONCLUIDA">Concluída</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Responsável" name="responsavel" rules={[{ required: true, message: "Informe o responsável" }]}>
                        <Input placeholder="Nome do responsável" />
                    </Form.Item>

                    <Form.Item label="Data de Início" name="dataInicio" rules={[{ required: true, message: "Selecione a data de início" }]}>
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item label="Data de Fim" name="dataFim" rules={[{ required: true, message: "Selecione a data de fim" }]}>
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">Salvar Etapa</Button>
                </Form>
            </Modal>

            <Modal title="Status da Etapa" open={feedbackVisible} onCancel={handleCloseFeedback} footer={null}>
                {statusEtapas === "succeeded" ? (
                    <Alert message="Etapa adicionada com sucesso!" type="success" showIcon />
                ) : statusEtapas === "failed" ? (
                    <Alert message={errorEtapas || "Erro ao adicionar etapa."} type="error" showIcon />
                ) : (
                    <Alert message="Processando..." type="info" showIcon />
                )}
            </Modal>
        </>
    );
};

export default AddEtapaEmObra;

