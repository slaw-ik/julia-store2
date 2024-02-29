import React, {CSSProperties} from 'react';
import Pagination from "./Pagination";
import {OrderState, Statuses} from "../../features/orders/ordersSlice";
import Order from "../OrderIndex/Order";
import "./styles.css";
import FooterInfo from "./FooterInfo";
import Loader from "./Loader";

interface MegaTableProps {
  records: BaseRecord[];
  total: number;
  page: number;
  onPageChanges: (page: number) => void;
  status: string;
  dataStructure: {
    key: string;
    name: string;
    style?: CSSProperties;
  }[];
  customRow?: (record: BaseRecord) => JSX.Element;
}

interface BaseRecord {
  id: number;
}

const MegaTable = ({records, page, total, onPageChanges, status, dataStructure, customRow}: MegaTableProps) => {

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <Loader/>;
  } else {
    if (customRow) {
      contents = records.map((record: BaseRecord) => (
        customRow(record)
      ));
    } else {
      contents = records.map((record: BaseRecord) => (
        <Order key={record.id} record={record}/>
      ));
    }

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
                {dataStructure.map((data) => (
                  <th key={data.key} scope="col" style={data.style || {}}>{data.name}</th>
                ))}

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
