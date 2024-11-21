import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState, useEffect } from "react";
import { listTag } from "../../../../../services/admin/tag.services";
import { listCity } from "../../../../../services/admin/city.services";
import { useNavigate } from "react-router-dom";

function SearchForm() {
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchApi = async () => {
            const [listTags, listCities] = await Promise.all([listTag(), listCity()]);
            if (listTags.code === 200) {
                const tags = listTags.listTag.reduce((total, item) => {
                    return [
                        ...total,
                        {
                            label: item.name,
                            value: item._id
                        }
                    ]
                }, []);
                
                setTags(tags);
            }
            if (listCities.code === 200) {
                const cities = listCities.listCity.reduce((total, item) => {
                    return [
                        ...total,
                        {
                            label: item.name,
                            value: item._id
                        }
                    ]
                }, []);
                setCity(cities);
            }
        }
        fetchApi();
    }, []);

    const handleSubmit = (e) => {
        e.cities = e.cities || [];
        e.tags = e.tags || [];
        e.keyword = e.keyword || "";
        const queryParams = new URLSearchParams({
            cities: JSON.stringify(e.cities),
            tags: JSON.stringify(e.tags),
            keyword: e.keyword,
        }).toString();
    
        navigate(`/jobs?${queryParams}`);
    }
    return (
        <>
            <h1>1000+ IT JOBS FOR DEVELOPERs</h1>
            {listCity && <Form onFinish={handleSubmit}>
                <Row gutter={[12, 12]}>
                    <Col span={4}>
                        <Form.Item name="cities">
                            <Select placeholder="Chọn thành phố" options={city}  mode="multiple"/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="tags">
                            <Select placeholder="Chọn tag" options={tags}  mode="multiple"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="keyword">
                            <Input placeholder="Nhập tên công việc ...."/>
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