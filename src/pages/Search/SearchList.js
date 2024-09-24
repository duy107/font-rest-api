import { useState, useEffect } from "react";
import { getListCompany } from "../../services/companyService";
import { Col, Row } from "antd";
import JobItem from "../../components/JobItem";
function SearchList({ data }) {
    
    const [dataFinal, setDataFinal] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCompany();

            const newData = data.map(item => {
                const inforCompany = res.find(itemCompany => (itemCompany.id == item.idCompany));
                return {
                    inforCompany,
                    ...item
                }
            })
            setDataFinal(newData);
        }
        fetchApi();
    }, [])
    return (
        <>
            {
                dataFinal.length > 0 ? (
                    <Row gutter={[20, 20]}>
                        {dataFinal.map(item => (
                            <Col span={6} key={item.id}>
                                <JobItem item={item}/>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div>Không tìm thấy kết quả</div>
                )
            }
        </>
    );
}

export default SearchList;