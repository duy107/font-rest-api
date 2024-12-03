import { Button, Card, Form, Input, Modal } from "antd";
import { CiEdit } from "react-icons/ci";
import {useState, useEffect} from "react"
import { update } from "../../../../services/admin/role.services";
function UpdateRole({ item, reload }) {
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
        e.id = item._id;
        const res = await update(e);
        if(res.code === 200){
            setIsModalOpen(false);
            reload();
        } 
    }
    return (
        <>
            <Button icon={< CiEdit />} type="primary" ghost onClick={showModal}>
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Card title="Chỉnh sửa thông tin quyền" id="updateRole">
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ width: "100%" }}
                        onFinish={handleSubmit}
                        initialValues={item}
                    >
                        <Form.Item name="title" label="Tên quyền">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Mô mô tả ngắn" name="description">
                            <Input.TextArea rows={5} />
                        </Form.Item>
                        <Form.Item>
                            <button type="submit" class="btn btn-primary btn-sm w-100">Cập nhật</button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>
    );
}

export default UpdateRole;