// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEmployee } from "../api/employeeAPI/employeeAction";

function EmployeeReport() {
  const dispatch = useDispatch();
  const [employeeData, setEmplyeeData] = useState([]);
  const { employee } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(GetAllEmployee());
    setEmplyeeData(employee || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const supplierArray = employee || [];
  const totalPages = Math.ceil(supplierArray.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = supplierArray.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານພະນັກງານທັງຫມົດ</p>
      <div className="w-full h-3/4  border border-lineColor py-3 rounded-md flex flex-col justify-between mt-3">
        <div className="flex justify-between items-center px-5 pb-5">
          <p className="text-xl w-1/3">ລາຍການຂໍ້ມູນພະນັັດງານທັງຫມົດ</p>
          
        </div>
        <div className="border border-lineColor w-full py-3  bg-head flex justify-between items-center px-5 ">
          <p className="text-base font-light flex justify-center items-center w-1/12 ">
            ລຳດັບ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຊື່
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ນາມສະກຸນ
          </p>

          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຮູບພາບ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເພດ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເບີໂທ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ບ້ານ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເມືອງ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ແຂວງ
          </p>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
            key={index}
          >
            <p className="text-base font-light flex justify-center items-center w-1/12 ">
              {item.Emp_ID}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.First_name}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Last_name}
            </p>
            <img
              src={item.Profile_img}
              alt=""
              className="w-16 h-16 object-cover"
            />

            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.gender}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Phone_Number}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Village}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.District}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Province}
            </p>
          </div>
        ))}
        <div className="w-full flex justify-between px-5 my-3">
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={prevPage}
          >
            <p className="text-base font-light text-center ">ກັບຄືນ</p>
          </div>
          <div className="text-base font-light">
            {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, supplierArray.length)} of{" "}
            {supplierArray.length}
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

export default EmployeeReport;
