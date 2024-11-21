import { Button, Card, Checkbox, Col, Form, Input, message, Row, Upload } from "antd";
import { FileUploadWithPreview } from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/style.css';
import { useEffect, useRef, useState } from "react";
import { register } from "../../services/client/user.services";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [allow, setAllow] = useState(true);
    const [form] = Form.useForm();
    const fileUpload = useRef(null);
    useEffect(() => {
        fileUpload.current = new FileUploadWithPreview('my-avatar');
    }, []);

    const handleSubmit = async (e) => {
        // delete e.avatar;
        const formData = new FormData();
        formData.append("avatar", fileUpload.current.cachedFileArray[0]);
        for(const key in e) {
            formData.append(key, e[key])
        }
        const res = await register(formData); 
        if(res.code === 200){
            navigate("/login");
        }else{
            messageApi.error(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            <Row justify={"center"}>
                <Col span={16}>
                    <Card title="Đăng ký tài khoản" bordered={false}>
                        <Form layout="vertical" name="inforUser" onFinish={handleSubmit} form={form}>
                            <Row gutter={[10, 10]}>
                                <Col span={12}>
                                    <Form.Item label="Họ tên" name="fullName"  >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Phone Number" name="phone"  >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Email" name="email"  >
                                        <Input type="email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Password" name="password"  >
                                        <Input.Password  />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="avatar"
                                        label="Avatar" >
                                        <div className="custom-file-container" data-upload-id="my-avatar" ref={fileUpload} required></div>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Địa chỉ" name="address">
                                        <Input.TextArea rows={11} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Checkbox onChange={() => setAllow(!allow)}>Đồng ý với điều khoản của công ty</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Form.Item>
                                    <Button className="w-100" htmlType="submit" type="primary" disabled={allow}>Đăng ký</Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Register;