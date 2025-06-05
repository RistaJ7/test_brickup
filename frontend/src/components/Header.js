import { useDispatch, useSelector } from "react-redux";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { toggleSider } from "../store/UISlice";

const { Header } = Layout;

const GlobalHeader = () => {
    const collapsed = useSelector((state) => state.ui.siderCollapsed);
    const dispatch = useDispatch();

    return (
        <Header style={{ padding: 0, background: "#fff" }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(toggleSider())}
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    );
};

export default GlobalHeader;
