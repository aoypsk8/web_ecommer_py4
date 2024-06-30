// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllOrder, getAllOrderToday, updateStatusOrder } from "./orderApi";
import { addOrder } from "../../slice/orderSlice";
import { addOrderToday } from "../../slice/orderTodaySlice";
export const GetAllOrder = () => async (dispatch) => {
  try {
    const order = await getAllOrder();
    console.log(order);
    if (order.status == "ok") {
      dispatch(addOrder(order.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const GetAllOrderToday = () => async (dispatch) => {
  try {
    const order = await getAllOrderToday();
    console.log(order);
    if (order.status == "ok") {
      dispatch(addOrderToday(order.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const UpdateStatusOrder = (id, userID) => async (dispatch) => {
  try {
    const update = await updateStatusOrder(id, userID);
    console.log(update);
    if (update.status == "ok") {
      dispatch(GetAllOrder());
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
