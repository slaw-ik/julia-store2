import React from "react";
import {OrderState} from "../../features/orders/ordersSlice";

type OrderProps = {
    order: OrderState;
}

function Order({order}: OrderProps) {
    const {
        id,
        state,
        name,
        fullAddress,
        total,
        note,
        created_at,
        nickname
    } = order;

    return (
        <div className="d-flex text-body-secondary pt-3">
            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32"
                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32"
                 preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>
                    {state}
                </title>
                <rect width="100%" height="100%" fill="<%= state_color(order.state) %>"/>
            </svg>
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                    <strong className="text-gray-dark">{name}</strong>
                    <span className="address">{fullAddress}</span>
                    <span className="total">{total}</span>
                    <span className="note">{note}</span>
                    <span className="date">{created_at}</span>
                    <a href={`/orders/${id}`} className="btn btn-sm btn-outline-secondary">Show</a>
                </div>
                <span className="d-block">@{nickname}</span>
            </div>
        </div>
    );
}

export default Order;
