import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { useState, useEffect } from "react";
import { getListCvByUser } from "../../../services/cvService";
import { getDetailCompany1 } from "../../../services/companyService";
import { getDetailJob1 } from "../../../services/jobService";
function HomeUser() {
    const isUser = getCookie("isUser");
    const idUser = getCookie("id-user");
    const [listCV, setListCV] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCvByUser(idUser);
            if (res) {
                const jobAccepted = res.filter(item => item.accepted);
                const updatedCVs = await Promise.all(
                    jobAccepted.map(async (item) => {
                        const company = await getDetailCompany1(item.idCompany);
                        const job = await getDetailJob1(item.idJob);
                        return {
                            nameCompany: company.companyName,
                            nameJob: job.name
                        };
                    })
                );
                setListCV(updatedCVs);
            }
        }
        fetchApi();
    }, [])

    const message = () => {
        return (
            <div>
                {listCV.map((item, index) => (
                    <div key={index}>
                       <strong> {item.nameCompany} </strong>đã chấp nhận CV của bạn vào vị trí <strong>{item.nameJob}</strong>
                    </div>
                ))}
            </div>
        );
    }
    useEffect(() => {
        listCV.length > 0 && (
            api.success({
                message: "Chúc Mừng",
                description: message(),
                placement: 'top',
                duration: 2
            })
        )
    }, [listCV])

    return (
        <>
            {contextHolder}
            <h1>Home user</h1>
            {!!isUser && <Link to={"/search-job"}><Button type="primary">Tìm kiếm job</Button></Link>}
        </>
    );
}

export default HomeUser;