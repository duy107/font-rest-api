import {useState, useEffect} from "react";
import { getDetailCompany1} from "../../services/companyService";
import CompanyItem from "./CompanyItem";
import { Button, Row } from "antd";
import { Link } from "react-router-dom";
function CompanyList() {
    const [companyItem, setCompanyItem] = useState([]);
    
    useEffect(() => {
        const fetchApi = async () => { 
            const res = await getDetailCompany1(1);
            const res1 = await getDetailCompany1(2);
            const res2 = await getDetailCompany1(3);
            if(res){
                setCompanyItem(
                    [
                        res,
                        res1,
                        res2
                    ]
                );
            }
        }
        fetchApi();
    }, []);
    return (
        <>
            <h1>Danh sách một số công ty</h1>
            <Row gutter={[20, 20]}>
                {companyItem && companyItem.map(item => (
                    <CompanyItem item={item} key={item.id}/>
                ))}
            </Row>
            <Link to="/company" ><Button size="large" type="primary" style={{marginTop: "10px"}}>Xem thêm</Button></Link>
        </>
    );
}

export default CompanyList;