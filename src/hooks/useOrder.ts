import { useState } from "react";
import type { CustomerType, OrderItem } from "../types/order";

export type { CustomerType, OrderItem } from "../types/order";

export function useOrder() {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState<CustomerType>("residencial");

  function addItem(item: Omit<OrderItem, "quantity">, quantity = 1) {
    setItems((current) => {
      const existing = current.find((i) => i.id === item.id);
      if (existing) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...current, { ...item, quantity }];
    });
  }

  function updateQuantity(id: string, quantity: number) {
    setItems((current) =>
      current
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  function clearOrder() {
    setItems([]);
    setCustomerName("");
    setCustomerType("residencial");
  }

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return {
    items,
    total,
    customerName,
    customerType,
    setCustomerName,
    setCustomerType,
    addItem,
    updateQuantity,
    clearOrder,
  };
}
