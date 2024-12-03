import { Button, Card, Form, Input, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import Tinymce from "../../../../components/Tinymce";
import { create } from "../../../../services/admin/role.services";
function CreateRole({ reload }) {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleSubmit = async (e) => {
        const res = await create(e);
        if(res.code === 200){
            setIsModalOpen(false);
            form.resetFields();
            reload();
        }
    }
    return (
        <>
            <button icon={<FaPlus />} className="btn btn-sm btn-success" onClick={showModal}>Tạo quyền mới</button>
            <Modal open={isModalOpen}  onCancel={handleCancel} footer={false}>
                <Card title="Tạo quyền" id="createRole">
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ width: "100%" }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="title" label="Tên quyền">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Mô mô tả ngắn" name="description">
                            <Input.TextArea rows={5} />
                        </Form.Item>
                        <Form.Item>
                            <button type="submit" class="btn btn-outline-success btn-sm btn-block w-100">Tạo mới</button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>
    );
}

export default CreateRole;