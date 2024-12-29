import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detail, update } from "../../../../services/admin/job-management.services";
import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import Tinymce from "../../../../components/Tinymce";
import { listTag } from "../../../../services/admin/tag.services";
import { listCity } from "../../../../services/admin/city.services";

function UpdateJob() {
    const { id } = useParams();
    const [infor, setInfor] = useState(null);
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (city.length && tags.length) {
            const defaultCities = infor.cities?.map(city => city._id) || [];
            const defaultTags = infor.tags?.map(tag => tag._id) || [];
            form.setFieldsValue({
                ...infor,
                cities: defaultCities,
                tags: defaultTags,
            });
        }
    }, [infor, tags, city])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await detail(id);
            if (res.code === 200) {
                setInfor(res.infor);
            }
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
        };
        fetchApi();
    }, []);

    const handleSubmit = async (e) => {
        e.id = infor._id;
        const res = await update(e);
        if(res.code === 200){
            messageApi.success(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            {infor ?
                <Card title="Cập nhật công việc">
                    <Form layout="vertical" form={form} onFinish={handleSubmit}>
                        <Row gutter={[20, 20]}>
                            <Col span={16}>
                                <Form.Item label="Tên công việc" name="name">
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
                                    <Switch checkedChildren="Đang tuyển dụng" unCheckedChildren="Ngừng tuyển dụng" defaultValue={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Ngôn ngữ" name="tags">
                                    <Select mode="multiple" options={tags} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Thành phố" name="cities">
                                    <Select mode="multiple" options={city} />
                                </Form.Item>
                            </Col>
                            <Col span={24} >
                                <Form.Item label="Yêu cầu kinh nghiệm" name="experience">
                                    <Tinymce isEdit={true} />
                                </Form.Item>
                            </Col>
                            <Col span={24} >
                                <Form.Item label="Yêu cầu trình độ" name="level">
                                    <Tinymce isEdit={true} />
                                </Form.Item>
                            </Col>
                            <Col span={24} >
                                <Form.Item label="Mô tả" name="description">
                                    <Tinymce isEdit={true} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" htmlType="submit" block>Cập nhật</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                : <>Lỗi</>}
        </>
    );
}

export default UpdateJob;