import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const BotaoVoltar = () => {
    const location = useLocation();
    const previousPage = location.state?.from || "/";

    return (
        <Link to={previousPage}>
            <Button
                icon={<LeftOutlined />}
                type="primary"
                style={{ margin: "10px 0px 10px" }}
            >
                Voltar
            </Button>
        </Link>
    );
};

export default BotaoVoltar;
