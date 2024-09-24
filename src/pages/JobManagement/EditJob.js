import { Button, Card, Col, Form, Input, Modal, Row, Select, Switch } from "antd";
import { CiEdit } from "react-icons/ci";
import { getListTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { useState, useEffect } from "react";
import {getTimeCurrent} from "../../helpers/getTime"
import { updateJob } from "../../services/jobService";
function EditJob({ item, reload }) {
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [form] = Form.useForm();

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

    const handleCancel = () => {
        form.resetFields();
        setIsShowModal(false);
    }
    const handleSubmit = async (e) => {
        e.updateAt = getTimeCurrent();
        const res = await updateJob(item.id, e);
        if(res){
            reload();
            setIsShowModal(false);
        }
    }

    return (
        <>
            <Button icon={< CiEdit />} type="primary" ghost onClick={() => setIsShowModal(true)}>
            </Button>
            <Modal open={isShowModal} footer={false} onCancel={handleCancel}>
                <Card title="Cập nhật job">
                    <Form layout="vertical" onFinish={handleSubmit} initialValues={item} form={form}>
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
                                    <Input></Input>
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
                                <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" htmlType="submit">Cập nhật</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Modal>
        </>
    );
}

export default EditJob;