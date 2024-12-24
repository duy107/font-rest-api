import { Button, Form, Input, message } from "antd";
import { loginPost } from "../../../services/client/user.services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLock, FaUser } from "react-icons/fa";
import ForgetPassword from "../../ForgetPassword";
import { checkAuthen } from "../../../actions/checkLogin";
import { infor  } from "../../../actions/inforUser";
import { getCookie } from "../../../helpers/cookie";
function SiginUser() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rules = [
        {
            required: true,
            message: "Please enter this field!"
        }
    ]

    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             resolve(reader.result); // result là Base64
    //         };
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file); // Chuyển file thành Base64
    //     });
    // };
    // const avatarFile = e.avatar.fileList[0].originFileObj;

    // Đọc file avatar và chuyển thành buffer
    // const avatarBuffer = await convertToBase64(avatarFile);
    const handleSubmit = async (e) => {
        const res = await loginPost({
            email: e.email,
            password: e.password,
        });
        if (res.code === 200) {
            localStorage.setItem("infor", JSON.stringify(res.infor));
            dispatch(infor(res.infor));
            dispatch(checkAuthen(true));
            navigate("/");
        } else {
            messageApi.error(res.message);
        }
        // axios.post('http://localhost:3000/xampp/htdocs/demo/manageCv/index.php', e);
        // const res = await post("", e);
        // if (res.status) {
        //     messageApi.success(res.message);
        // }else{
        //     navigate('/');
        //     messageApi.error(res.message);
        // }
    }
    return (
        <>
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Email" name="email" rules={rules}>
                    <Input prefix={< FaUser />} placeholder="Email" autoComplete="current-email" />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                    <Input.Password prefix={< FaLock />} placeholder="Password" autoComplete="current-password" />
                </Form.Item>
                {/* <Form.Item name="avatar" label="Avatar" extra="Upload avatar">
                    <Upload name="avatar" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item> */}
                <Form.Item>
                    <Button htmlType="submit" className="btn__login btn__login--user">Đăng nhập</Button>
                </Form.Item>
            </Form>
            <ForgetPassword />
        </>
    );
}

export default SiginUser;