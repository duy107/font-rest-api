import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
function Footer() {
    return (
        <>
            <footer className="bg-gray-300 mt-7">
                <div className="container mx-auto">
                    <div className="flex gap-2 max-w-[80%] mx-auto py-[30px] px-[10px]">
                        <div className="w-1/3">
                            <h2 className="text-[20px] font-medium">Địa chỉ</h2>
                            <div>Số 1 Giang Văn Minh, phường Kim Mã, quận Ba Đình, Hà Nội.</div>
                        </div>
                        <div className="w-1/3 flex flex-col items-center">
                            <h2 className="text-[20px] font-medium">Về chúng tôi</h2>
                            <div>Liên hệ</div>
                            <div>Cơ hội việc làm</div>
                            <div>Quy định bảo mật</div>
                            <div>Thỏa thuận sử dụng</div>
                        </div >
                        <div class="w-1/3 flex flex-col items-center">
                            <h2 className="text-[20px] font-medium">Theo dõi chúng tôi tại</h2>
                            <div class="flex gap-2 text-[40px]">
                                <FaYoutube />
                                <FaLinkedin />
                                <FaFacebookSquare />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 p-8 mt-8">
                        <span>@2024 Công ty TNHH ABC. All rights reserved.</span>
                        <div className="flex gap-4">
                            <span><MdOutlineEmail className="inline-block" /> contact@abc.com</span>
                            <span><FiPhoneCall className="inline-block" /> +12 345 6789</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;