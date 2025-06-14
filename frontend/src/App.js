import { Layout, theme } from "antd";
import GlobalHeader from "./components/Header";
import GlobalSider from "./components/Sider/Sider";
import { Route, Routes } from "react-router-dom";
import ListObra from "./pages/ListObra"
import DetailsObra from "./pages/DetailsObra/DetailsObra"
import FormCreateObra from "./pages/FormCreateObra"
import "./App.css";
import Desenvolvedor from "./pages/Desenvolvedor";

const { Content } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
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
                        <Route path="/desenvolvedor" element={<Desenvolvedor />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
