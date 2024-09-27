import { Button, Table, Tag } from "antd";
import { getCookie } from "../../helpers/cookie";
import { getListCv } from "../../services/cvService";
import {useState, useEffect} from "react";
import DeleteCV from "./DeleteCV";
import NameJob from "./NameJob";
import CvDetail from "../CvDetail";

function ListCV() {
    const idCompany = getCookie("id");
    const [listCV, setListCV] = useState([]);

    const fetchApi =  async () => {
        const res = await getListCv(idCompany);
        if(res){
            setListCV(res);
        }
    }
    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => {
        fetchApi();
    }
    const columns = [
        {
            title: 'Tên jobs',
            dataIndex: "idJob",
            key: 'idJob',
            render: (_, record) => (
                <NameJob item={record}/>
            )
        },
        {
            title: 'Họ tên',
            dataIndex: "name",
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: "phone",
            key: 'phone'
        },
        {
            title: 'Ngày gửi',
            dataIndex: "createAt",
            key: 'createAt'
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
                        <div style={{marginBottom: 10}}>
                            {/* <Link to={`/detail-cv/${record.id}`}><Button icon={<FaRegEye/>}></Button></Link> */}
                            <CvDetail id={record.id} reload={handleReload}/>
                        </div>
                        <DeleteCV item={record} reload={handleReload}/>
                    </>
                )
            }
        }
    ];
    return (
        <>
            <Table columns={columns} dataSource={listCV} rowKey={"id"}/>
        </>
    );
}

export default ListCV;