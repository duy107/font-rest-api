import { Card, Modal, Row, Form, Col, Input, Button, Select, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../actions/formApply";
import { useState } from "react";
import { getTimeCurrent } from "../../helpers/getTime";
import { createCV } from "../../services/cvService";
import { getCookie } from "../../helpers/cookie";

function FormApply({ job }) {
    const email = getCookie("email-user");
    const idUser = getCookie("id-user");
    const dispatch = useDispatch();
    const status = useSelector(state => state.formApply);
    const { Option } = Select;
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [spin, setSpin] = useState(false);
    const rules = (required, message) => {
        return [{
            required,
            message
        }]
    }

    const handleSubmit = async (e) => {
        e.idJob = job.infor[0].id;
        e.idCompany = job.infor[0].idCompany;
        e.idUser = idUser;
        e.createAt = getTimeCurrent();
        const res = await createCV(e);
        setSpin(true);
        setTimeout(() => {
            setSpin(false);
            if (res) {
                api.success({
                    message: `Thành công`,
                    description: "Đợi nhà tuyển dụng duyệt!",
                });
                dispatch(close(false));
                form.resetFields();
            } else {
                api.error({
                    message: `Thất bại`,
                    description: "Vui lòng kiểm tra lại thông tin!",
                });
            }
        }, 3000)
    }
    const handleCancelForm = () => {
        form.resetFields();
        dispatch(close(false));
    }
    return (
        <>
            {contextHolder}
            <Modal open={status} onCancel={handleCancelForm} footer={false}>
                <Spin size="large" spinning={spin} tip="Sending...">
                    <Card title="Ứng tuyển ngay" id="formApply">
                        <Form form={form} name="form_apply" layout="vertical" onFinish={handleSubmit}  initialValues={{ email: email }}>
                            <Row gutter={[20, 20]}>
                                <Col span={24}>
                                    <Form.Item label="Họ tên" name="name" rules={rules(true, "Please enter your name!")}>
                                        <Input placeholder="Enter your name..." />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Số điện thoại" name="phone" rules={rules(true, "Please enter your phone!")}>
                                        <Input placeholder="Enter your phone..." />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Email" name="email">
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Thành phố" name="city" rules={rules(true, "Choose city")}>
                                        <Select>
                                            {job && job.infor[0].city.map((item, index) => (
                                                <Option label={item} value={item} key={index}></Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Giới thiệu bản thân" name="description" rules={rules(true, "Enter your information")}>
                                        <Input.TextArea rows={5} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Danh sách link project đã làm" name="linkProject" rules={rules(true, "Enter your link project")}>
                                        <Input.TextArea rows={5} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" size="large" htmlType="submit">Gửi yêu cầu</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Spin >
            </Modal>
        </>
    );
}

export default FormApply;