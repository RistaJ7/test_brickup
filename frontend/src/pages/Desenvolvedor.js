import { Card, Avatar, Typography, Space, Button } from "antd";
import { GithubOutlined, LinkedinOutlined, LinkOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo_dark.png";

const { Title, Paragraph } = Typography;

const Desenvolvedor = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <Card
            style={{ maxWidth: 400, width: "100%", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            variant="outlined"
        >
            <Avatar
                size={200}
                src={logo}
                style={{ marginBottom: 16 }}
            />
            <Title level={3} style={{ marginBottom: 0 }}>Lucas Ferreira Nogueira</Title>
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Desenvolvedor Full Stack
            </Paragraph>
            <Space style={{ marginTop: 16 }}>
                <Button
                    type="link"
                    href="https://github.com/RudeBoyOne"
                    target="_blank"
                    icon={<GithubOutlined />}
                >
                    GitHub
                </Button>
                <Button
                    type="link"
                    href="https://www.linkedin.com/in/lucas-ferreira-nogueira/"
                    target="_blank"
                    icon={<LinkedinOutlined />}
                >
                    LinkedIn
                </Button>
                <Button
                    type="link"
                    href="https://lucasfncode.com.br/"
                    icon={<LinkOutlined />}
                >
                    Portfólio
                </Button>
            </Space>
        </Card>
    </div>
);

export default Desenvolvedor;