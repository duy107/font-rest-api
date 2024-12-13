import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { lists, search } from "../../../../../services/client/job.services";
import { Row, Tag } from "antd";
import JobItem from "../../../../../components/JobItem";
import { listTag } from "../../../../../services/admin/tag.services";
import { listCity } from "../../../../../services/admin/city.services";
import { IoIosArrowForward } from "react-icons/io";

function Result() {
    const [searchParams, _] = useSearchParams();
    const [listJob, setListJob] = useState([]);
    const [tagSearch, setTagSearch] = useState([]);
    const [citySearch, setCitySearch] = useState([]);
    const [jobs, setJobs] = useState([]);

    const listTagIds = JSON.parse(searchParams.get("tags"));
    const listCityIds = JSON.parse(searchParams.get("cities"));
    useEffect(() => {
        const fetchApi = async () => {
            const res = await lists();
            setJobs(res.data);
        }
        fetchApi();
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const [listTags, listCities] = await Promise.all([listTag(), listCity()]);
            setTagSearch(listTags.listTag.filter(item => listTagIds.some(id => item._id === id)));
            setCitySearch(listCities.listCity.filter(item => listCityIds.some(id => item._id === id)));
            const cities = JSON.stringify(searchParams.get("cities"));
            const tags = JSON.stringify(searchParams.get("tags"));
            const keyword = searchParams.get("keyword");
            const res = await search(`cities=${cities}&tags=${tags}&keyword=${keyword}`);
            if (res.code === 200) {
                setListJob(res.data);
            }
        }
        fetchApi();
    }, [jobs]);
    return (
        <>
            <div className="container">
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <div className="search flex flex-col gap-2">
                            {tagSearch.length > 0 &&
                                <div className="font-medium text-[15px]"> Tags:
                                    {tagSearch.map(item => (
                                        <Tag color="green" key={item._id}>{item.name}</Tag>
                                    ))}
                                </div>
                            }
                            {citySearch.length > 0 && 
                            <div className="font-medium text-[15px]"> Cites:  
                            {citySearch.map(item => (
                                <Tag color="orange" key={item._id}>{item.name}</Tag>
                            ))}
                            </div>
                            }
                            {listJob.length > 0 ? (
                                <Row gutter={[20, 20]}>
                                    {listJob.map(item => (
                                        <JobItem item={item} key={item._id} />
                                    ))}
                                </Row>
                            ) : (
                                <div className="w-full min-h-[80px] bg-transparent rounded-md shadow-lg flex flex-col lg:flex-row items-center gap-x-4 p-3 mt-3">
                                    <div className="aspect-[1/1] w-[100px] flex items-center justify-center">
                                        <img src="https://cdn.topdev.vn/v4/assets/images/common/not-found.svg"
                                            className="w-full object-cover"
                                        ></img>
                                    </div>
                                    <div className="flex-1 center md:text-left">
                                        <span className="mb-2 text-red-400 font-bold text-[20px] md:text-[25px]">Không tìm thấy công việc {searchParams.get("keyword")} phù hợp</span>
                                        <div className="text-[12px] sm:text-[15px]"> Công ty chưa tìm thấy công việc bạn tìm kiếm vào lúc này. </div>
                                        <div className="text-[12px] sm:text-[15px]"> Thử lại bằng cách áp dụng từ khóa và bộ lọc khác hoặc khám phá thêm các kết quả bên dưới! </div>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="h-full my-3 p-2">
                            <div className="font-bold text-[25px] mb-2">Một số công việc</div>
                            <Row gutter={[20, 20]}>
                                {jobs.length > 0 && jobs.map(item => (
                                    <JobItem item={item} key={item._id} />
                                ))}
                            </Row>
                        </div>
                    </div>
                    <div className="mx-2 col-span-1 w-full h-full p-2">
                        <h1 className="text-[25px] font-bold mb-2">Xu hướng hiện nay</h1>
                        <div className="grid grid-cols-1 gap-y-2">
                            <div className="col-span-1">
                                <div className="borde rounded-md overflow-hidden">
                                    <img className="w-full object-cover" src="https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2023/07/13220529/Artificial-Intelligence-in-Indonesia-The-current-state-and-its-opportunities.jpeg" />
                                    <div className="flex flex-col mt-2">
                                        <h1 className=" center text-[20px] text-red-500 font-bold">Trí Tuệ Nhân Tạo (AI)</h1>
                                        <ul className="list-disc pl-5">AI đang thay đổi cách thức tuyển dụng bằng cách:
                                            <li>Phân tích và sàng lọc hồ sơ nhanh chóng.</li>
                                            <li>Đánh giá ứng viên qua các bài kiểm tra tự động.</li>
                                            <li>Đưa ra đề xuất phù hợp với yêu cầu công việc.</li>
                                        </ul>
                                        <div className="flex justify-evenly mb-3">
                                            <div className="px-2 py-1 rounded-md bg-[#EDFBFF] text-[15px] text-[#4960B7]">Python</div>
                                            <div className="px-2 py-1 rounded-md bg-[#EDFBFF] text-[15px] text-[#4960B7]">R</div>
                                            <div className="px-2 py-1 rounded-md bg-[#EDFBFF] text-[15px] text-[#4960B7]">Java</div>
                                            <div className="px-2 py-1 rounded-md bg-[#EDFBFF] text-[15px] text-[#4960B7]">C++</div>
                                        </div>
                                        <div className="flex items-center min-h-[50px]">
                                            <div className=" cursor-pointer ml-2 py-1 px-2 rounded-md text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-110 transition-transform duration-[400ms] ease-in-out">
                                                Xem thêm
                                            </div>
                                            <div className="text-red-400 flex-1 text-right hover:text-[17px] text-[15px] transition-all ease-in-out duration-500 cursor-pointer">
                                                <span className="mr-1">Vị trí tuyển dụng</span>
                                                <IoIosArrowForward className="inline-block" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Result;  