function JobStatistic({ jobStatistic }) {
    return (
        <>
            <div className="w-full h-full bg-orange-400 rounded-md py-4 cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
                <h1 className="text-white text-[25px] text-center">Thống kê job</h1>
                <div className="mt-3 flex flex-col gap-2 text-center text-white">
                    <span className="text-[15px]">Số lượng job: <strong>{jobStatistic.total}</strong></span>
                    <span className="text-[15px]">Số đang bật: <strong>{jobStatistic.statusTrue}</strong></span>
                    <span className="text-[15px]">Số đang tắt: <strong>{jobStatistic.statusFalse}</strong></span>
                </div>
            </div>
        </>
    );
}

export default JobStatistic;