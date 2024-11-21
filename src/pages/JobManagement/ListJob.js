import { useEffect, useState } from "react";
import moment from "moment";
import { listJob as getListJob} from "../../services/admin/job-management.services";
import {Table, Tag, notification} from "antd";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import DetailJob from "./DetailJob";

function ListJob() {
    const [api, contextHolder] = notification.useNotification();
    const [listJob, setListJob] = useState([]);
    
    const fetchApi = async () => {
        const data = await getListJob();
        setListJob(data || []);
    }
    const displayNotification = (data) => {
        const {type, infor} = data;
        api[type](infor);
    }
    useEffect(() => {
        fetchApi();
    }, []);
    const handleReload = () => {
        fetchApi();
    };
    const columns = [
        {
            title: 'Tên jobs',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, record) =>
                (record.tags || []).map((item, index) => (
                    <Tag key={index} color="blue" style={{marginBottom: 10}}>{item.name}</Tag>
                ))
        },
        {
            title: 'Mức lương',
            dataIndex: "salary",
            key: 'salary'
        },
        {
            title: 'Thời gian',
            key: 'time',
            render: (_, record) => (
                <>
                    <small>Ngày tạo: {moment(record.createAt).format("DD/MM/YYYY HH:mm:ss")}</small>
                    <br />
                    <small>Cập nhật: {moment(record.updateAt).format("DD/MM/YYYY HH:mm:ss")}</small>
                </>
            )
        },
        {
            title: 'Trang thái',
            dataIndex: "status",
            key: 'status',
            render: (_, record) => {
                return (record.status ? <Tag color="green">Đang bật</Tag> : <Tag color="red">Đang tắt</Tag>)
            }
        },
        ,
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <div><DetailJob item={record} reload={handleReload}/></div>
                        <div style={{margin: "10px 0px"}}><EditJob item={record} reload={handleReload} displayNotification={displayNotification}/></div>
                        <div> <DeleteJob item={record} reload={handleReload} displayNotification={displayNotification}/></div>
                    </>
                )
            }
        }
    ];
    return (
        <>
            {contextHolder}
            <Table dataSource={listJob} columns={columns} rowKey={"id"} />
        </>
    );
}

export default ListJob;