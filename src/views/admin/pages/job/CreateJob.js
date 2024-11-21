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
        e.salary = `${e.salary}$`;
        const res = await create(e);
        if(res.code === 200){
            form.resetFields();
            messageApi.success(res.message);
        }else{
            messageApi.error(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            <GoBack/>
            <Card title="Tạo job mới">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={[20, 20]}>
                        <Col span={16}>
                            <Form.Item label="Tên job" name="name">
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="Lương" name="salary">
                                <Input addonAfter="$"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultValue={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Tags" name="tags">
                                <Select mode="multiple" options={tags} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thành phố" name="cities">
                                <Select mode="multiple" options={city} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item label="Mô tả" name="description">
                                <Tinymce isEdit={true}/>
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