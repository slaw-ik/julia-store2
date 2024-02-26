import React from 'react';
import Pagination from "./Pagination";
import {OrderState, Statuses} from "../../features/orders/ordersSlice";
import Order from "../OrderIndex/Order";
import "./styles.css";
import FooterInfo from "./FooterInfo";

interface MegaTableProps {
  records: OrderState[];
  total: number;
  page: number;
  onPageChanges: (page: number) => void;
  status: string;
};
const MegaTable = ({records, page, total, onPageChanges, status}: MegaTableProps) => {

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = (
      <tr>
        <td colSpan={7} style={{height: "500px"}}>
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
    contents = records.map((order: OrderState) => (
      <Order key={order.id} order={order}/>
    ));
  }

  return (
    <>
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="mb-3">
            <h5 className="card-title">
              Orders{" "}
              <span className="text-muted fw-normal ms-2">({total})</span>
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
                <th scope="col" style={{width: "200px"}}>
                  Action
                </th>
              </tr>
              </thead>
              <tbody>{contents}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row g-0 align-items-center pb-4">
        <div className="col-sm-6">
          <FooterInfo page={page} total={total} count={records.length}/>

        </div>
        <div className="col-sm-6">
          <div className="float-sm-end">
            <Pagination
              page={page}
              total={total}
              onPageChanges={onPageChanges}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MegaTable;
