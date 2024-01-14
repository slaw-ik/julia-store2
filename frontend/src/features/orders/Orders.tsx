import React, {useEffect} from "react";
import {useAppSelector} from "../../app/hooks";
import {fetchOrdersAsync, OrderState, selectOrders, selectStatus, Statuses} from "./orderSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import Order from "./Order";

function Orders() {
    const orders = useAppSelector(selectOrders);
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchOrdersAsync());
    }, [dispatch]);

    let contents;

    if (status !== Statuses.UpToDate) {
        contents = <div>{status}</div>;
    } else {
        contents = (
            <div>
                {orders.map((order: OrderState) => (
                    <Order key={order.id} order={order}/>
                ))}
            </div>
        );
    }

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0">Last orders</h6>
            {contents}
            <small className="d-block text-end mt-3">
                <a href="#">All orders</a>
            </small>
        </div>
    );
}

export default Orders;
