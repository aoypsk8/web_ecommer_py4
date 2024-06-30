// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import "../../App.css";
import HistorySoldModalComponent from "./modal/historySoldModal";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSale } from "../../api/saleAPI/saleAction";
function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`; // Format as HH:mm
};

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

function HistoryScreen() {
  const dispatch = useDispatch();
  const [saleData, setSaleData] = useState([]);
  const [orderInsideData, setOrderInsideData] = useState([]);
  const [total, setTotal] = useState();
  const [imgPay, setImgPay] = useState();
  const { sale } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(GetAllSale());
    setSaleData(sale || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const saleArray = sale || [];
  const totalPages = Math.ceil(saleArray.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = saleArray.slice(indexOfFirstItem, indexOfLastItem);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle next and previous page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-10">
      {isModalOpen === true && (
        <HistorySoldModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          imgPay={imgPay}
          sale={orderInsideData}
          total={total}
        />
      )}
      <p className=" mb-10 text-5xl">ປະຫວັດການຂາຍ</p>
      <div className="w-full  h-[600px] border border-lineColor py-3 rounded-md flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center px-5">
            <p className="text-xl w-1/3">ລາຍການຂາຍທັງຫມົດ</p>
            <div className=" border w-1/5 border-lineColor px-5 py-2 rounded-md flex items-center justify-between">
              <div className=" flex items-center">
                <LuCalendarSearch size={30} color="#625F5F" />
                <div className="w-full rounded text-start ml-2 text-unSelectText">
                  19/02/2024
                </div>
              </div>
              <IoIosArrowDown size={25} color="#625F5F" />
            </div>
          </div>
          <div className="border border-lineColor w-full py-3 mt-3 bg-head flex justify-between items-center px-5 ">
            <p className="text-base font-light w-1/6">ລຳດັບ</p>
            <p className="text-base font-light w-1/4">ເວລາ</p>
            <p className="text-base font-light w-1/6">ວັນທີ</p>
            <p className="text-base font-light w-1/4">ສະຖານທີຈັດສົ່ງ</p>
            <p className="text-base font-light w-1/6">ສັ່ງຊື້ໂດຍ</p>
            <p className="text-base font-light w-1/6">ຍອດລວມ</p>
            <p className="text-base font-light w-1/6">ສະຖານະ</p>
          </div>
          {currentItems.map((item, index) => (
            <div
              className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
              onClick={() => {
                openModal();
                setOrderInsideData(item.products);
                setTotal(item.total);
                setImgPay(item.ImagePay);
              }}
            >
              <p className="text-base font-light w-1/6">{index + 1}</p>
              <p className="text-base font-light w-1/4">
                {formatTime(item.order_date)}
              </p>
              <p className="text-base font-light w-1/6">
                {formatDate(item.order_date)}
              </p>
              <p className="text-base font-light w-1/4">{item.Location}</p>
              <p className="text-base font-light w-1/6">{item.Cus_name}</p>
              <p className="text-xl font-light w-1/6">
                {formatNumber(item.total)} ກີບ
              </p>
              {item.status == false ? (
                <p className="text-base font-light w-1/6 text-primaryColor">
                  ລໍຖ້າດຳເນີນການ...
                </p>
              ) : (
                <p className="text-base font-light w-1/6 text-greenBottle">
                  ສຳເລັດ
                </p>
              )}{" "}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between px-5">
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={prevPage}
          >
            <p className="text-base font-light text-center ">ກັບຄືນ</p>
          </div>
          <div className="text-base font-light">
            {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, saleArray.length)} of {saleArray.length}
          </div>
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={nextPage}
          >
            <p className="text-base font-light text-center ">ຕໍ່ໄປ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryScreen;
