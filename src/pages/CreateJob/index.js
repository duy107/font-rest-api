import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import { useState, useEffect } from "react";
import { getListTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getCookie } from "../../helpers/cookie";
import { createJob } from "../../services/jobService";
import { getTimeCurrent } from "../../helpers/getTime";
import GoBack from "../../components/GoBack"
import { useNavigate } from "react-router-dom";
function CreateJob() {
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const idCompany = getCookie("id");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListTag();
            if (res) {
                setTags(res);
            }
        }
        fetchApi();
    }, [])
    
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCity();
            if (res) {
                setCity(res);
            }
        }
        fetchApi();
    }, [])

    const handleSubmit = async (e) => {
        e.idCompany = idCompany;
        e.salary = `${e.salary}$`;
        e.createAt = getTimeCurrent();
        e.updateAt = getTimeCurrent();
        const res = await createJob(e);
        if (res) {
            messageApi.success("Tạo thành công");
            form.resetFields();
            navigate(-1);
        }else{
            messageApi.error("Tạo thất bại");
        }
    }
    return (
        <>
            {contextHolder}
            <GoBack/>
            <Card title="Tạo job mới">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item label="Tên job" name="name">
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={19} >
                            <Form.Item label="Tags" name="tags">
                                <Select mode="multiple" options={tags} />
                            </Form.Item>
                        </Col>
                        <Col span={5} >
                            <Form.Item label="Lương" name="salary">
                                <Input addonAfter="$"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Thành phố" name="city">
                                <Select mode="multiple" options={city} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item label="Mô tả" name="description">
                                <Input.TextArea rows={6}></Input.TextArea>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Trạng thái" name="status"  valuePropName="checked">
                            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultValue={false} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" htmlType="submit">Tạo</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default CreateJob;