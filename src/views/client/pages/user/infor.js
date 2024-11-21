import { Card, Col, message, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import 'file-upload-with-preview/dist/style.css';
import { Button, Form } from "react-bootstrap";
import "./style.scss";
import { useEffect, useState } from "react";
import { handlePreview } from "./handlePreview";
import { changeInfor } from "../../../../services/client/user.services";
import { infor as info } from "../../../../actions/inforUser";
function Infor() {
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        handlePreview();
    }, [isUpdate]);
    const infor = useSelector(state => state.infor);
    const [inforUpdate, setInforUpdate] = useState({
        email: infor.email || "",
        fullName: infor.fullName || "",
        phone: infor.phone || "",
        address: infor.address || "",
        avatar: infor.avatar || undefined,
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInforUpdate({
            ...inforUpdate,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        delete inforUpdate.avatar;
        const formData = new FormData();
        const fileInput = document.querySelector('input[name="avatar"]');
        if (fileInput.files[0]) {
            formData.append("avatar", fileInput.files[0]);
        }
        for (const item in inforUpdate) {
            formData.append(item, inforUpdate[item]);
        }
        const res = await changeInfor(formData);
        if (res.code === 200) {
            if (!res.infor.avatar) {
                res.infor.avatar = infor.avatar || "";
            }
            localStorage.setItem("infor", JSON.stringify(res.infor));
            dispatch(info(res.infor));
            setIsUpdate(false);
            messageApi.success(res.message);
        } else {
            messageApi.error(res.message);
        }
    }
    useEffect(() => {
        const imgPreview = document.querySelector("[data-upload-image-preview]");
        imgPreview.src = infor.avatar;
    }, [infor]);
    const handleCancel = () => {
        setInforUpdate({
            email: infor.email || "",
            fullName: infor.fullName || "",
            phone: infor.phone || "",
            address: infor.address || "",
            avatar: infor.avatar || undefined,
            password: ""
        });
        const fileInput = document.querySelector('input[name="avatar"]');
        const imgPreview = document.querySelector("[data-upload-image-preview]");
        const preview = document.querySelector(".preview-image");
        if (!infor.avatar)
            preview.style.display = "none";
        imgPreview.src = infor.avatar || "";

        fileInput.value = "";
        setIsUpdate(false);
    }
    const handleEdit = () => {
        setIsUpdate(true);
    }
    return (
        <>
            {contextHolder}
            <Card
                title="Thông tin người dùng"
                bordered={false}
                extra={
                    isUpdate ? (<Button onClick={handleCancel}>Hủy</Button>) : (<Button onClick={handleEdit}>Chỉnh sửa</Button>)
                }
                style={{
                    width: "100%",
                }}
            >
                <Form onSubmit={handleSubmit}>
                    <Row gutter={[10, 10]}>
                        <Col span="12">
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={inforUpdate.email} disabled={!isUpdate} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col span="12">
                            <Form.Group className="mb-3" >
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type="text" name="fullName" value={inforUpdate.fullName} disabled={!isUpdate} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col span={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" value={inforUpdate.phone} disabled={!isUpdate} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col span={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control rows={3} name="address" value={inforUpdate.address} disabled={!isUpdate} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col span={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" name="avatar" accept="image/*" data-upload-image-input disabled={!isUpdate} />
                                <div className="preview-image">
                                    <img data-upload-image-preview src={inforUpdate.avatar} />
                                    {isUpdate && <span data-upload-image-close>x</span>}
                                </div>
                            </Form.Group>
                        </Col>
                        {isUpdate && <Col span={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control rows={3} name="password" type="password" placeholder="Không nhập nếu không muốn thay đổi" disabled={!isUpdate} onChange={handleChange} />
                            </Form.Group>
                        </Col>}
                        <Col span={24}>
                            <Form.Group className="mb-3">
                                <Button variant="primary" size="sm" type="submit" className="w-100" disabled={!isUpdate}>
                                    Cập nhật
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default Infor;