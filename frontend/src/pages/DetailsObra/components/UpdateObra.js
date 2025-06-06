import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, DatePicker, Button, Alert } from "antd";
import { formatarDataEnvioBackend } from "../../../services/FormatDateService";
import { atualizarObraThunk } from "../../../store/ObraSlice";
import dayjs from "dayjs";

const UpdateObra = ({ obra, visible, onClose, onUpdated }) => {
    const dispatch = useDispatch();
    const { statusObra, errorObra } = useSelector((state) => state.obra);
    const [form] = Form.useForm();

    useEffect(() => {
        if (obra && visible) {
            form.setFieldsValue({
                nome: obra.nome,
                descricao: obra.descricao,
                dataInicio: obra.dataInicio ? dayjs(obra.dataInicio) : null,
                dataPrevisaoFim: obra.dataPrevisaoFim ? dayjs(obra.dataPrevisaoFim) : null,
            });
        }
    }, [obra, visible, form]);

    const handleSubmit = async (values) => {
        const obraAtualizada = {
            ...obra,
            nome: values.nome,
            descricao: values.descricao,
            dataInicio: formatarDataEnvioBackend(values.dataInicio),
            dataPrevisaoFim: formatarDataEnvioBackend(values.dataPrevisaoFim),
            etapas: obra.etapas
        };

        try {
            await dispatch(atualizarObraThunk({ id: obra.id, obra: obraAtualizada })).unwrap();
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar obra:", error);
        }
    };

    return (
        <Modal
            title="Atualizar Obra"
            open={visible}
            onCancel={onClose}
            footer={null}
            unmountOnClose
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Informe o nome da obra" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descrição" name="descricao" rules={[{ required: true, message: "Informe a descrição" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Data de Início" name="dataInicio" rules={[{ required: true, message: "Selecione a data de início" }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item label="Data de Término" name="dataPrevisaoFim" rules={[{ required: true, message: "Selecione a data de término" }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Salvar Alterações
                </Button>
            </Form>
            {statusObra === "failed" && (
                <Alert message={errorObra || "Erro ao atualizar obra."} type="error" showIcon style={{ marginTop: 16 }} />
            )}
        </Modal>
    );
};

export default UpdateObra;