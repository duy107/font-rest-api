function InforCompany({infor}) {
    return (
        <>

            <div className="w-full h-full bg-green-500 rounded-md py-4 cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
                <h1 className="text-white text-[25px] text-center">Thông tin công ty</h1>
                <div class="mt-3 flex flex-col gap-2 text-center text-white">
                    <span class="text-[15px]">Tên công ty:  <strong>{infor.name}</strong></span>
                    <span class="text-[15px]">Email: <strong>{infor.email}</strong></span>
                    <span class="text-[15px]">Số điện thoại: <strong>{infor.phone}</strong></span>
                </div>
            </div>
        </>
    );
}

export default InforCompany;