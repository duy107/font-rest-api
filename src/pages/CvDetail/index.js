import { Button } from "antd";
import { changeStatusCv, detailCv } from "../../services/cvService";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';;

function CvDetail({ id, reload }) {
    const [show, setShow] = useState(false);
    const [detailCV, setDetailCV] = useState({});
    const fetchApi = async () => {
        const res = await detailCv(id);
        if (res) {
            setDetailCV(res);
        }
    }

    const handleAccept = async () => {
        const options = {
            "accepted": true
        }
        const res = await changeStatusCv(id, options);
        if (res) {
            setShow(false);
            reload();
        }
    }
    const handleClose = () => {
        setShow(false);
        reload();
    };
    const handleShow = () => {
        changeStatusCv(id, { statusRead: true });
        setShow(true);
        fetchApi();
    };
    return (
        <>
            <Button icon={<FaRegEye />} onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin CV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailCV && (
                        <div>
                            <div>Tên ứng viên:  <strong>{detailCV.name}</strong></div>
                            <div>Điện thoại: <strong>{detailCV.phone}</strong></div>
                            <div>Email: <strong>{detailCV.email}</strong></div>
                            <div>Ngày tạo cv: <strong>{detailCV.createAt}</strong></div>
                            <div>Project: <strong>{detailCV.linkProject}</strong></div>
                            <div>Mô tả bản thân: <strong>{detailCV.description}</strong></div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAccept}>Accept</Button>
                    <Button type="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CvDetail;