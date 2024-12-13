import { job_detail } from "../../../../services/client/job.services";
import { useState, useEffect } from "react";
import { Button, Tag } from "antd";
import { show } from "../../../../actions/formApply";
import FormApply from "./apply";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
function JobDetail() {
    const param = useParams().slug;
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.checkLogin);
    const [infor, setInfor] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await job_detail(param);
            if (res.code === 200) {
                setInfor(res.data);
            } else {
                setInfor({});
            }
        };
        fetchApi();
    }, []);
    return (
        <>
            {
                infor && (

                    <div className="container mx-auto">
                        <div className="grid grid-cols-3 ">
                            <div className="col-span-2 p-2 flex flex-col gap-2">
                                <div className="rounded-md bg-white p-4">
                                    <h2 className="text-[25px]">{infor.name}</h2>
                                    <div className="text-gray-400">
                                        <div>Quản lý bởi: {infor.companyInfor.name}</div>
                                        <div>Thời gian đăng bài: <strong>{moment(infor.createdAt).format("DD/MM/YYYY HH:mm:ss")}</strong></div>
                                        <div>Cập nhật gần nhất: <strong>{moment(infor.updateAt).format("DD/MM/YYYY HH:mm:ss")}</strong></div>
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-4 h-full">
                                    <h2 className="text-[25px]">Mô tả công việc</h2>
                                    <div dangerouslySetInnerHTML={{ __html: infor.description }} />
                                </div>
                            </div>
                            <div className="col-span-1 h-full">
                                <div className="p-2 flex flex-col gap-2">
                                    {isLogin && <div className="w-full center text-[20px] font-medium  border-sm text-[#C43820]  border-red-300 py-2 rounded-md cursor-pointer hover:bg-red-200 transition-colors duration-[300ms] ease-in-out" onClick={() => dispatch(show(true))} block={false}>Ứng tuyển ngay</div>}
                                    <div className="bg-white rounded-sm w-full">
                                        <div className="font-medium text-[18px] p-2">Thông tin chung</div>
                                        <div className="flex flex-col border-t p-2 gap-3">
                                            <div>
                                                <div className="font-medium text-[17px]">Năm kinh nghiệm tối thiểu</div>
                                                <span>Không yêu cầu</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-[17px]">Cấp bậc</div>
                                                <span>Fresher, Junior, Middle</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-[17px]">Loại hợp đồng</div>
                                                <span>Full time</span>
                                            </div>
                                            <div>
                                                <span>Ngôn ngữ: </span>
                                                {infor.tagInfor.map((item, index) => (
                                                    <Tag color="blue" key={index}>{item.name}</Tag>
                                                ))}
                                            </div>
                                            <div>
                                                <span>Thành phố: </span>
                                                {infor.cityInfor.map((item, index) => (
                                                    <Tag color="warning" key={index}>{item.name}</Tag>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    // <div className="job__detail">
                    //     <div className="job__title">
                    //         <h1>{infor.name}</h1>
                    //         {isLogin && <div><Button size="large" type="primary" onClick={() => dispatch(show(true))} block={false}>Ứng tuyển ngay</Button></div>}
                    //     </div>
                    //     <div className="job__language">
                    //         <span>Ngôn ngữ: </span>
                    //         {infor.tagInfor.map((item, index) => (
                    //             <Tag color="blue" key={index}>{item.name}</Tag>
                    //         ))}
                    //     </div>
                    //     <div className="job__city">
                    //         <span>Thành phố: </span>
                    //         {infor.cityInfor.map((item, index) => (
                    //             <Tag color="warning" key={index}>{item.name}</Tag>
                    //         ))}
                    //     </div>
                    //     <div className="job__salary">
                    //         Mức lương: <strong>{infor.salary}</strong>
                    //     </div>
                    //     <div className="job__name__city">
                    //         Tên công ty: <strong>{infor.companyInfor.name}</strong>
                    //     </div>
                    //     <div>Địa chỉ công ty: <strong>{infor.companyInfor.address}</strong></div>
                    //     <div>
                    //         Thời gian đăng bài: <strong>{moment(infor.createdAt).format("DD/MM/YYYY HH:mm:ss")}</strong>
                    //     </div>
                    //     <div>
                    //         <div>Mô tả công việc:</div>
                    //         {infor.description}
                    //     </div>
                    // </div>
                )
            }
            {infor && <FormApply job={infor} />}
        </>
    );
}

export default JobDetail;