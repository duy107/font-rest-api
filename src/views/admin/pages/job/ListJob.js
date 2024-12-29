import { useEffect, useState } from "react";
import moment from "moment";
import { listJob as getListJob } from "../../../../services/admin/job-management.services";
import { Button, Table, Tag, notification } from "antd";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import DetailJob from "./DetailJob";
import { useSelector } from "react-redux";
import UpdateJob from "./Update";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

function ListJob() {
    const [api, contextHolder] = notification.useNotification();
    const [listJob, setListJob] = useState([]);
    const permission = useSelector(state => state.permission);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const fetchApi = async () => {
        const data = await getListJob();
        setListJob(data || []);
    }
    const displayNotification = (data) => {
        const { type, infor } = data;
        api[type](infor);
    }
    useEffect(() => {
        fetchApi();
    }, []);
    const handleReload = () => {
        fetchApi();
    };

    const handleTtableChang = (e) => {
        setCurrentPage(e.current);
        setPageSize(e.pageSize);
    }
    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngôn ngữ',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, record) =>
                (record.tags || []).map((item, index) => (
                    <Tag key={index} color="blue" style={{ marginBottom: 10 }}>{item.name}</Tag>
                ))
        },
        {
            title: 'Mức lương',
            dataIndex: "salary",
            key: 'salary',
            render: (_, record) =>
                <div>{record.salary}</div>
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
                return (record.status ? <Tag color="green">Đang tuyển dụng</Tag> : <Tag color="red">Ngừng tuyển dụng</Tag>)
            }
        },
        ,
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        {permission.includes("job_view") &&
                            <div><DetailJob item={record} reload={handleReload} /></div>
                        }
                        {permission.includes("job_edit") &&
                            <div style={{ margin: "10px 0px" }}>
                                <Link to={`/admin/job-management/update/${record._id}`}>
                                    <Button icon={< CiEdit />} type="primary" ghost ></Button>
                                </Link>
                            </div>
                        }
                        {permission.includes("job_delete") &&
                            <div> <DeleteJob item={record} reload={handleReload} displayNotification={displayNotification} /></div>
                        }

                    </>
                )
            }
        }
    ];
    return (
        <>
            {contextHolder}
            <Table dataSource={listJob}
                columns={columns}
                rowKey={"id"}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: listJob.length || 0,
                }}
                onChange={handleTtableChang}
            />
        </>
    );
}

export default ListJob;