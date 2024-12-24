function CvStatistic({ cvStatistic }) {
    return (
        <>
            <div className="w-full h-full bg-cyan-400 rounded-md py-4 cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
                <h1 className="text-white text-[25px] text-center">Thống kê CV</h1>
                <div className="mt-3 flex flex-col gap-2 text-center text-white">
                    <span className="text-[15px]">Số lượng CV: <strong>{cvStatistic.total}</strong></span>
                    <span className="text-[15px]">Số CV đã đọc: <strong>{cvStatistic.statusTrue}</strong></span>
                    <span className="text-[15px]">Số CV đã chấp nhận: <strong>{cvStatistic.statusAccept}</strong></span>
                </div>
            </div>
        </>
    );
}

export default CvStatistic;