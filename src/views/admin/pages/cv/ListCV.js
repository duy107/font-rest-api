import moment from "moment";
import { Button, Modal, notification, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import DeleteCV from "./DeleteCV";
import CvDetail from "./detail";
import { listCV } from "../../../../services/admin/cv-management";
import { useSelector } from "react-redux";
import { detail } from "../../../../services/admin/job-management.services";
function ListCV() {
    const [accept, setAccept] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [listCVs, setListCVs] = useState([]);
    const permission = useSelector(state => state.permission);
    const fetchApi = async () => {
        const res = await listCV();
        setListCVs(res);
    }
    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => {
        fetchApi();
    }
    const displayNotification = (data) => {
        const { type, infor } = data;
        api[type](infor);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = (id) => {
        const fetchApi = async () => {
            const res = await detail(id);
            if (res.code === 200) {
                setAccept(res);
                showModal();
            }
        }
        fetchApi();
    }
    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: "idJob",
            key: 'idJob',
            render: (_, record) => (
                <span className="cursor-pointer" onClick={() => handleClick(record.jobInfor._id)}>{record.jobInfor.name}</span>
            )
        },
        {
            title: 'Họ tên',
            dataIndex: "name",
            key: 'name',
            render: (_, record) => (
                <span>{record.userInfor.fullName}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_, record) => (
                <span>{record.userInfor.email}</span>
            )
        },
        {
            title: 'Số điện thoại',
            dataIndex: "phone",
            key: 'phone',
            render: (_, record) => (
                <span>{record.userInfor.phone}</span>
            )
        },
        {
            title: 'Ngày gửi',
            dataIndex: "createdAt",
            key: 'createdAt',
            render: (_, record) => (
                <span>{moment(record.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
            )
        },
        {
            title: "Trạng thái",
            key: "statusRed",
            render: (_, record) => (
                record.status == "initial" ? (<Tag >Chưa duyệt</Tag>) : record.status == "accepted" ? (<Tag color="green">Đã chấp nhận</Tag>) : <Tag color="red">Đã từ chối</Tag>
            )
        }
        ,
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        {permission.includes("cv_view") &&
                            <div style={{ marginBottom: 10 }}>
                                <CvDetail item={record} reload={handleReload} />
                            </div>
                        }
                        {permission.includes("cv_delete") &&
                            <DeleteCV item={record} reload={handleReload} displayNotification={displayNotification} />
                        }
                    </>
                )
            }
        }
    ];
    return (
        <>
            {contextHolder}
            <Table columns={columns} dataSource={listCVs} rowKey={"id"} />
            {accept && <Modal footer={false} open={isModalOpen} onCancel={handleCancel}>
                <div className="space-y-6">
                    <h1 className="text-[25px] font-bold">Tiêu chí chấp nhận</h1>
                    <div>
                        <h1 className="text-[18px] font-medium">Yêu cầu kinh nghiệm</h1>
                        <div dangerouslySetInnerHTML={{ __html: accept.infor.experience}} />
                    </div>
                    <div>
                        <h1 className="text-[18px] font-medium">Yêu cầu trình độ</h1>
                        <div dangerouslySetInnerHTML={{ __html: accept.infor.level}} />
                    </div>
                </div>
            </Modal>}
        </>
    );
}

export default ListCV;