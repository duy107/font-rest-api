import { Button, Card, Col, Form, Input, Modal, Row, Select, Switch } from "antd";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import { listTag } from "../../services/admin/tag.services";
import { listCity } from "../../services/admin/city.services";
import { update } from "../../services/admin/job-management.services";
import Tinymce from "../../pages/Tinymce";
function EditJob({ item, reload, displayNotification }) {
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        if (city.length && tags.length) {
            const defaultCities = item.cities?.map(city => city._id) || [];
            const defaultTags = item.tags?.map(tag => tag._id) || [];
            form.setFieldsValue({
                ...item,
                cities: defaultCities,
                tags: defaultTags,
            });
        }
    }, [city, tags, isShowModal]);
    

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
    const handleCancel = () => {
        setIsShowModal(false);
        form.resetFields();
    }
    const handleSubmit = async (e) => {
        e.id = item._id;
        e.cities = e.cities.map(item => item.value || item);
        e.tags = e.tags.map(item => item.value || item);
        const res = await update(e);
        if(res.code === 200){
            displayNotification({
                type: "success",
                infor: {
                    message: "Update success!",
                    duration: 2
                }
            })
            setIsShowModal(false);
            reload();
        }else{
            displayNotification({
                type: "error",
                infor: {
                    message: "Update failed!",
                    duration: 2
                }
            })
            setIsShowModal(false);
        }
    }
    return (
        <>
            <Button icon={< CiEdit />} type="primary" ghost onClick={() => setIsShowModal(true)}>
            </Button>
            <Modal open={isShowModal} footer={false} onCancel={handleCancel}>
                <Card title="Cập nhật job">

                    <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
                                <Form.Item label="Thành phố" name="cities">
                                    <Select mode="multiple" options={city} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mô tả công việc" name="description">
                                    <Tinymce isEdit={true}/>
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