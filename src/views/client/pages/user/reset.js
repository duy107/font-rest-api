import { Button, FloatingLabel, Form } from "react-bootstrap";
import { reset } from "../../../../services/client/user.services";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Reset() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    useEffect(() => {
        if(!email){
            navigate("/forgot");
        }
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const pass = {
            email: email,
            password: e.target[0].value,
            confirm: e.target[1].value
        };
        const res = await reset(pass);
        if (res.code === 200) {
            navigate("/login");
        } else {
            messageApi.error(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingNewPassword" label="New password" className='mb-3'>
                    <Form.Control type="password" placeholder='New password' required/>
                </FloatingLabel>

                <FloatingLabel controlId="floatingConfirmNewPassword" label="Confirm password" className='mb-3'>
                    <Form.Control type="password" placeholder='Confirm password' required/>
                </FloatingLabel>

                <Button variant="primary" type="submit" className="w-100">
                    Đổi mật khẩu
                </Button>
            </Form>
        </>
    );
}

export default Reset;