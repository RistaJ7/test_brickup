import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined, FormOutlined } from "@ant-design/icons";
import styles from "./Sider.module.css";
import { Link } from "react-router-dom";
import { collapseSider } from "../../store/UISlice";
const { Sider } = Layout;

const GlobalSider = () => {
    const dispatch = useDispatch();
    const collapsed = useSelector((state) => state.ui.siderCollapsed);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/" onClick={() => !collapsed && dispatch(collapseSider())}>Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ProfileOutlined />}>
                    <Link to="/details" onClick={() => !collapsed && dispatch(collapseSider())}>Details</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FormOutlined />}>
                    <Link to="/forms" onClick={() => !collapsed && dispatch(collapseSider())}>Forms</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default GlobalSider;
