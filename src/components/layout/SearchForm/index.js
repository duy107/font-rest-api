import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState, useEffect } from "react";
import { getListCity } from "../../../services/cityService";
import { useNavigate } from "react-router-dom";

function SearchForm() {
    const [listCity, setListCity] = useState([]);
    const navigate = useNavigate();
    // get list city
    useEffect(() => {
        const fethcApi = async () => {
            const data = await getListCity();
            if (data) {
                setListCity(
                    [
                        {
                            key: 0,
                            value: "All"
                        },
                        ...data
                    ]
                )
            }
        }
        fethcApi();
    }, [])

    const handleSubmit = (e) => {
        let city = e.city || "";
        city = e.city === "All" ? "" : city;
        navigate(`/result?city=${city}&keyword=${e.keyword || ""}`);
    }
    return (
        <>
            <h1>1000+ IT JOBS FOR DEVELOPERs</h1>
            {listCity && <Form onFinish={handleSubmit}>
                <Row gutter={[12, 12]}>
                    <Col span={4}>
                        <Form.Item name="city">
                            <Select placeholder="Chọn thành phố" options={listCity}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="keyword">
                            <Input placeholder="Nhập từ khóa"/>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>}
        </>
    );
}

export default SearchForm;