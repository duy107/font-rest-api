import { Button, Form, Input, message } from "antd";
import * as user from "../../../services/userService";
import * as cookie from "../../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../../actions/checkLogin";
import { FaLock, FaUser } from "react-icons/fa";
import ForgetPassword from "../../ForgetPassword";
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
    const handleSubmit = async (e) => {
        const res = await user.login(e.email, e.password);
        if (res.length > 0) {
            cookie.setCookie("id-user", res[0].id, 1);
            cookie.setCookie("email-user", res[0].email, 1);
            cookie.setCookie("password-user", res[0].password, 1);
            cookie.setCookie("token", res[0].token, 1);
            cookie.setCookie("isUser", res[0].isUser, 1);
            dispatch(checkAuthen(true));
            navigate("/");
        } else {
            messageApi.error("Tài khoản hoặc mật khẩu không chính xác!");
        }
    }
    return (
        <>
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Email" name="email" rules={rules}>
                    <Input prefix={< FaUser />} placeholder="Email" />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                    <Input.Password prefix={< FaLock />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="btn__login btn__login--user">Đăng nhập</Button>
                </Form.Item>
            </Form>
            <ForgetPassword />
        </>
    );
}

export default SiginUser;