import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {useAppSelector} from "../../app/hooks";
import {
  fetchOrdersAsync,
  selectOrders,
  selectStatus,
} from "../../features/orders/ordersSlice";
import {AppDispatch} from "../../app/store";


import {useSearchParams} from "react-router-dom";
import MegaTable from "../MegaTable/MegaTable";

import "./styles.css";

const OrderIndex = () => {
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({
    page: page.toString(),
  });

  const handleOnPageChanges = (pageToChange: number) => {
    if (page !== pageToChange)
      setSearchParams({page: pageToChange.toString()});
  };

  useEffect(() => {
    const currentPage = searchParams.get("page");

    if (currentPage) setPage(parseInt(currentPage));
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchOrdersAsync(page));
  }, [dispatch, page]);


  return (
    <div className="container">
      <MegaTable
        status={status}
        records={orders.orders}
        page={page}
        total={orders.total}
        onPageChanges={handleOnPageChanges}
      />
    </div>
  );
};

export default OrderIndex;
