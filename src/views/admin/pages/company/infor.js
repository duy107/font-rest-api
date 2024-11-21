import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { companyInfor, update } from "../../../../services/admin/company.services";
import Tinymce from "../../../../components/Tinymce";

function InforCompany() {
    const [isEdit, setIsEdit] = useState(false);
    const [infor, setInfor] = useState(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const rules = [
        {
            required: true,
            message: 'Please input your password!',
        },
    ]
    const fetchApi = async () => {
        const inforCompany = await companyInfor();
        if (inforCompany) {
            setInfor(inforCompany);
            form.setFieldsValue(inforCompany);
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
        console.log(e)
        const res = await update(e);
        if (res.code === 200) {
            setInfor(e);
            messageApi.success(res.message);
            setIsEdit(false);
            form.setFieldsValue(e);
        } else {
            messageApi.error(res.message);
            form.setFieldsValue(infor);
            setIsEdit(false);
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
                            <Form.Item label="Tên công ty" name="name" rules={rules}>
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
                            <Form.Item label="Thời gian làm việc" name="workingTime">
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
                                <Tinymce isEdit={isEdit} />
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