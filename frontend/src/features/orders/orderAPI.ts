import {OrdersState, OrderState} from "./ordersSlice";

const API_URL = "http://localhost:3000";

export async function fetchOrders() {
    return fetch(`${API_URL}/orders.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((err) => {
            console.log("Error: ", err);
            return {} as OrdersState;
        });
}

export async function fetchOrder(orderId: string) {
    return fetch(`${API_URL}/orders/${orderId}.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((err) => {
            console.log("Error: ", err);
            return {} as OrderState;
        });
}

