import { Col } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
function CompanyItem({item}) {
    return (
        <>
                <Col span={8}>
                        <Link to={`/company/${item.id}`}>
                           <div className="company__item">
                                <div className="company__header">
                                    <div className="company__name">
                                        {item.companyName}
                                    </div>
                                    <div className="company__logo">
                                        <img src={item.logo} alt={item.nameCompany}/>
                                    </div>
                                </div>
                                <div className="company__body">
                                    <div className="company__email">Email: <strong>{item.email}</strong></div>
                                    <div className="company__phone">Liên hệ: <strong>{item.phone}</strong></div>
                                    <div className="company__description">Giới thiệu: <strong>{item.description}</strong></div>
                                </div>
                           </div>
                        </Link>
                </Col>
        </>
    );
}

export default CompanyItem;