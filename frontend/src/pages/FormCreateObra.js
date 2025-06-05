import { Form, Input, Button, DatePicker, Modal } from "antd";
import { formatarDataEnvioBackend } from "../services/FormatDateService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cadastrarObra, fecharModal } from "../store/ObraFormSlice";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import BotaoVoltar from "../components/BackButton";

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
            <BotaoVoltar />
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Nome da Obra" name="nome" rules={[{ required: true, message: "Informe o nome da obra" }]}>
                    <Input placeholder="Nome da Obra" />
                </Form.Item>

                <Form.Item label="Descrição" name="descricao" rules={[{ required: true, message: "Informe uma descrição" }]}>
                    <Input.TextArea rows={4} placeholder="Descrição da obra" />
                </Form.Item>

                <Form.Item label="Data de Início" name="dataInicio" rules={[{ required: true, message: "Selecione a data de início" }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item label="Data de Previsão de Conclusão" name="dataPrevisaoFim" rules={[{ required: true, message: "Selecione a data de previsão de fim" }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                >
                    Cadastrar Obra
                </Button>
            </Form>

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
