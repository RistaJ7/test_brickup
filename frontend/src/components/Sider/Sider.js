import { Image, Layout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
const { Sider } = Layout;

const GlobalSider = () => {

    return (
        <Sider
            trigger={null}
            collapsible
            style={{ padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <Image
                src={logo}
                preview={false}
                style={{ width: "100%", maxWidth: 120, height: "auto", margin: "16px 0" }}
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ProfileOutlined />}>
                    <Link to="/details">Details</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FormOutlined />}>
                    <Link to="/forms">Forms</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default GlobalSider;
