import {useState, useEffect} from "react";
import { getListTag } from "../../services/tagService";
import { Link } from "react-router-dom";
import { Tag } from "antd";

function SkillList() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getListTag();
            if(data){
                setTags(data);
            }
        }
        fetchApi();
    }, []);

    return (
        <>
            <div className="tag__list">
                {tags && tags.map(item => (
                    <Link to={`/result?keyword=${item.value || ""}`} key={item.key}>
                        <Tag color="blue">{item.value}</Tag>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default SkillList;