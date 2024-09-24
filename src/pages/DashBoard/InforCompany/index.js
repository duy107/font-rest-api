import { Card } from "antd";
import { getCookie } from "../../../helpers/cookie";
import { useState, useEffect } from "react";
import { getDetailCompany1 } from "../../../services/companyService";

function InforCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailCompany1(idCompany);
            if(res){
                setData(res);
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            {data && <Card title="Thông tin công ty" className="card__item">
                <div className="card__infor">
                    <div>Tên công ty:  <strong>{data.companyName}</strong></div>
                    <div>Email: <strong>{data.email}</strong></div>
                    <div>Số điện thoại: <strong>{data.phone}</strong></div>
                    <div>Số nhân viên: <strong>{data.quantityPeople}</strong></div>
                </div>
            </Card>}
        </>
    );
}

export default InforCompany;