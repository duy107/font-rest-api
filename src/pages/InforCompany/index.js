import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getDetailCompany1, updateCompany } from "../../services/companyService";

function InforCompany() {
    const [isEdit, setIsEdit] = useState(false);
    const idCompany = getCookie("id");
    const [infor, setInfor] = useState({});
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage(); 
    const rules = [
        {
            required: true,
            message: 'Please input your password!',
        },
    ]
    const fetchApi = async () => {
        const res = await getDetailCompany1(idCompany);
        if (res) {
            setInfor(res);
            form.setFieldsValue(res);
        }
    }
    useEffect(() => {
        fetchApi();
    }, [])

    const handleCancel = () => {
        setIsEdit(false);
        form.setFieldsValue(infor);
    }
    const handleEdit = () => {
        setIsEdit(true);
    }
    const handleSubmit = async (e) => {
        const res = await updateCompany(idCompany, e);
        if (res) {
            messageApi.success("Cập nhật thành công");
            setIsEdit(false);
            form.setFieldValue(e);
        }
    }
    return (
        <>
            {contextHolder}
            <Card title="Thông tin công ty" extra={
                isEdit ? (<Button onClick={handleCancel}>Hủy</Button>) : (<Button onClick={handleEdit}>Chỉnh sửa</Button>)
            }>
                <Form form={form} layout="vertical" disabled={!isEdit} onFinish={handleSubmit}>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Email" name="email" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Địa chỉ" name="address" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Số nhân sự" name="quantityPeople">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Thời gian làm việc" name="workingtime">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Link website" name="website">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả ngắn" name="description">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả chi tiết" name="detail">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        {isEdit && <Col span={4}>
                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                        </Col>}
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default InforCompany;