import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailJob } from "../../services/jobService";
import { getDetailCompany } from "../../services/companyService";
import { Button, Tag } from "antd";
import FormApply from "./FormApply";
import { useDispatch } from "react-redux";
import { show } from "../../actions/formApply";
import "./style.scss";
import { getCookie } from "../../helpers/cookie";
function JobDetail() {
    const dispatch = useDispatch();
    const param = useParams();
    const [job, setJob] = useState();
    const isUser = getCookie("isUser");

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailJob(param.id);
            const inforCompany = await getDetailCompany(res[0].idCompany);
            setJob({
                infor: res,
                inforCompany
            })
        }
        fetchApi();
    }, [])


    //handle modal
    return (
        <>
            {
                job && (
                    <div className="job__detail">
                        <div className="job__title">
                            <h1>{job.infor[0].name}</h1>
                            {isUser && <div><Button size="large" type="primary" onClick={() => dispatch(show(true))} block={false}>Ứng tuyển ngay</Button></div>}
                        </div>
                        <div className="job__language">
                            <span>Ngôn ngữ: </span>
                            {job.infor[0].tags.map((item, index) => (
                                <Tag color="blue" key={index}>{item}</Tag>
                            ))}
                        </div>
                        <div className="job__city">
                            <span>Thành phố: </span>
                            {job.infor[0].city.map((item, index) => (
                                <Tag color="warning" key={index}>{item}</Tag>
                            ))}
                        </div>
                        <div className="job__salary">
                            Mức lương: <strong>{job.infor[0].salary}</strong>
                        </div>
                        <div className="job__name__city">
                            Tên công ty: <strong>{job.inforCompany[0].companyName}</strong>
                        </div>
                        <div>Địa chỉ công ty: <strong>{job.inforCompany[0].address}</strong></div>
                        <div>
                            Thời gian đăng bài: <strong>{job.infor[0].createAt}</strong>
                        </div>
                        <div>
                            <div>Mô tả công việc:</div>
                            {job.infor[0].description}
                        </div>
                    </div>
                )
            }
            <FormApply job={job} />
        </>
    );
}

export default JobDetail;