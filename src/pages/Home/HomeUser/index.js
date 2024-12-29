import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import image from './Group2.png';
import image1 from './anh3.jpg';
import image2 from './anh4.jpg';
import image3 from './anh5.jpg';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useSelector } from "react-redux";
import * as cookie from "../../../helpers/cookie";
import { auth } from "../../../services/client/auth.services";
// import { cvByIdUser } from "../../../services/client/cv.services";
import { GrGroup } from "react-icons/gr";
import { FiBarChart, FiCheckCircle } from "react-icons/fi";
import { GoZap } from "react-icons/go";

// init Swiper:
function HomeUser() {
    const state = useSelector(state => state.checkLogin);
    // const infor = useSelector(state => state.infor);
    // const [listCV, setListCV] = useState([]);
    // const [api, contextHolder] = notification.useNotification();
    const token = cookie.getCookie("tokenUser");
    const [check, setCheck] = useState(true);
    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            modules: [Navigation, Pagination, Autoplay],
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            }
        });
        const fetchApi = async () => {
            try {
                const res = await auth(token);
                if (res.code !== 200) {
                    cookie.deleteCookie("tokenUser");
                    setCheck(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);
    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const res = await cvByIdUser(infor._id);
    //         if (res.code === 200) {
    //             setListCV(res.data);
    //         }
    //     }
    //     state && token && check && fetchApi();
    // }, []);
    // const message = () => {
    //     return (
    //         <div>
    //             {listCV.map((item, index) =>
    //             (<div key={index}>
    //                 <strong> {item.companyInfor?.name} </strong>đã chấp nhận CV của bạn vào vị trí <strong>{item.jobInfor?.name}</strong>
    //             </div>)

    //             )}
    //         </div>
    //     );
    // }
    // useEffect(() => {
    //     listCV.length > 0 && (
    //         api.success({
    //             message: "Chúc Mừng",
    //             description: message(),
    //             placement: 'top',
    //             duration: 2
    //         })
    //     )
    // }, [listCV]);
    return (
        <>
            {/* {contextHolder} */}
            {(state && token && check) && <Link to={"/search-job"}><Button type="primary">Tìm kiếm job</Button></Link>}
            <div className="grid grid-cols-1 gap-y-[50px] mt-2">
                <div className="w-full col-span-1 relative">
                    <img src={image} className="w-full object-contain" />
                    <div className="absolute top-[50px] left-[100px] flex flex-col items-center max-w-[300px] text-center">
                        <div className="font-bold text-[25px] text-white">Manage your CVs with ABC Company</div>
                        <span>Streamline your recruitment process with our advanced CV management system. Organize, search, and analyze resumes effortlessly.</span>
                    </div>
                    <div className="absolute right-[60px] bottom-[10px] w-[500px] h-[200px]">
                        <div className="swiper w-full h-full">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide"><img src={image2} className="w-full h-full object-cover rounded-[5px]" /></div>
                                <div className="swiper-slide"><img src={image3} className="w-full h-full object-cover rounded-[5px]" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="max-w-[80%] mx-auto p-2">
                        <h2 className="ext-3xl font-bold text-center mb-4">Tính năng nổi bật</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div class="flex flex-col gap-2">
                                        <FiCheckCircle className="text-[50px] font-semibold" />
                                        <div>
                                            <h2 className="text-3xl font-bold font-poppins">Quản lý CV thông minh</h2>
                                            <span className="text-[14px]">Tự động phân loại và đánh giá CV ứng viên dựa trên các tiêu chí tùy chỉnh</span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm pl-0 opacity-80">
                                            <li>Phân tích ngôn ngữ tự nhiên</li>
                                            <li>Trích xuất kỹ năng và kinh nghiệm</li>
                                            <li>Đánh giá mức độ phù hợp</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div class="flex flex-col gap-2">
                                        <GrGroup className="text-[50px] font-semibold" />
                                        <div>
                                            <h2 className="text-3xl font-bold font-poppins">Cộng tác nhóm</h2>
                                            <span className="text-[14px]">Chia sẻ và đánh giá CV cùng đồng nghiệp trong thời gian thực</span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm pl-0 opacity-80">
                                            <li>Bình luận và ghi chú trực tiếp</li>
                                            <li>Phân quyền và quản lý vai trò</li>
                                            <li>Theo dõi lịch sử thay đổi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div class="flex flex-col gap-2">
                                        <FiBarChart  className="text-[50px] font-semibold" />
                                        <div>
                                            <h2 className="text-3xl font-bold font-poppins">Báo cáo chi tiết</h2>
                                            <span className="text-[14px]">Phân tích dữ liệu tuyển dụng với biểu đồ trực quan và insights</span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm pl-0 opacity-80">
                                            <li>Thống kê ứng viên theo nguồn</li>
                                            <li>Phân tích xu hướng kỹ năng</li>
                                            <li>Đánh giá hiệu quả tuyển dụng</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div class="flex flex-col gap-2">
                                        <GoZap className="text-[50px] font-semibold" />
                                        <div>
                                            <h2 className="text-3xl font-bold font-poppins">Tích hợp AI</h2>
                                            <span className="text-[14px]">Sử dụng AI để đề xuất ứng viên phù hợp và tự động hóa quy trình</span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm pl-0 opacity-80">
                                            <li>Gợi ý ứng viên phù hợp</li>
                                            <li>Tự động sắp xếp lịch phỏng vấn</li>
                                            <li>Chatbot hỗ trợ ứng viên 24/7</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="max-w-full mx-auto bg-[#F4F4F5] rounded-md p-2 min-h-[100px]">
                        <h2 className="text-3xl font-bold text-center mb-6 font-poppins">Quy trình làm việc</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-[#95D2F2] text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                                <h3 className="text-xl font-semibold mb-2">Tải lên CV</h3>
                                <p className="text-muted-foreground">Dễ dàng tải lên CV từ nhiều nguồn khác nhau hoặc sử dụng API tích hợp</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-[#95D2F2] text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                                <h3 className="text-xl font-semibold mb-2">Phân tích và đánh giá</h3>
                                <p className="text-muted-foreground">Hệ thống AI tự động phân tích và đánh giá CV dựa trên tiêu chí của bạn</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-[#95D2F2] text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                                <h3 className="text-xl font-semibold mb-2">Cộng tác và quyết định</h3>
                                <p className="text-muted-foreground">Chia sẻ kết quả với team, thảo luận và đưa ra quyết định tuyển dụng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="max-w-[80%] mx-auto p-2">
                        <h2 className="ext-3xl font-bold text-center mb-4">Khách hàng nói gì về chúng tôi</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div className="flex gap-x-2 items-center">
                                        <div className="rounded-full bg-gray-400 w-[50px] h-[50px]"></div>
                                        <div className="flex-1">
                                            <div className="text-xl font-semibold">Nguyễn Văn A</div>
                                            <span className="text-[13px] text-gray-400">HR Manager, Công ty XYZ</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 text[15px] text-gray-400">"ABC CV đã giúp chúng tôi tiết kiệm 50% thời gian trong quá trình sàng lọc CV. Thật tuyệt vời!"</div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div className="flex gap-x-2 items-center">
                                        <div className="rounded-full bg-gray-400 w-[50px] h-[50px]"></div>
                                        <div className="flex-1">
                                            <div className="text-xl font-semibold">Trần Thị B</div>
                                            <span className="text-[13px] text-gray-400">Giám đốc nhân sự, Tập đoàn LMN</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 text[15px] text-gray-400">"Hệ thống phân tích CV thông minh của ABC CV giúp chúng tôi tìm được những ứng viên phù hợp nhanh chóng và chính xác."</div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div className="flex gap-x-2 items-center">
                                        <div className="rounded-full bg-gray-400 w-[50px] h-[50px]"></div>
                                        <div className="flex-1">
                                            <div className="text-xl font-semibold">Lê Văn C</div>
                                            <span className="text-[13px] text-gray-400">BA, Công ty Sun</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 text[15px] text-gray-400">"ABC CV không chỉ giúp chúng tôi quản lý CV hiệu quả mà còn cung cấp những insights quý giá về xu hướng thị trường lao động."</div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="w-full border rounded-md p-4 h-full">
                                    <div className="flex gap-x-2 items-center">
                                        <div className="rounded-full bg-gray-400 w-[50px] h-[50px]"></div>
                                        <div className="flex-1">
                                            <div className="text-xl font-semibold">Phạm Văn F</div>
                                            <span className="text-[13px] text-gray-400">Backend Developer, Công ty FPT</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 text[15px] text-gray-400">"ABC CV đã giúp tôi có được công việc này. Tôi vô cùng biết ơn vì điều đó!"</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomeUser;