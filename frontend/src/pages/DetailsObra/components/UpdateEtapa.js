import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, DatePicker, Select, Button, Alert } from "antd";
import { formatarDataEnvioBackend } from "../../../services/FormatDateService";
import { atualizarEtapaThunk } from "../../../store/EtapaSlice";
import dayjs from "dayjs";

const { Option } = Select;

const UpdateEtapa = ({ etapa, visible, onClose, onUpdated }) => {
    const dispatch = useDispatch();
    const { statusEtapas, errorEtapas } = useSelector((state) => state.etapa);
    const [form] = Form.useForm();

    useEffect(() => {
        if (etapa && visible) {
            form.setFieldsValue({
                nome: etapa.nome,
                status: etapa.status,
                responsavel: etapa.responsavel,
                dataInicio: etapa.dataInicio ? dayjs(etapa.dataInicio) : null,
                dataFim: etapa.dataFim ? dayjs(etapa.dataFim) : null,
            });
        }
    }, [etapa, visible, form]);

    const handleSubmit = async (values) => {
        const etapaAtualizada = {
            nome: values.nome,
            status: values.status,
            responsavel: values.responsavel,
            dataInicio: formatarDataEnvioBackend(values.dataInicio),
            dataFim: formatarDataEnvioBackend(values.dataFim),
            obra: { id: etapa.obra.id }
        };

        try {
            await dispatch(atualizarEtapaThunk({ id: etapa.id, etapa: etapaAtualizada })).unwrap();
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar etapa:", error);
        }
    };

    return (
        <Modal
            title="Atualizar Etapa"
            open={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Informe o nome da etapa" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status" rules={[{ required: true, message: "Selecione um status" }]}>
                    <Select>
                        <Option value="PENDENTE">Pendente</Option>
                        <Option value="EM_ANDAMENTO">Em Andamento</Option>
                        <Option value="CONCLUIDA">Concluída</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Responsável" name="responsavel" rules={[{ required: true, message: "Informe o responsável" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Data de Início" name="dataInicio" rules={[{ required: true, message: "Selecione a data de início" }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item label="Data de Fim" name="dataFim" rules={[{ required: true, message: "Selecione a data de fim" }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Salvar Alterações
                </Button>
            </Form>
            {statusEtapas === "failed" && (
                <Alert message={errorEtapas || "Erro ao atualizar etapa."} type="error" showIcon style={{ marginTop: 16 }} />
            )}
        </Modal>
    );
};

export default UpdateEtapa;