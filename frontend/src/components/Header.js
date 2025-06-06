import { Flex, Layout, Space } from "antd";
import { Typography } from 'antd';
import Title from "antd/es/typography/Title";

const { Header } = Layout;
const { Text } = Typography;

const GlobalHeader = () => {
    return (
        <Header style={{ padding: 0, background: "#fff" }}>
            <Flex justify="center">
                <Space align="baseline" justify={'center'}>
                    <Title style={{ margin: 0 }}>Construction</Title>
                    <Text type="warning" strong>Build and innovation</Text>
                </Space>
            </Flex>
        </Header>
    );
};

export default GlobalHeader;
