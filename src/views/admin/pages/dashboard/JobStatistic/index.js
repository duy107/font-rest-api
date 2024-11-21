import { Card } from "antd";
function JobStatistic({jobStatistic}) {
    return (
        <>
            <Card title="Job" className="card__item">
                <div className="card__infor">
                    <div>
                        Số lượng job: <strong>{jobStatistic.total}</strong>
                    </div>
                    <div>Số đang bật: <strong>{jobStatistic.statusTrue}</strong></div>
                    <div>Số đang tắt: <strong>{jobStatistic.statusFalse}</strong></div>
                </div>
            </Card>
        </>
    );
}

export default JobStatistic;