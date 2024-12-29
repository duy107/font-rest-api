import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import { useState, useEffect } from "react";
import GoBack from "../../../../components/GoBack"
import { useNavigate } from "react-router-dom";
import { listTag } from "../../../../services/admin/tag.services";
import { listCity } from "../../../../services/admin/city.services";
import Tinymce from "../../../../components/Tinymce";
import { create } from "../../../../services/admin/job-management.services";
function CreateJob() {
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchApi = async () => {
            const [listTags, listCities] = await Promise.all([listTag(), listCity()]);
            if (listTags.code === 200) {
                const tags = listTags.listTag.reduce((total, item) => {
                    return [
                        ...total,
                        {
                            label: item.name,
                            value: item._id
                        }
                    ]
                }, []);
                setTags(tags);
            }
            if (listCities.code === 200) {
                const cities = listCities.listCity.reduce((total, item) => {
                    return [
                        ...total,
                        {
                            label: item.name,
                            value: item._id
                        }
                    ]
                }, []);
                setCity(cities);
            }
        }
        fetchApi();
    }, []);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const res = await create(e);
        if (res.code === 200) {
            form.resetFields();
            messageApi.success(res.message);
        } else {
            messageApi.error(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            <GoBack />
            <Card title="Tạo công việc mới">
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={[20, 20]}>
                        <Col span={16}>
                            <Form.Item label="Tên công việc" name="name" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="Lương" name="salary" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Input ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                                <Switch checkedChildren="Đang tuyển dụng" unCheckedChildren="Ngừng tuyển dụng" defaultValue={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Ngôn ngữ" name="tags" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Select mode="multiple" options={tags} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thành phố" name="cities"  rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Select mode="multiple" options={city} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item label="Yêu cầu kinh nghiệm" name="experience" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Tinymce isEdit={true} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item label="Yêu cầu trình độ" name="level" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Tinymce isEdit={true} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Tinymce isEdit={true} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item label="Quyền lợi" name="benefit" rules={[{ required: true, message: 'Không để trống trường này!' }]}>
                                <Tinymce isEdit={true} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" htmlType="submit" block>Tạo</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default CreateJob;