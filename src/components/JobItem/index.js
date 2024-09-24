import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
function JobItem({ item }) {
    return (
        <>
            <Card size="small" title={<Link to={`/jobs/${item.id}`}>{item.name}</Link>} className="job__card">
                <div className="job__item">
                    <div className="job__language">
                        <span>Ngôn ngữ: </span>
                        {item.tags.map((item, index) => (
                            <Tag color="blue" key={index}>{item}</Tag>
                        ))}
                    </div>
                    <div className="job__city">
                        <span>Thành phố: </span>
                        {item.city.map((item, index) => (
                            <Tag color="warning" key={index}>{item}</Tag>
                        ))}
                    </div>
                    <div className="job__salary">
                        Lương: <strong>{item.salary}</strong>
                    </div>
                    {item.inforCompany?.companyName && (
                        <div className="job__nameCity">
                            Công ty: <strong>{item.inforCompany.companyName}</strong>
                        </div>
                    )}
                    <div className="job__date">Ngày tạo: <strong>{item.createAt}</strong></div>
                </div>
            </Card>
        </>
    );
}
export default JobItem;