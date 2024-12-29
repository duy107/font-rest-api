import { Button } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import { update } from "../../../../services/admin/cv-management";
import { useSelector } from "react-redux";

function CvDetail({ item, reload }) {
    console.log(item);
    const [show, setShow] = useState(false);
    const permission = useSelector(state => state.permission);
    const handleAccept = (type) => {
        const handleUpdate = async () => {
            const res = await update({
                id: item._id,
                type
            });
            if (res.code === 200) {
                setShow(false);
                reload();
            }
        }
        handleUpdate()
    }
    const handleClose = () => {
        setShow(false);
        reload();
    };
    const handleShow = () => {
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
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <div className="text-lg">
                            Tên ứng viên: <strong className="font-bold text-gray-800">{item.userInfor.fullName}</strong>
                        </div>
                        <div className="text-lg">
                            Điện thoại: <strong className="font-bold text-gray-800">{item.userInfor.phone}</strong>
                        </div>
                        <div className="text-lg">
                            Email: <strong className="font-bold text-gray-800">{item.userInfor.email}</strong>
                        </div>
                        <div className="text-lg">
                            Ngày tạo CV:{" "}
                            <strong className="font-bold text-gray-800">
                                {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                            </strong>
                        </div>
                        <div className="text-lg">
                            Mô tả:
                            <div
                                className="mt-2 p-4 bg-gray-100 rounded-lg text-gray-700"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {permission.includes("cv_accpet") && !item?.jobInfor?.deleted && item?.jobInfor?.status && 
                        <>
                            <Button onClick={() => handleAccept("accepted")} type="primary">Chấp nhận</Button>
                            <Button type="primary" onClick={() => handleAccept("refused")} danger>
                                Từ chối
                            </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CvDetail;