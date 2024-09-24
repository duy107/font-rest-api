import { Card } from "antd";
import { getCookie } from "../../../helpers/cookie";
import { useState, useEffect } from "react";
import { getListJob } from "../../../services/jobService";

function JobStatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListJob(idCompany);
            if (res) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                }
                obj.total = res.length;
                res.forEach(item => {
                    item.status ? obj.statusTrue++ : obj.statusFalse++;
                })
                setData(obj);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data && <Card title="Job" className="card__item">
                <div className="card__infor">
                    <div>
                        Số lượng job: <strong>{data.total}</strong>
                    </div>
                    <div>Số đang bật: <strong>{data.statusTrue}</strong></div>
                    <div>Số đang tắt: <strong>{data.statusFalse}</strong></div>
                </div>
            </Card>}
        </>
    );
}

export default JobStatistic;