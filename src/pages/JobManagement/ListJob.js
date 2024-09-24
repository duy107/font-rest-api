import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListJob } from "../../services/jobService";
import { Button, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";

function ListJob() {
    const idCompany = getCookie("id");
    const [listJob, setListJob] = useState([]);

    const fetchApi = async () => {
        const data = await getListJob(idCompany);
        if (data) {
            setListJob(data);
        }
    }
    useEffect(() => {
        fetchApi();
    }, []);
    const handleReload = () => {
        fetchApi();
    }
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
                    <Tag key={index} color="blue" style={{marginBottom: 10}}>{item}</Tag>
                ))
        },
        {
            title: 'Mức lương',
            key: 'salary',
            render: (_, record) => {
                return record.salary;
            }
        },
        {
            title: 'Thời gian',
            key: 'typeRoom',
            render: (_, record) => (
                <>
                    <small>Ngày tạo:{record.createAt}</small>
                    <br />
                    <small>Cập nhật: {record.updateAt}</small>
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
                        <div><Link to={`/detail-job/${record.id}`}><Button icon={<FaRegEye/>}></Button></Link></div>
                        <div style={{margin: "10px 0px"}}><EditJob item={record} reload={handleReload} /></div>
                        <div> <DeleteJob item={record} reload={handleReload} /></div>
                    </>
                )
            }
        }
    ];
    return (
        <>
            <Table dataSource={listJob} columns={columns} rowKey={"id"} />
        </>
    );
}

export default ListJob;