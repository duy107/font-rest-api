import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { Tag } from "antd";
import "./style.scss"

import { getAllJob } from "../../services/jobService";
import SearchList from "./SearchList";
function Search() {
    const [data, setData] = useState();

    // get param from API
    const [searchParams, _] = useSearchParams();
    const cityParam = searchParams.get("city") || "";
    const keywordParam = searchParams.get("keyword") || "";

    useEffect(() => {
        const fethcApi = async () => {
            const res = await getAllJob();
            if (res) {
                const newData = res.filter(item => {
                    const city = cityParam ? item.city?.includes(cityParam) : true;
                    const keyword = keywordParam ? item.tags?.includes(keywordParam) : true;
                    const status = item.status;
                    return status && city && keyword;
                });
                setData(newData);
            }
        }
        fethcApi();
    }, [])

    return (
        <>
            <div className="container">
                <div className="search">
                    <div className="search__title">Kết quả tìm kiếm: </div>
                    {cityParam && <Tag color="green">{cityParam}</Tag>}
                    {keywordParam && <Tag color="green">{keywordParam}</Tag>}
                    {data && <SearchList data={data} />}
                </div>
            </div>
        </>
    );
}

export default Search;  