import { Button } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import { update } from "../../../../services/admin/cv-management";

function CvDetail({ item, reload }) {
    const [show, setShow] = useState(false);

    const handleAccept =  () => {
        const handleUpdate = async () => {
            await update({
                id: item._id,
                type: "accepted"
            });
        }
        handleUpdate();
        setShow(false);
        reload();
    }
    const handleClose = () => {
        setShow(false);
        reload();
    };
    const handleShow = () => {
        const handleUpdate = async () => {
            const res = await update({
                id: item._id,
                type: "statusRead"
            });
        }
        handleUpdate();
        setShow(true);
    };
    return (
        <>
            <Button icon={<FaRegEye />} onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin CV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>Tên ứng viên:  <strong>{item.userInfor.fullName}</strong></div>
                        <div>Điện thoại: <strong>{item.userInfor.phone}</strong></div>
                        <div>Email: <strong>{item.userInfor.email}</strong></div>
                        <div>Ngày tạo cv: <strong>{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</strong></div>
                        <div>Project: <strong>{item.project}</strong></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {!  item.accepted && <Button onClick={handleAccept}>Accept</Button>}
                    <Button type="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CvDetail;