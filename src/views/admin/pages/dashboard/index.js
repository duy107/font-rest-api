import "./style.scss";
import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CvStatistic from "./CvStatistic";
import InforCompany from "./InforCompany";
import { useState, useEffect } from "react";
import { overview } from "../../../../services/admin/overview.services";
function DashBoard() {
    const [statistic, setStatistic] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const statistics = await overview();
            if (statistics) {
                setStatistic(statistics);
            }
        }
        fetchApi();
    }, []);
    return (
        <>
            {
                statistic && (
                    <>
                        <h1>Tổng quan</h1>
                        <Row gutter={[20, 20]}>
                            <Col span={8}>
                                <JobStatistic jobStatistic={statistic.jobStatistic}/>
                            </Col>
                            <Col span={8}>
                                <CvStatistic cvStatistic={statistic.cvStatistic}/>
                            </Col>
                            <Col span={8}>
                                <InforCompany infor={statistic.companyInfor}/>
                            </Col>
                        </Row>
                    </>
                )
            }
        </>
    );
}

export default DashBoard;