import "./style.scss";
import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CvStatistic from "./CvStatistic";
import InforCompany from "./InforCompany";
import { useState, useEffect } from "react";
import * as cookie from "../../../../helpers/cookie";
import { jwtDecode } from "jwt-decode";
import { overview } from "../../../../services/admin/overview.services";
function DashBoard() {
    const [statistic, setStatistic] = useState(null);
    useEffect(() => {
        try {
            console.log(cookie.getCookie("permission"));
            console.log(jwtDecode(cookie.getCookie("permission")));
        } catch (error) {
            console.log(new Error(error).message);
        }
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
                        <div className="container mx-auto p-3 rounded-md border shadow-md">
                            <div className="m-2 flex items-center">
                                <div className="font-bold text-[30px] flex-1">DASHBOARD</div>
                                <div className="border shadow-sm px-3 py-2 rounded-md bg-slate-300 inline-block">
                                    <span className="text-[15px] font-normal opacity-80">Xin chào, Admin</span>
                                </div>
                            </div>
                            <Row gutter={[20, 20]}>
                                <Col span={8}>
                                    <JobStatistic jobStatistic={statistic.jobStatistic} />
                                </Col>
                                <Col span={8}>
                                    <CvStatistic cvStatistic={statistic.cvStatistic} />
                                </Col>
                                <Col span={8}>
                                    <InforCompany infor={statistic.companyInfor} />
                                </Col>
                                <Col span={24}>
                                    <div className="bg-red-200 rounded-md font-bold text-[30px] px-3 py-2 relative overflow-hidden before:content-[''] before:top-0 before:left-0 before:absolute before:w-1 before:h-full before:bg-red-500 text-white">{statistic.cvStatistic.statusFalse} CV mới đang chờ duyệt</div>
                                </Col>
                            </Row>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default DashBoard;