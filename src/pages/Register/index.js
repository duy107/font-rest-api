import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { generateToken } from "../../helpers/generateToken";
import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const rules = [
        {
            required: true,
            message: "Please input this field!"
        }
    ]
    const handleSubmit = async (e) => {
        e.token = generateToken();
        const checkEmail = await company.checkExits("email", e.email);
        const checkPhone = await company.checkExits("phone", e.phone);
        if (checkEmail.length > 0) {
            messageApi.error("Email đã tồn tại !");
        } else if (checkPhone.length > 0) {
            messageApi.error("Số điện thoại đã tồn tại!");
        } else {
            const res = await company.createCompany(e);
            if (res) {
                messageApi.success("Đăng ký thành công!");
                form.resetFields();
                navigate("/signin");
            }
        }
    }  
    return (
        <>
            {contextHolder}
            <Row justify={"center"}>
                <Col span={12}>
                    <Card title="Đăng ký tài khoản công ty" bordered={false}>
                        <Form layout="vertical" name="inforCompany" onFinish={handleSubmit} form={form}>
                            <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={rules}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="phone">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={rules}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Đăng ký</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Register;