import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cvByIdUser } from "../../../../services/client/cv.services";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Table, Tag } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

function ListCv() {
    const [listCv, setListCv] = useState(null);
    const infor = useSelector(state => state.infor);
    const [status, setStatus] = useState("all");
    const fetchApi = async (type) => {
        const res = await cvByIdUser(infor._id, type);
        if (res.code === 200) {
            setListCv(res.data);
        }
    }
    useEffect(() => {
        fetchApi(status);
    }, [status]);
    console.log(listCv);
    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: "idJob",
            key: 'idJob',
            render: (_, record) => (
                <span
                    className="cursor-pointer hover:no-underline hover:text-blue-400"
                    onClick={() => window.location.href = `/jobs/${record?.jobInfor?.slug}`}
                >
                    {record?.jobInfor?.name}
                </span>
            )
        },
        {
            title: 'Lương',
            dataIndex: "salary",
            key: 'salary',
            render: (_, record) => (
                <span>{record?.jobInfor?.salary}</span>
            )
        },
        {
            title: 'Thời gian gửi',
            dataIndex: "createdAt",
            key: 'createdAt',
            render: (_, record) => (
                <span>{moment(record.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
            )
        },
        {
            title: 'Thời gian phản hồi',
            dataIndex: "updateAt",
            key: 'updateAt',
            render: (_, record) => (
                <span>{moment(record.updateAt).format("DD/MM/YYYY HH:mm:ss")}</span>
            )
        },
        {
            title: "Trạng thái",
            key: "status",
            render: (_, record) => (
                record?.status == "initial" ? (<Tag >Chưa duyệt</Tag>) : record?.status == "accepted" ? (<Tag color="green">Đã chấp nhận</Tag>) : <Tag color="red">Đã từ chối</Tag>
            )
        }
    ];
    const handleChange = (e) => {
        // Array.from(e.target).map(item => {
        //     if(item.selected) {
        //         fetchApi(item.value)
        //     }
        // })
        setStatus(e.target.value);
    }
    return (
        <>
            {listCv &&
                <>
                    <select className="mb-[15px] px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="status" onChange={handleChange}>
                        <option value="all" className="text-gray-700" selected>Tất cả</option>
                        <option value="accepted" className="text-green-600">Đã chấp nhận</option>
                        <option value="refused" className="text-red-600">Đã từ chối</option>
                        <option value="initial" className="text-gray-500">Chưa duyệt</option>
                    </select>
                    <Table columns={columns} dataSource={listCv} rowKey={"key"} />
                </>
            }
        </>
    );
}

export default ListCv;