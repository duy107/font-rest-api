import { login, loginGet } from "../../../services/admin/company.services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../../actions/checkLogin";
import { message } from "antd";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { CiUser, CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
function CompanySigin() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);
    const isLogin = async () => {
        const res = await loginGet();
        if (res.code === 400) {
            navigate("/admin/overview");
            return;
        }
    }
    isLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const res = await login({ email, password });
        if (res.code === 200) {
            dispatch(checkAuthen(true));
            navigate("/admin/overview");
        } else {
            messageApi.error(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <CiUser />
                        </InputGroup.Text>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <CiLock />
                        </InputGroup.Text>
                        <Form.Control type={showPass ? "text" : "password"} placeholder="Password" required />
                        <InputGroup.Text onClick={() => setShowPass(!showPass)}>
                            {showPass ? (<FaEye />) : (< FaEyeSlash />)}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default CompanySigin;