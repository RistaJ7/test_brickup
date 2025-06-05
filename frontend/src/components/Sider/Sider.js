import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined, FormOutlined } from "@ant-design/icons";
import styles from "./Sider.module.css"
import { Link } from "react-router-dom";

const { Sider } = Layout;

const GlobalSider = () => {
    const collapsed = useSelector((state) => state.ui.siderCollapsed);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={styles.logo} />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    { key: "1", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
                    { key: "2", icon: <ProfileOutlined />, label: <Link to="/details">Details</Link> },
                    { key: "3", icon: <FormOutlined />, label: <Link to="/forms">Forms</Link> },
                ]}
            />
        </Sider>
    );
};

export default GlobalSider;
