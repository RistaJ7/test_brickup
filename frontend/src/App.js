import { Layout, theme } from "antd";
import GlobalHeader from "./components/Header";
import GlobalSider from "./components/Sider/Sider";
import { Route, Routes } from "react-router-dom";
import ListObra from "./pages/ListObra"
import DetailsObra from "./pages/DetailsObra"
import FormCreateObra from "./pages/FormCreateObra"

const { Content } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <GlobalSider />
            <Layout>
                <GlobalHeader />
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<ListObra />} />
                        <Route path="/obraDetails/:id" element={<DetailsObra />} />
                        <Route path="/createObra" element={<FormCreateObra />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
