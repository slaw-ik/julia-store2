import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderPage from "../components/OpderPage/OrderPage";

const Order = (props) => {
  let { id } = useParams();

  return <OrderPage id={id} />;
};

export default Order;
