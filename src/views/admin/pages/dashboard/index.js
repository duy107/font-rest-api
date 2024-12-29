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
        const fetchApi = async () => {
            const statistics = await overview();
            if (statistics) {
                setStatistic(statistics);
            }
        }
        fetchApi();
    }, []);
    console.log(statistic);
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
                                    <div className="bg-red-200 rounded-md font-bold text-[30px] px-3 py-2 relative overflow-hidden before:content-[''] before:top-0 before:left-0 before:absolute before:w-1 before:h-full before:bg-red-500 text-white">{statistic.cvStatistic.initial} CV mới đang chờ duyệt</div>
                                </Col>
                                <Col span={24}>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto border-collapse border border-gray-300 w-full">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Tên công việc</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Lương</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    statistic.listCv.length > 0 ?
                                                        (
                                                            <>
                                                                {statistic.listCv.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td className="border border-gray-300 px-4 py-2">{item?.inforJob?.name}</td>
                                                                        <td className="border border-gray-300 px-4 py-2">{item?.inforUser?.email}</td>
                                                                        <td className="border border-gray-300 px-4 py-2">{item?.inforJob?.salary}</td>
                                                                    </tr>
                                                                ))}
                                                                <tr>
                                                                    <td className="border border-gray-300 px-4 py-2 text-[18px] font-medium text-right" colSpan={2}>Phí dịch vụ</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-[18px] font-medium">{statistic.listCv.length} triệu</td>
                                                                </tr>
                                                            </>
                                                        )
                                                        : (
                                                            <tr>
                                                                <td className="border border-gray-300 px-4 py-2 text-center font-medium text-[18px]" colSpan={3}>Chưa có CV nào được chấp nhận</td>
                                                            </tr>
                                                        )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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