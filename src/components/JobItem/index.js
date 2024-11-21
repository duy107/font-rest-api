import { Card, Tag, Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.scss";
function JobItem({item}) {
    return (
        <>
            {/* {item.status && !item.accepted && ( */}
                <Col span={6}>
                    <Card size="small" title={<Link to={`${item.slug}`}>{item.name}</Link>} className="job__card">
                        <div className="job__item">
                            <div className="job__language">
                                <span>Ngôn ngữ: </span>
                                {item.tags.map((item, index) => (
                                    <Tag color="blue" key={index}>{item.name}</Tag>
                                ))}
                            </div>
                            <div className="job__city">
                                <span>Thành phố: </span>
                                {item.cities.map((item, index) => (
                                    <Tag color="warning" key={index}>{item.name}</Tag>
                                ))}
                            </div>
                            <div className="job__salary">
                                Lương: <strong>{item.salary}</strong>
                            </div>
                            {/* {item.inforCompany?.companyName && (
                                <div className="job__nameCity">
                                    Công ty: <strong>{item.inforCompany.companyName}</strong>
                                </div>
                            )} */}
                            {item.companyInfor.name && (
                                <div className="job__nameCity">
                                    Công ty: <strong>{item.companyInfor.name}</strong>
                                </div>
                            )}
                            <div className="job__date">Ngày tạo: <strong>{moment(item.createAt).format("DD/MM/YYYY HH:mm:ss")}</strong></div>
                        </div>
                    </Card>
                </Col>
            {/* )} */}
        </>
    );
}
export default JobItem;