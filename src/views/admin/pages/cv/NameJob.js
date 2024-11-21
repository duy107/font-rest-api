import { useEffect, useState } from "react";
import { getDetailJob1, getListJob } from "../../services/jobService";

function NameJob({item}) {
    const [detailJob, setDetailJob] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailJob1(item.idJob);
            if(res){
                setDetailJob(res);
            }
        }
        fetchApi();
    }, []);
    return (
        <>
            <span>{detailJob.name}</span>
        </>
    );
}

export default NameJob;