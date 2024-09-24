import { Card } from "antd";
import { getCookie } from "../../../helpers/cookie";
import { useState, useEffect } from "react";
import { getListCv } from "../../../services/cvService";

function CvStatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCv(idCompany);
            if (res) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                }
                obj.total = res.length;
                res.forEach(item => {
                    item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
                })
                setData(obj);
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            {data && <Card title="CV" className="card__item">
                <div className="card__infor">
                    <div>Số lượng CV: <strong>{data.total}</strong></div>
                    <div>Số CV đã đọc: <strong>{data.statusTrue}</strong></div>
                    <div>Số CV chưa đọc: <strong>{data.statusFalse}</strong></div>
                </div>
            </Card>}
        </>
    );
}

export default CvStatistic;