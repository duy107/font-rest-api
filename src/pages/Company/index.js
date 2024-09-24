import { useState, useEffect } from "react";
import { getListCompany } from "../../services/companyService";
import { Row } from "antd";
import CompanyItem from "../../components/CompanyList/CompanyItem";
import "./style.scss";
function Company() {
    const [listCompany, setListCompany] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCompany();
            if (res) {
                setListCompany(res);
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            <h1>Danh sách các công ty</h1>
            <Row gutter={[20, 20]}>
                {
                    listCompany && listCompany.map(item => (
                        <CompanyItem item={item} key={item.id}/>
                    ))
                }
            </Row>
        </>
    );
}

export default Company;