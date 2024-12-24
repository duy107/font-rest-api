import { Button, Card, Form, Input, Modal, Select } from "antd";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react"
import { roles } from "../../../../services/admin/role.services";
import { update } from "../../../../services/admin/company.services";
function UpdateAccount({ item, reload }) {
    const [role, listRole] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await roles();
            if(res.code === 200){
                listRole(res.roles)
            }
        }
        fetchApi();
    }, []);
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
    const options = role.map(item => ({
        value: item._id,
        label: item.title
    }))
    return (
        <>
            <Button icon={< CiEdit />} type="primary" ghost onClick={showModal}>
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Card title="Chỉnh sửa quyền cho tài khoản" id="updateRole">
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ width: "100%" }}
                        onFinish={handleSubmit}
                        initialValues={item}
                    >
                        <Form.Item name="role_id">
                            <Select
                                placeholder="Cập nhập quyền"
                                style={{
                                    flex: 1,
                                }}
                            options={options}
                            />
                        </Form.Item>
                        <Form.Item>
                            <button type="submit" className="btn btn-primary btn-sm w-100">Cập nhật</button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>
    );
}

export default UpdateAccount;