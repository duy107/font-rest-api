import { Card } from "antd";
function CvStatistic({ cvStatistic }) {
    return (
        <>
            <Card title="CV" className="card__item">
                <div className="card__infor">
                    <div>Số lượng CV: <strong>{cvStatistic.total}</strong></div>
                    <div>Số CV đã đọc: <strong>{cvStatistic.statusTrue}</strong></div>
                    <div>Số CV chưa đọc: <strong>{cvStatistic.statusFalse}</strong></div>
                    <div>Số CV đã chấp nhận: <strong>{cvStatistic.statusAccept}</strong></div>
                </div>
            </Card>
        </>
    );
}

export default CvStatistic;