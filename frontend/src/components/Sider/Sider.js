import { Image, Layout, Menu } from "antd";
import { HomeOutlined, CodeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
const { Sider } = Layout;

const GlobalSider = () => {

    return (
        <Sider
            trigger={null}
            collapsible
            style={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Image
                    src={logo}
                    preview={false}
                    style={{
                        maxWidth: 120,
                        height: "auto",
                        margin: "16px 0"
                    }}
                />
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "transparent",
                    borderRight: 0,
                    width: "100%"
                }}
            >
                <Menu.Item key="1" icon={<HomeOutlined />} style={{ width: "100%", textAlign: "center" }}>
                    <Link to="/">Lista de Obras</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CodeOutlined />} style={{ width: "100%", textAlign: "center" }}>
                    <Link to="/desenvolvedor">Desenvolvedor</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default GlobalSider;
