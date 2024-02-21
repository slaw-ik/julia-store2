import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../app/hooks";
import {
  fetchOrdersAsync,
  OrderState,
  selectOrders,
  selectStatus,
  Statuses,
} from "../../features/orders/ordersSlice";
import { AppDispatch } from "../../app/store";
import Order from "./Order";

import "./styles.css";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function OrderIndex() {
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({
    page: page.toString(),
  });

  const handleOnPageChanges = (pageToChange: number) => {
    if (page !== pageToChange)
      setSearchParams({ page: pageToChange.toString() });
  };

  useEffect(() => {
    const currentPage = searchParams.get("page");

    if (currentPage) setPage(parseInt(currentPage));
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchOrdersAsync(page));
  }, [dispatch, page]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = (
      <tr>
        <td colSpan={7} style={{ height: "500px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>{status}</h3>
          </div>
        </td>
      </tr>
    );
  } else {
    contents = orders.orders.map((order: OrderState) => (
      <Order key={order.id} order={order} />
    ));
  }

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="mb-3">
            <h5 className="card-title">
              Orders{" "}
              <span className="text-muted fw-normal ms-2">
                ({orders.total})
              </span>
            </h5>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
            <div>
              <button
                data-bs-toggle="modal"
                data-bs-target=".add-new"
                className="btn btn-primary"
              >
                <i className="bi bi-plus-lg"></i> Add New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="">
            <div className="table-responsive">
              <table className="table project-list-table table-nowrap align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">State</th>
                    <th scope="col">Nickname</th>
                    <th scope="col">Total</th>
                    <th scope="col">Date</th>
                    <th scope="col" style={{ width: "200px" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{contents}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-0 align-items-center pb-4">
        <div className="col-sm-6">
          <div>
            <p className="mb-sm-0">Showing 1 to 10 of 57 entries</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="float-sm-end">
            <Pagination
              page={page}
              total={orders.total}
              onPageChanges={handleOnPageChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderIndex;
