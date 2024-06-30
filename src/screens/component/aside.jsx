import React, { useState } from "react";
import myLogo from "../../assets/logoM.png";

import ic_setting from "../../assets/ic_gery/settings.svg";
import ic_report from "../../assets/ic_gery/report.svg";
// gery
import ic_home from "../../assets/ic_gery/home.svg";
import ic_listOrder from "../../assets/ic_gery/listOrder.svg";
import ic_hisSold from "../../assets/ic_gery/historySold.svg";
import ic_import from "../../assets/ic_gery/import.svg";
import ic_managePro from "../../assets/ic_gery/managePro.svg";
import ic_people from "../../assets/ic_gery/people.svg";
import ic_type from "../../assets/ic_gery/type.svg";

// fill
import ic_home_color from "../../assets/ic_fill/home.svg";
import ic_listOrder_color from "../../assets/ic_fill/listOrder.svg";
import ic_hisSold_color from "../../assets/ic_fill/historySold.svg";
import ic_import_color from "../../assets/ic_fill/import.svg";
import ic_managePro_color from "../../assets/ic_fill/managePro.svg";
import ic_people_color from "../../assets/ic_fill/people.svg";
import ic_type_color from "../../assets/ic_fill/type.svg";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { logoutUser } from "../../api/authAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Aside({ onItemSelected }) {
  const dispatch = useDispatch();
  const [isDropDownManage, setIsDropDownManage] = useState(false);
  const [isDropDownReport, setIsDropDownReport] = useState(false);

  const toggleDropDownManage = () => {
    setIsDropDownManage(!isDropDownManage);
    if (!isDropDownManage) {
      setIsDropDownReport(false);
    }
  };

  const toggleDropDownReport = () => {
    setIsDropDownReport(!isDropDownReport);
    if (!isDropDownReport) {
      setIsDropDownManage(false);
    }
  };

  const [selectedItem, setSelectedItem] = useState("ໜ້າຫຼັກ");

  // NavItem component
  const NavItem = ({
    iconSrc,
    iconCor,
    text,
    dropDown,
    isDropDown,
    toggleDropDown,
    onClick,
    manage,
  }) => (
    <nav
      className={` ${
        selectedItem === text ? "bg-primaryColor text-white" : "bg-white"
      }`}
    >
      <div
        className={`flex py-2 px-6 ${
          dropDown ? "justify-between items-center" : ""
        }`}
        onClick={dropDown ? toggleDropDown : onClick}
      >
        <div className="flex justify-center items-center">
          <img
            src={`${selectedItem === text ? iconCor : iconSrc}`}
            alt=""
            className="w-8 h-8"
          />
          <p className="pl-4 text-base font-semibold">{text}</p>
        </div>
        {dropDown ? (
          isDropDown ? (
            <IoIosArrowDown size={20} />
          ) : (
            <IoIosArrowBack size={20} />
          )
        ) : (
          ""
        )}
      </div>

      {/* manage  */}

      {manage ? (
        <div
          className={`overflow-hidden transition-max-height duration-700 pl-5 ${
            isDropDown ? "max-h-screen" : "max-h-0"
          }`}
        >
          <a
            href="#"
            className={`flex py-3 pl-6 items-center  ${
              selectedItem === "ຈັດການຂໍ້ມູນສິນຄ້າ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("manage-product");
              setSelectedItem("ຈັດການຂໍ້ມູນສິນຄ້າ");
            }}
          >
            <img
              src={`${
                selectedItem === "ຈັດການຂໍ້ມູນສິນຄ້າ"
                  ? ic_managePro_color
                  : ic_managePro
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ຈັດການຂໍ້ມູນສິນຄ້າ</p>
          </a>

          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ຈັດການຂໍ້ມູນພະນັກງານ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("manage-employee");
              setSelectedItem("ຈັດການຂໍ້ມູນພະນັກງານ");
            }}
          >
            <img
              src={`${
                selectedItem === "ຈັດການຂໍ້ມູນພະນັກງານ"
                  ? ic_people_color
                  : ic_people
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ຈັດການຂໍ້ມູນພະນັກງານ</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ຈັດການຂໍ້ມູນຜູ້ໃຊ້"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("customer-employee");
              setSelectedItem("ຈັດການຂໍ້ມູນຜູ້ໃຊ້");
            }}
          >
            <img
              src={`${
                selectedItem === "ຈັດການຂໍ້ມູນຜູ້ໃຊ້"
                  ? ic_people_color
                  : ic_people
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ຈັດການຂໍ້ມູນຜູ້ໃຊ້</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ຈັດການປະເພດສິນຄ້າ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("type");
              setSelectedItem("ຈັດການປະເພດສິນຄ້າ");
            }}
          >
            <img
              src={`${
                selectedItem === "ຈັດການປະເພດສິນຄ້າ" ? ic_type_color : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ຈັດການປະເພດສິນຄ້າ</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ຈັດການຜູ້ສະຫນອງ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("provider");
              setSelectedItem("ຈັດການຜູ້ສະຫນອງ");
            }}
          >
            <img
              src={`${
                selectedItem === "ຈັດການຜູ້ສະຫນອງ" ? ic_type_color : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ຈັດການຜູ້ສະຫນອງ</p>
          </a>
        </div>
      ) : (
        // report

        <div
          className={`overflow-hidden transition-max-height duration-700 pl-5 ${
            isDropDown ? "max-h-screen" : "max-h-0"
          }`}
        >
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານປະຫວັດການຂາຍ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-history");
              setSelectedItem("ລາຍງານປະຫວັດການຂາຍ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານປະຫວັດການຂາຍ"
                  ? ic_listOrder_color
                  : ic_listOrder
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານປະຫວັດການຂາຍ</p>
          </a>

          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານການນຳເຂົ້າສິນຄ້າ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-import");
              setSelectedItem("ລາຍງານການນຳເຂົ້າສິນຄ້າ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານການນຳເຂົ້າສິນຄ້າ"
                  ? ic_type_color
                  : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານການນຳເຂົ້າສິນຄ້າ</p>
          </a>

          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານຂໍ້ມູນສິນຄ້າ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-product");
              setSelectedItem("ລາຍງານຂໍ້ມູນສິນຄ້າ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານຂໍ້ມູນສິນຄ້າ"
                  ? ic_managePro_color
                  : ic_managePro
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານຂໍ້ມູນສິນຄ້າ</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານຂໍ້ມູນພະນັກງານ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-employee");
              setSelectedItem("ລາຍງານຂໍ້ມູນພະນັກງານ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານຂໍ້ມູນພະນັກງານ"
                  ? ic_people_color
                  : ic_people
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານຂໍ້ມູນພະນັກງານ</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານຂໍ້ມູນຜູ້ໃຊ້"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-customer");
              setSelectedItem("ລາຍງານຂໍ້ມູນຜູ້ໃຊ້");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານຂໍ້ມູນຜູ້ໃຊ້"
                  ? ic_people_color
                  : ic_people
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານຂໍ້ມູນຜູ້ໃຊ້</p>
          </a>

          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານປະເພດສິນຄ້າ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-type");
              setSelectedItem("ລາຍງານປະເພດສິນຄ້າ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານປະເພດສິນຄ້າ" ? ic_type_color : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານປະເພດສິນຄ້າ</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານຜູ້ສະຫນອງ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-supplier");
              setSelectedItem("ລາຍງານຜູ້ສະຫນອງ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານຜູ້ສະຫນອງ" ? ic_type_color : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານຜູ້ສະຫນອງ</p>
          </a>
          {/* laiy jai  */}
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານລາຍຈ່າຍ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-out");
              setSelectedItem("ລາຍງານລາຍຈ່າຍ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານລາຍຈ່າຍ" ? ic_type_color : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານລາຍຈ່າຍ</p>
          </a>
          <a
            href="#"
            className={`flex py-3 pl-6 items-center ${
              selectedItem === "ລາຍງານລາຍຮັບ"
                ? "bg-primaryColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              onItemSelected("report-in");
              setSelectedItem("ລາຍງານລາຍຮັບ");
            }}
          >
            <img
              src={`${
                selectedItem === "ລາຍງານລາຍຮັບ" ? ic_type_color : ic_type
              }`}
              alt=""
              className="w-8 h-8"
            />
            <p className="pl-4 text-sm font-semibold">ລາຍງານລາຍຮັບ</p>
          </a>
          <div className="h-12"></div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="h-screen flex flex-col justify-between w-96 p-3 bg-bgbg">
      <div className="pb-5 bg-white shadow-xl rounded-xl flex flex-col flex-grow">
        <div className="w-full flex justify-center items-center py-2">
          <img src={myLogo} alt="" className="w-36 h-36" />
        </div>

        <div className="pt-5 flex-grow">
          <NavItem
            iconSrc={ic_home}
            iconCor={ic_home_color}
            text="ໜ້າຫຼັກ"
            onClick={() => {
              onItemSelected("home");
              setSelectedItem("ໜ້າຫຼັກ");
            }}
          />
          <NavItem
            iconSrc={ic_listOrder}
            iconCor={ic_listOrder_color}
            text="ລາຍການສັ່ງຊື້"
            onClick={() => {
              onItemSelected("listOrder");
              setSelectedItem("ລາຍການສັ່ງຊື້");
            }}
          />
          <NavItem
            iconSrc={ic_hisSold}
            iconCor={ic_hisSold_color}
            text="ປະຫວັດການຂາຍ"
            onClick={() => {
              onItemSelected("historySold");
              setSelectedItem("ປະຫວັດການຂາຍ");
            }}
          />
          <NavItem
            iconSrc={ic_import}
            iconCor={ic_import_color}
            text="ການນຳເຂົ້າສິນຄ້າ"
            onClick={() => {
              onItemSelected("import");
              setSelectedItem("ການນຳເຂົ້າສິນຄ້າ");
            }}
          />

          <NavItem
            iconSrc={ic_managePro}
            iconCor={ic_managePro_color}
            text="ຈັດການ"
            dropDown={true}
            isDropDown={isDropDownManage}
            toggleDropDown={toggleDropDownManage}
            manage={true}
          />
          <NavItem
            iconSrc={ic_report}
            iconCor={ic_report}
            text="ລາຍງານ"
            dropDown={true}
            isDropDown={isDropDownReport}
            toggleDropDown={toggleDropDownReport}
            manage={false}
          />
        </div>

        <div className=" px-5">
          <div
            className="w-full flex justify-center items-center bg-bgbg p-2 rounded-lg"
            onClick={() => {
              Swal.fire({
                title: "ທ່ານຕ້ອງການອອກຈາກລະບົບ?",
                text: "ທ່ານຕ້ອງການອອກຈາກລະບົບບບໍ່!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ອອກຈາກລະບົບ ! ",
                cancelButtonText: "ຍົກເລີກ",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  dispatch(logoutUser());
                }
              });
            }}
          >
            <h1 className="pl-2 text-xl text-black ">ອອກຈາກລະບົບ</h1>
          </div>
          <div className="h-5"></div>
        </div>
      </div>
    </div>
  );
}

export default Aside;
