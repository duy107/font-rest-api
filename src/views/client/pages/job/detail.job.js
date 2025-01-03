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
    console.log(infor);
    return (
        <>
            {
                infor && (

                    <div className="container mx-auto">
                        <div className="flex gap-3">
                            <div className="w-[65%] p-2 flex flex-col gap-2">
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
                            <div className="w-[35%] h-fit sticky z-10 top-[92px]">
                                <div className="p-2 flex flex-col gap-2">
                                    {isLogin && !infor.deleted && infor.status && <div className="w-full center text-[20px] font-medium  border-sm text-[#C43820]  border-red-300 py-2 rounded-md cursor-pointer hover:bg-red-200 transition-colors duration-[300ms] ease-in-out" onClick={() => dispatch(show(true))} block={false}>Ứng tuyển ngay</div>}
                                    <div className="bg-white rounded-sm w-full">
                                        <div className="font-medium text-[18px] p-2">Thông tin chung</div>
                                        <div className="flex flex-col border-t p-2 gap-3">
                                            <div>
                                                <div className="font-medium text-[17px]">Năm kinh nghiệm tối thiểu</div>
                                                <span dangerouslySetInnerHTML={{ __html: infor.experience }}></span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-[17px]">Yêu cầu học vấn</div>
                                                <span dangerouslySetInnerHTML={{ __html: infor.level }}></span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-[17px]">Quyền lợi</div>
                                                <span dangerouslySetInnerHTML={{ __html: infor.benefit }}></span>
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
                )
            }
            {infor && <FormApply job={infor} />}
        </>
    );
}

export default JobDetail;
