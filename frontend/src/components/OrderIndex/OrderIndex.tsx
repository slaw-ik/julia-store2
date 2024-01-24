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

function OrderIndex() {
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);

  const fetchOrders = (page: number) => {
    // dispatch(fetchOrdersAsync(page));
  };

  useEffect(() => {
    const hash = window.location.hash;
    const hashWithoutHashSign = hash.slice(1);
    const params = new URLSearchParams(hashWithoutHashSign);
    const page = params.get("page") || "1";

    console.log("page", page);

    setPage(parseInt(page));
  }, []);

  useEffect(() => {
    fetchOrders(page);
  }, [fetchOrders]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = (
      <tr>
        <td colSpan={7}>{status}</td>
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
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target=".add-new"
                className="btn btn-primary"
              >
                <i className="bi bi-plus-lg"></i> Add New
              </a>
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
            <Pagination page={page} fetchData={fetchOrders} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderIndex;
