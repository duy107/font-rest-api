import { Card, Modal, Row, Form, Col, Input, Button, Select, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../../actions/formApply";
import { useState } from "react";
import { create } from "../../../../services/client/cv.services";

function FormApply({ job }) {
    const inforUser = useSelector(state => state.infor);
    const dispatch = useDispatch();
    const status = useSelector(state => state.formApply);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [spin, setSpin] = useState(false);

    const handleSubmit = async (e) => {
        const cv = {
            user_id: inforUser._id,
            job_id: job._id,
            company_id: job.company_id,
            project: e.project || "",
            description: e.description || ""
        }
        const res = await create(cv);
        setSpin(true);
        setTimeout(() => {
            setSpin(false);
            if (res.code === 200) {
                api.success({
                    message: res.message,
                    description: "Đợi nhà tuyển dụng duyệt!",
                });
                dispatch(close(false));
                form.resetFields();
            } else {
                api.error({
                    message: res.message,
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
                        <Form form={form} name="form_apply" layout="vertical" onFinish={handleSubmit} initialValues={{
                            email: inforUser.email,
                            phone: inforUser.phone,
                            address: inforUser.address,
                            fullName: inforUser.fullName
                        }}>
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Form.Item label="Họ tên" name="fullName">
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>  
                                <Col span={12}>
                                    <Form.Item label="Số điện thoại" name="phone">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Email" name="email">
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Địa chỉ" name="address">
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả" name="description">
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Danh sách link project đã làm" name="project">
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" size="large" htmlType="submit" block>Gửi yêu cầu</Button>
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