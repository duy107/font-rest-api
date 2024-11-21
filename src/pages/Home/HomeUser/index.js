import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getListCvByUser } from "../../../services/cvService";
import { getDetailCompany1 } from "../../../services/companyService";
import { getDetailJob1 } from "../../../services/jobService";
import { del, get } from "../../../utilities/request";
import { useSelector } from "react-redux";
import * as cookie from "../../../helpers/cookie";
import { auth } from "../../../services/client/auth.services";
import { cvByIdUser } from "../../../services/client/cv.services";
function HomeUser() {
    const state = useSelector(state => state.checkLogin);
    const infor = useSelector(state => state.infor);
    const [listCV, setListCV] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const token = cookie.getCookie("tokenUser");
    const [check, setCheck] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await auth(token);
                if (res.code !== 200) {
                    cookie.deleteCookie("tokenUser");
                    setCheck(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const res = await getListCvByUser(idUser);
    //         if (res) {
    //             const jobAccepted = res.filter(item => item.accepted);
    //             const updatedCVs = await Promise.all(
    //                 jobAccepted.map(async (item) => {
    //                     const company = await getDetailCompany1(item.idCompany);
    //                     const job = await getDetailJob1(item.idJob);
    //                     return {
    //                         nameCompany: company.companyName,
    //                         nameJob: job.name
    //                     };
    //                 })
    //             );
    //             setListCV(updatedCVs);
    //         }
    //     }
    //     fetchApi();
    // }, [])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await cvByIdUser(infor._id);
            if (res.code === 200) {
                setListCV(res.data);
            }
        }
        state && token && check && fetchApi();
    }, []);
    const message = () => {
        return (
            <div>
                {listCV.map((item, index) =>
                (<div key={index}>
                    <strong> {item.companyInfor.name} </strong>đã chấp nhận CV của bạn vào vị trí <strong>{item.jobInfor.name}</strong>
                </div>)

                )}
            </div>
        );
    }
    useEffect(() => {
        listCV.length > 0 && (
            api.success({
                message: "Chúc Mừng",
                description: message(),
                placement: 'top',
                duration: 4
            })
        )
    }, [listCV]);
    // const handleDelete = async (id) => {
    //     const dele = await del(`${id}`);
    //     if(dele){
    //         navigator("/");
    //     }else{
    //         alert("ERROR");
    //     }
    //     // console.log(id);
    // }
    return (
        <>
            {contextHolder}
            <h1>Home user</h1>
            {(state && token && check) && <Link to={"/search-job"}><Button type="primary">Tìm kiếm job</Button></Link>}


            {/* new */}
            {/* <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link to={`/${item.id}`}><button className="btn btn-success btn-sm me-1">Update</button></Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

        </>
    );
}
export default HomeUser;