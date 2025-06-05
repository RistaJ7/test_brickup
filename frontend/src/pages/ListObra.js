import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchObras } from "../store/ObraSlice";
import { List, Card, Spin, Alert } from "antd";

const ListObra = () => {
    const dispatch = useDispatch();
    const { obras, status } = useSelector((state) => state.obra);

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
                    renderItem={(obra) => (
                        <List.Item>
                            <Card title={obra.nome}>
                                <p><strong>Autor:</strong> {obra.nome}</p>
                                <p><strong>Descrição:</strong> {obra.descricao}</p>
                                <p><strong>Data início:</strong> {obra.dataInicio}</p>
                                <p><strong>Data previsão fim:</strong> {obra.dataPrevisaoFim}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default ListObra;
