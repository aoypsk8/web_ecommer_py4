import React, { useEffect, useState } from "react";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { UpdateEmployee } from "../../../api/employeeAPI/employeeAction";
// Product Management Modal Component
const EmployeeManageEditModal = ({
  isOpen,
  onClose,
  Emp_ID,
  First_name,
  Last_name,
  gender,
  Roles,
  Village,
  District,
  Province,
  Phone_Number,
  Password,
  Product_img,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    Emp_ID: Emp_ID,
    First_name: First_name,
    Last_name: Last_name,
    gender: gender,
    Roles: Roles,
    Village: Village,
    District: District,
    Province: Province,
    Phone_Number: Phone_Number,
    Password: Password,
    Product_img: Product_img,
  });
  const [imageFile, setImageFile] = useState(Product_img);
  const [imagePreview, setImagePreview] = useState(Product_img);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setImageFile(e.target.files[0]); // File object to be used for form-data
      setImagePreview(URL.createObjectURL(file)); // Data URL for preview
      console.log("Image file state after update:", file); // Log file object for debugging
    }
  };

  useEffect(() => {
    console.log("imageFile state:", imageFile);
  }, [imageFile]);

  const triggerFileInput = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = () => {
    var data = dispatch(
      UpdateEmployee(
        value.Emp_ID,
        value.First_name,
        value.Last_name,
        value.gender,
        value.Roles,
        value.Village,
        value.District,
        value.Province,
        value.Phone_Number,
        value.Password,
        imageFile
      )
    );
    console.log(data);
  };

  return (
    <div className="modal-overlay ">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ເພີ່ມພະນັກງານ (ແກ້ໄຂ)</p>
          </div>
          <div className="w-full my-5  ">
            <div className="w-full flex justify-center">
              <div className="w-2/3 px-32 justify-between grid grid-cols-2  ">
                <div className=" pr-5">
                  <p className="text-xl ">ລະຫັດພະນັກງານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Emp_ID"
                      name="Emp_ID"
                      type="text"
                      required=""
                      placeholder="ລະຫັດພະນັກງານ"
                      value={value.Emp_ID}
                      disabled="true"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ຮູບພາບ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="hidden"
                      id="image"
                      name="image"
                      type="file"
                      required
                      onChange={handleFileChange}
                    />
                    <button
                      className="w-full py-2 px-5 rounded text-start bg-gray-200 hover:bg-gray-300"
                      onClick={triggerFileInput}
                    >
                      ເລືອກຮູບພາບ
                    </button>
                  </div>
                </div>
                <div className=" pr-5">
                  <p className="text-xl ">ຊື່ພະນັກງານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="First_name"
                      name="First_name"
                      type="text"
                      required=""
                      placeholder="ຊື່ພະນັກງານ"
                      value={value.First_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl ">ບ້ານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Village"
                      name="Village"
                      type="text"
                      required=""
                      placeholder="ບ້ານ"
                      value={value.Village}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" pr-5">
                  <p className="text-xl ">ນາມສະກຸນ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Last_name"
                      name="Last_name"
                      type="text"
                      required=""
                      placeholder="ນາມສະກຸນ"
                      value={value.Last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl ">ເມືອງ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="District"
                      name="District"
                      type="text"
                      required=""
                      placeholder="ເມືອງ"
                      value={value.District}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" pr-5">
                  <p className="text-xl ">ເພດ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="gender"
                      name="gender"
                      type="text"
                      required=""
                      placeholder="ເພດ"
                      value={value.gender}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl ">ແຂວງ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Province"
                      name="Province"
                      type="text"
                      required=""
                      placeholder="ແຂວງ"
                      value={value.Province}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" pr-5">
                  <p className="text-xl ">ເບີໂທ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Phone_Number"
                      name="Phone_Number"
                      type="text"
                      required=""
                      placeholder="ເບີໂທ"
                      value={value.Phone_Number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl ">ລະຫັດຜ່ານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Password"
                      name="Password"
                      type="text"
                      required=""
                      placeholder="ລະຫັດຜ່ານ"
                      value={value.Password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex justify-center items-center ">
                <img
                  src={imagePreview}
                  alt=""
                  className=" w-full  object-contain items-center"
                />
              </div>
            </div>
            <div className=" flex justify-end  mt-28 px-5 ">
              <div
                className="w-1/6 bg-redBottle flex justify-between py-1 px-5 rounded-md items-center "
                onClick={() => onClose()}
              >
                <img src={ic_close1} alt="" className=" " />
                <div className="text-white text-2xl">ຍົກເລີກ</div>
              </div>
              <div className="mx-2"></div>
              <div
                className="w-1/6 bg-greenBottle flex justify-between py-1 px-5 rounded-md items-center "
                onClick={handleSubmit}
              >
                <img src={ic_save1} alt="" className=" " />
                <div className="text-white text-2xl ">ບັນທຶກ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManageEditModal;
