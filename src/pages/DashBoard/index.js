import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CvStatistic from "./CvStatistic";
import InforCompany from "./InforCompany";
import "./style.scss";
function DashBoard() {
    return (
        <>
            {/* <Card title="Tổng quan" bordered={false}> */}
                    <h1>Tổng quan</h1>
                <Row gutter={[20, 20]}>
                    <Col span={8}>
                        <JobStatistic />
                    </Col>
                    <Col span={8}>
                        <CvStatistic />
                    </Col>
                    <Col span={8}>
                        <InforCompany />
                    </Col>
                </Row>
            {/* </Card> */}
        </>
    );
}

export default DashBoard;