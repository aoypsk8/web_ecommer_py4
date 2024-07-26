import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import { useDispatch, useSelector } from "react-redux";
import { CreateImportPro, GetAllImportPro } from "../../api/importAPI/importAction";
import { GetAllProduct, GetAllProductWHERE } from "../../api/productAPI/productAction";
import { GetAllCustomer } from "../../api/cutomerAPI/customerAction";
import { CreateOrder } from "../../api/orderAPI/orderAction";
import Bill from "./bill";
// import ProductDropdown from "./productBOX";


function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
function SellFrontScreen() {
  
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState({ phone: "" });
  const [orderSummary, setOrderSummary] = useState(null); 

  const { product } = useSelector((state) => state.product);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(GetAllProductWHERE());
    dispatch(GetAllCustomer());
  }, [dispatch]);

  useEffect(() => {
    setCustomerData(customer || []);
    setProductData(product || []);
  }, [customer, product]);

  const [selectedCustomer, setSelectedCustomer] = useState({
    Cus_ID: null,
    First_name: "Select Customer",
    Last_name: "Select Customer",
  });

  const customerOptions = customerData.map((cus) => ({
    Cus_ID: cus.Cus_ID,
    First_name: cus.First_name,
    Last_name: cus.Last_name,
  }));

  const productOptions = productData.map((prod) => ({
    Product_ID: prod.Product_ID,
    Product_Name: prod.Product_Name,
    Product_img: prod.Product_img,
    ProductQty: prod.ProductQty,
    Price: prod.Price,
  }));

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSelect = (selectedProducts) => {
    console.log('Selected products:', selectedProducts); // Debug log
    setSelectedProducts(selectedProducts);
  };

  const handleSubmit = () => {
    const formattedProducts = selectedProducts.map((product) => ({
      Product_ID: product.Product_ID,
      quantity: product.quantity || 1,
      Price: product.Price,
    }));
    const totalAmount = formattedProducts.reduce((total, product) => total + (product.quantity * product.Price), 0);
  
    const summaryData = {
      Cus_ID: selectedCustomer.Cus_ID,
      customerName: `${selectedCustomer.First_name} ${selectedCustomer.Last_name}`, // Add customer name
      Phone: value.phone,
      Location: "Store Address",
      Products: formattedProducts,
      totalAmount, // Ensure this field is present
    };
  
    dispatch(CreateOrder(
      summaryData.Cus_ID,
      summaryData.Phone,
      summaryData.Location,
      summaryData.Products
    ))
      .then(() => {
        setOrderSummary(summaryData);
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };
  



  const ProductDropdown = ({ options, selectedOptions, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const [localSelectedOptions, setLocalSelectedOptions] = useState(selectedOptions);

    useEffect(() => {
      setLocalSelectedOptions(selectedOptions);
    }, [selectedOptions]);

    const toggleDropdown = () => setIsOpenDropDown(!isOpenDropDown);

    const handleCheckboxChange = (product) => {
      const updatedSelectedOptions = localSelectedOptions.some((p) => p.Product_ID === product.Product_ID)
        ? localSelectedOptions.filter((p) => p.Product_ID !== product.Product_ID)
        : [...localSelectedOptions, { ...product, quantity: 1 }];

      setLocalSelectedOptions(updatedSelectedOptions);
    };

    const handleQuantityChange = (product, quantity) => {
      setLocalSelectedOptions((prev) =>
        prev.map((p) =>
          p.Product_ID === product.Product_ID
            ? { ...p, quantity: parseInt(quantity, 10) || 1 } // Update quantity based on user input
            : p
        )
      );
    };
    const handleSave = () => {
      console.log('Local selected options on save:', localSelectedOptions); // Debug log
      onSelect(localSelectedOptions);
      toggleDropdown();
    };

    return (
      <div className="relative">
        <div
          className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5 justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          {localSelectedOptions.length > 0
            ? `${localSelectedOptions.length} product(s) selected`
            : "Select Products"}
          {isOpenDropDown ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </div>
        {isOpenDropDown && (
          <ul className="absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3">
            {options.map((product, index) => {
              const selectedProduct = localSelectedOptions.find((p) => p.Product_ID === product.Product_ID);
              return (
                <li
                  key={index}
                  className="flex items-center text-lg hover:cursor-pointer my-1"
                >
                  <input
                    type="checkbox"
                    checked={!!selectedProduct}
                    onChange={() => handleCheckboxChange(product)}
                    className="mr-2"
                  />
                  {product.Product_img && (
                    <img
                      src={product.Product_img}
                      alt={product.Product_img}
                      className="w-12 h-12 object-cover mr-2"
                    />
                  )}
                  <div className="flex">
                    <p> ຊື່ສິຄ້າ : {product.Product_Name}  </p>
                    <p className="ml-5">ລາຄາ {formatNumber(product.Price)} ກີບ</p>
                  </div>
                  ({product.ProductQty})
                  {selectedProduct && (
                    <input
                      type="number"
                      min="1"
                      value={selectedProduct.quantity || 1}
                      onChange={(e) => handleQuantityChange(product, e.target.value)}
                      className="ml-2 w-16 text-center border border-lineColor rounded"
                    />
                  )}
                </li>
              );
            })}
            <li className="flex justify-end m-2 p-5">
              <button
                onClick={handleSave}
                className="bg-secondaryColor text-white py-1 px-3 rounded"
              >
                Save
              </button>
            </li>
          </ul>
        )}
      </div>
    );
  };


  const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => setIsOpenDropDown(!isOpenDropDown);

    const handleSelect = (option) => {
      onSelect(option);
      toggleDropdown();
    };

    return (
      <div className="relative">
        <div
          className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5 justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          {selectedOption.First_name} {selectedOption.Last_name}
          {isOpenDropDown ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </div>
        {isOpenDropDown && (
          <ul className="absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="text-lg hover:cursor-pointer my-1"
              >
                ຊື່ : {option.First_name} ນາມສະກຸນ : {option.Last_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className="mb-6 text-5xl">ຂາຍສິນຄ້າຫນ້າຮ້ານ</p>

      <div className="w-full grid grid-cols-3">
        <div>
          <p className="text-xl">ລູກຄ້າ</p>
          <CustomDropdown
            options={customerOptions}
            selectedOption={selectedCustomer}
            onSelect={setSelectedCustomer}
          />
        </div>
        <div className="pl-10">
          <p className="text-xl">ເບີໂທ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded-md"
              type="text"
              placeholder="Phone"
              value={value.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-xl">ເລືອກສິນຄ້າ</p>
        <div className="w-full border border-lineColor rounded-md px-5 py-2">
          <ProductDropdown
            options={productOptions}
            selectedOptions={selectedProducts}
            onSelect={handleProductSelect}
          />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded  bg-greenBottle"
            onClick={handleSubmit}
          >
            Save
          </button>
          <img className="w-6 ml-3" src={ic_save1} alt="save-icon" />
        </div>
        <div className="flex items-center ml-10">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded bg-redBottle"
            onClick={() => console.log("Cancel")}
          >
            Cancel
          </button>
          <img className="w-6 ml-3" src={ic_close1} alt="close-icon" />
        </div>
      </div>
      {orderSummary && <Bill orderData={orderSummary} />}
    </div>
  );
}

export default SellFrontScreen;