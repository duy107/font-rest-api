import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "../../../../../services/client/job.services";
import { Row, Tag } from "antd";
import JobItem from "../../../../../components/JobItem";
import { listTag } from "../../../../../services/admin/tag.services";
import { listCity } from "../../../../../services/admin/city.services";
function Result() {
    const [searchParams, _] = useSearchParams();
    const [listJob, setListJob] = useState([]);
    const [tagSearch, setTagSearch] = useState([]);
    const [citySearch, setCitySearch] = useState([]);

    const listTagIds = JSON.parse(searchParams.get("tags"));
    const listCityIds = JSON.parse(searchParams.get("cities"));
    useEffect(() => {
        const fetchApi = async () => {
            const [listTags, listCities] = await Promise.all([listTag(), listCity()]);
            setTagSearch(listTags.listTag.filter(item => listTagIds.some(id => item._id === id)));
            setCitySearch(listCities.listCity.filter(item => listCityIds.some(id => item._id === id)));
            const cities = JSON.stringify(searchParams.get("cities"));
            const tags = JSON.stringify(searchParams.get("tags"));
            const keyword = searchParams.get("keyword");
            const res = await search(`cities=${cities}&tags=${tags}&keyword=${keyword}`);
            if (res.code === 200) {
                setListJob(res.data);
            }
        }
        fetchApi();
    }, []);
    return (
        <>
            <div className="container">
                <div className="search">
                    <div className="search__title">Kết quả tìm kiếm: {searchParams.get("keyword")}</div>
                    {tagSearch.length > 0 && tagSearch.map(item => (
                        <Tag color="green" key={item._id}>{item.name}</Tag>
                    ))}
                    {citySearch.length > 0 && citySearch.map(item => (
                        <Tag color="orange" key={item._id}>{item.name}</Tag>
                    ))}
                    {listJob.length > 0 ? (
                        <Row gutter={[20, 20]}>
                            {listJob.map(item => (
                                <JobItem item={item} key={item._id} />
                            ))}
                        </Row>
                    ) : (
                        <h1>Khong tim thay cong viec</h1>
                    )}

                </div>
            </div>
        </>
    );
}

export default Result;  