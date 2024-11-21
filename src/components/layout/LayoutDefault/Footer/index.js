import "./style.scss";
import { Col, Container, Row } from "react-bootstrap";
import { CiFacebook } from "react-icons/ci";
import { FaGithub, FaYoutube  } from "react-icons/fa";
import "./style.scss";
function Footer() {
    return (
        <>
            <footer className="footer">
                <Container>
                    <Row className="p-3">
                        <Col className="text-center mb-4" xl={4} lg={4} md={6} sm={12}>
                            <div className="infor__company">
                                <div className="infor__company__logo">
                                    <img src="http://res.cloudinary.com/dxx1lgamz/image/upload/v1732164826/lydd0molalmluj0xfy02.jpg" alt="logojj"/>
                                </div>
                                <div className="infor__company__title">Công ty ABC</div>
                                <div className="infor__company__address">Dương luong</div>
                                <div className="infor__company__contact">Liên hệ: contact@abc.com</div>
                            </div>
                        </Col>
                        <Col className="text-center mb-4" xl={4} lg={4} md={6} sm={12}>
                            <div className="about">
                                <div className="title">
                                    Về ABC
                                </div>
                                <div>
                                    <a href="#">Về chúng tôi</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="text-center mb-4" xl={4} lg={4} md={12} sm={12}>
                            <div className="following">
                                <div className="title">
                                   Theo dõi chúng tôi
                                </div>
                                <div className="following__types">
                                    <div className="following__item"><CiFacebook /> </div> 
                                    <div className="following__item"><FaGithub /></div>
                                    <div className="following__item"><FaYoutube /></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <p>@2024 Công ty TNHH ABC. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}

export default Footer;