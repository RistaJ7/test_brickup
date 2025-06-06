import { Form, Input, Button, DatePicker, Modal, Typography, Row, Col } from "antd";
import { formatarDataEnvioBackend } from "../services/FormatDateService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cadastrarObra, fecharModal } from "../store/ObraFormSlice";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import BotaoVoltar from "./components/BackButton";

const { Title } = Typography;

const FormObra = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { modalVisible, modalMessage, isError } = useSelector((state) => state.obraForm);

    const handleSubmit = (values) => {
        const obra = {
            nome: values.nome,
            descricao: values.descricao,
            dataInicio: formatarDataEnvioBackend(values.dataInicio),
            dataPrevisaoFim: formatarDataEnvioBackend(values.dataPrevisaoFim),
        };

        dispatch(cadastrarObra(obra));
    };

    const handleCloseModal = () => {
        dispatch(fecharModal());
        if (!isError) {
            navigate("/");
        }
    };

    return (
        <>
            <Row align="middle" style={{ marginBottom: 24 }}>
                <Col flex="none">
                    <BotaoVoltar />
                </Col>
                <Col flex="auto" style={{ textAlign: "center" }}>
                    <Title level={2} style={{ margin: 0 }}>Cadastrar Nova Obra</Title>
                </Col>
                <Col flex="none" style={{ width: 48 }} /> {/* Espaço para alinhar centralização */}
            </Row>
            <div
                style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 12,
                    padding: 32,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    maxWidth: 650,
                    margin: "0 auto"
                }}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item label="Nome da Obra" name="nome" rules={[{ required: true, message: "Informe o nome da obra" }]}>
                        <Input placeholder="Nome da Obra" />
                    </Form.Item>

                    <Form.Item label="Descrição" name="descricao" rules={[{ required: true, message: "Informe uma descrição" }]}>
                        <Input.TextArea rows={4} placeholder="Descrição da obra" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="Data de Início"
                                name="dataInicio"
                                rules={[{ required: true, message: "Selecione a data de início" }]}
                            >
                                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="Data de Previsão de Conclusão"
                                name="dataPrevisaoFim"
                                rules={[{ required: true, message: "Selecione a data de previsão de fim" }]}
                            >
                                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                    >
                        Cadastrar Obra
                    </Button>
                </Form>
            </div>
            <Modal
                title={isError ? <><ExclamationCircleOutlined style={{ color: "red" }} /> Erro</> : <><CheckCircleOutlined style={{ color: "green" }} /> Sucesso</>}
                open={modalVisible}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                okText="Fechar"
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <p>{modalMessage}</p>
            </Modal>
        </>
    );
};

export default FormObra;
