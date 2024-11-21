import { Button, Card, Col, Form, Input, Modal, Row, Select, Switch, Tag } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import moment from "moment";
import { useEffect } from "react";

function DetailJob({ item, reload }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const infor = () => {
        item.tags = item.tags.map(tag => tag.name || tag);
        item.cities = item.cities.map(city => city.name || city);
        item.createAt = moment(item.createAt).format("DD/MM/YYYY HH:mm:ss");

        form.setFieldsValue(item);
    }

    const showModal = () => {
        setIsModalOpen(true);
        infor();
    };
    const handleCancel = () => {
        reload();
        setIsModalOpen(false);
    };
    return (
        <>
            <Button icon={<FaRegEye />} onClick={showModal}></Button>
            <Modal open={isModalOpen} footer={false} onCancel={handleCancel}>
                <div style={{
                    pointerEvents: 'none',
                    opacity: 0.6
                }}>
                    <Card title="Thông tin job">
                        <Form layout="vertical" form={form}>
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Form.Item label="Tên job" name="name">
                                        <Input></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Lương" name="salary">
                                        <Input></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Tags" name="tags">
                                        <Select mode="multiple" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Thành phố" name="cities">
                                        <Select mode="multiple" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                                        {item.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="red">Đang tắt</Tag>)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Thời gian tạo job" name="createAt">
                                        <Input></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả công việc" >
                                        <div 
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                        style={{
                                            minHeight: "100px",
                                            padding: "8px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: "10px"
                                        }}
                                        >

                                        </div>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div >
            </Modal>
        </>
    );
};

export default DetailJob;