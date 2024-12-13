import { Col, Form, Row, Select } from "antd";
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
            {/* <div className="absolute inset-0 bg-[url('https://vieclam.thegioididong.com/uploads/img/news/228/anh-thumb-huong-dan-cach-viet-cv-chuan-nhat.jpg')]
                            w-full h-screen bg-center bg-cover z-0"
                style={{ filter: 'brightness(0.5)', backdropFilter: 'blur(3px)' }}
            >
            </div> */}
            <div className=" relative max-w-[500px] bg-white shadow-2xl rounded-md p-3 z-10 mx-auto mt-[50px]">
                <h1 className="text-[35px] text-center font-medium">1000+ IT JOBS FOR DEVELOPERS</h1>
                <div tag-suggest>Tìm kiếm: </div>
                {listCity && <Form onFinish={handleSubmit}>
                    <Row gutter={[3, 3]} className="items-center">
                        <Col span={24}>
                            <Form.Item name="cities">
                                <Select placeholder="Chọn thành phố" options={city} mode="multiple" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="tags">
                                <Select placeholder="Chọn tag" options={tags} mode="multiple" />
                            </Form.Item>
                        </Col>
                        <Col span={20}>
                            <Form.Item name="keyword">
                                <input type="text" class="border border-slate-300 focus:ring-sky-400 focus:ring-1 focus:border-sky-500 w-full outline-none px-3 rounded-md py-2  placeholder:italic placeholder:text-[15px]" placeholder="Nhập từ khóa cần tìm kiếm..."></input>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item>
                                <button className="inline-block px-2 py-1 rounded-md bg-purple-400 hover:bg-purple-500 transition-colors duration-500 ease-in-out text-white hover:text-gray-300" type="submit">Tim kiếm</button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>}
                <span className="mb-2 font-bold text-[15px]">Đề xuất từ khóa:</span>
                <div className="mt-2 w-full flex flex-nowrap items-center overflow-y-auto py-2">
                    {tags.length > 0 &&
                        tags.map((item) => (
                            <div className="mr-1 inline-block bg-green-300 text-white rounded-lg text-[15px] px-2 py-1 cursor-pointer hover:-translate-y-1 transition-transform ease-in-out">
                                {item.label}
                            </div>
                        ))}
                </div>

            </div>
        </>
    );
}

export default SearchForm;