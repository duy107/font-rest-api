import { Button, Card, Checkbox, Col, Form, Input, message, Row } from "antd";
import {useState} from "react";
import { generateToken } from "../../helpers/generateToken";
import * as user from "../../services/userService";
import { useNavigate } from "react-router-dom";
function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const [allow, setAllow] = useState(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.token = generateToken();
        e.isUser = true;
        const pattern = /(?=.*\d)(?=.*\W)(?=.*[A-Z]).{8,}/;
        const checkEmail = await user.checkExits("email", e.email);
        const checkPhone = await user.checkExits("phone", e.phone);
        if (checkEmail.length > 0) {
            messageApi.error("Email đã tồn tại !");
        } else if (checkPhone.length > 0) {
            messageApi.error("Số điện thoại đã tồn tại!");
        } else if (!pattern.test(e.password)) {
            messageApi.error(`Mật khẩu tối thiểu 8 ký tự (ít nhất 1 số, 1 ký tự đặc biệt, 1 chữ hoa)!`);
        } else if (e.password !== e.passwordConfirm) {
            messageApi.error('Mật khẩu không khớp')
        } else {
            delete e.passwordConfirm;
            const res = await user.createUser(e);
            if (res) {
                messageApi.success("Đăng ký thành công!", [2]);
                setTimeout(() => {
                    form.resetFields();
                    navigate("/signin/user_signin");
                }, 2000);
            }
        }
    }
    return (
        <>
            {contextHolder}
            <Row justify={"center"}>
                <Col span={12}>
                    <Card title="Đăng ký tài khoản" bordered={false}>
                        <Form layout="vertical" name="inforUser" onFinish={handleSubmit} form={form}>
                            <Form.Item label="Email" name="email" required>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phone" required>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password" required>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label="Password Confirm" name="passwordConfirm" required>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>    
                            <Checkbox onChange={() => setAllow(!allow)}>Đồng ý với điều khoản của công ty</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button className="w-100" htmlType="submit" type="primary" disabled={allow}>Đăng ký</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Register;