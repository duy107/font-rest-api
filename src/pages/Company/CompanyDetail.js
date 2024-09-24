import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCompany1 } from "../../services/companyService";
import GoBack from "../../components/GoBack";
import { getListJob } from "../../services/jobService";
import { Col, Row } from "antd";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
    const params = useParams();
    const [data, setData] = useState({});
    const [listJob, setListJob] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailCompany1(params.id);
            if (res) {
                setData(res);
            }
        }
        fetchApi();
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListJob(data.id);
            if (res) {
                setListJob(res);
            }
        }
        fetchApi();
    }, [data]);
    return (
        <>
            <GoBack />
            {data && (
                <>
                    <Row gutter={20}>
                        <Col span={8}>
                            <div className="company__image">
                                <img src={data.logo} alt={data.companyName} />
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="company__infor">
                                <h3 className="company__name"><strong>{data.companyName}</strong></h3>
                                <div className="company__address">Địa chỉ: <strong>{data.address}</strong></div>
                                <div className="company__phone">Phone: <strong>{data.phone}</strong></div>
                                <div className="company__quantityPeople">Số nhân viên: <strong>{data.quantityPeople}</strong></div>
                                <div className="company__website">Link: <strong>{data.website}</strong></div>
                                <div className="company__timeworking">Ngày làm việc: <strong>{data.workingtime}</strong></div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="company__description">Thông tin công ty: <strong>{data.detail} </strong></div>
                        </Col>
                    </Row>
                </>
            )}
            <div className="list__job" style={{ marginTop: 10 }}>
                <Row gutter={[20, 20]}>
                    {listJob.length > 0 ?
                        (listJob.map(item => (
                            <Col key={item.id} span={6}>
                                <JobItem item={item} />
                            </Col>
                        ))) : (
                            <h1>Công ty chúng tôi hiện chưa có job.</h1>)}
                </Row>
            </div>
        </>
    );
}

export default CompanyDetail;