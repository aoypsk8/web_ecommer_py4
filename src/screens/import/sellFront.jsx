import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductWHERE } from "../../api/productAPI/productAction";
import { GetAllCustomer } from "../../api/cutomerAPI/customerAction";
import { CreateOrder } from "../../api/orderAPI/orderAction";
import Bill from "./bill";

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

function SellFrontScreen() {
  const [visibleBill, setVisibleBill] = useState(false);
  const hideDialogBill = () => {
    setVisibleBill(false);
  };

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState({ phone: "" });
  const [orderSummary, setOrderSummary] = useState(null);
  const billRef = useRef();

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
        setVisibleBill(true);
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
                  ({product.ProductQty} left)
                  {selectedProduct && (
                    <input
                      type="number"
                      value={selectedProduct.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(product, e.target.value)}
                      className="w-16 border border-lineColor rounded-md ml-2 p-1"
                    />
                  )}
                </li>
              );
            })}
            <div className="flex justify-center py-2">
              <button
                onClick={handleSave}
                className="bg-primaryColor text-white py-1 px-3 rounded"
              >
                Save
              </button>
            </div>
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
          {selectedOption.First_name}
          {isOpenDropDown ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </div>
        {isOpenDropDown && (
          <ul className="absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3">
            {options.map((option, index) => (
              <li
                key={index}
                className="flex items-center text-lg hover:cursor-pointer my-1"
                onClick={() => handleSelect(option)}
              >
                <p>
                  {option.First_name} {option.Last_name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="text-3xl font-bold my-10">ຂາຍຫນ້າຮ້ານ</h1>
      <div className="flex flex-col justify-center w-full mt-10 border border-lineColor rounded-lg px-5 py-10">
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div>
            <p className="text-xl mb-2">ຊື່ລູກຄ້າ</p>
            <CustomDropdown
              options={customerOptions}
              selectedOption={selectedCustomer}
              onSelect={setSelectedCustomer}
            />
          </div>
          <div>
            <p className="text-xl mb-2">ເບີໂທລູກຄ້າ</p>
            <input
              type="text"
              name="phone"
              value={value.phone}
              onChange={handleChange}
              className="w-full border border-lineColor rounded-md p-2"
            />
          </div>
        </div>

        <p className="text-xl mb-2">ລາຍການສິນຄ້າ</p>
        <ProductDropdown
          options={productOptions}
          selectedOptions={selectedProducts}
          onSelect={handleProductSelect}
        />

        <div className="flex justify-end w-full mt-10">
          <button
            onClick={handleSubmit}
            className="bg-primaryColor text-white py-2 px-6 rounded-full"
          >
            Save
          </button>
        </div>
      </div>

      {visibleBill && orderSummary && (
        <Bill
          ref={billRef}
          hideDialogBill={hideDialogBill}
          summaryData={orderSummary}
          productData={productData}
        />
      )}
    </div>
  );
}

export default SellFrontScreen;
