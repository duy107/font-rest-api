import { Button, Form } from "react-bootstrap";
import { forgot } from "../../../../services/client/user.services";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Forgot() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const res = await forgot({ email });
        if (res.code === 200) {
            navigate("otp", {state: {email}});
        } else {
            messageApi.error(res.message);
        }
    }
    return (
        <>
            {contextHolder}
            <div className="pass__forgot">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Button
                        variant="primary" type="submit" >
                        Gửi OTP
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Forgot;