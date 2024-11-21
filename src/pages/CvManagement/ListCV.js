import moment from "moment";
import { Button, notification, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import DeleteCV from "./DeleteCV";
import CvDetail from "../CvDetail";
import { listCV } from "../../services/admin/cv-management";
function ListCV() {
    const [api, contextHolder] = notification.useNotification();
    const [listCVs, setListCVs] = useState([]);

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
        const {type, infor} = data;
        api[type](infor);
    }
    const columns = [
        {
            title: 'Tên jobs',
            dataIndex: "idJob",
            key: 'idJob',
            render: (_, record) => (
                <span>{record.jobInfor.name}</span>
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
                record.accepted ? (<Tag color="green">Đã chấp nhận</Tag>) : record.statusRead ? (<Tag color="blue">Đã đọc</Tag>) : <Tag>Chưa đọc</Tag>
            )
        }
        ,
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <div style={{ marginBottom: 10 }}>
                            <CvDetail item={record} reload={handleReload} />
                        </div>
                        <DeleteCV item={record} reload={handleReload} displayNotification={displayNotification} />
                    </>
                )
            }
        }
    ];
    return (
        <>
             {contextHolder}
            <Table columns={columns} dataSource={listCVs} rowKey={"id"} />
        </>
    );
}

export default ListCV;