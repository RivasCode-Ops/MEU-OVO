import { useEffect, useRef, useState } from "react";
import type { CustomerType, OrderItem } from "../types/order";

export type { CustomerType, OrderItem } from "../types/order";

const STORAGE_KEY = "bifedoolhao:order";

const VALID_CUSTOMER_TYPES: CustomerType[] = [
  "residencial",
  "restaurante",
  "mercado",
  "padaria",
];

type StoredOrderPayload = {
  items: OrderItem[];
  customerName: string;
  customerType: CustomerType;
};

const defaultState: StoredOrderPayload = {
  items: [],
  customerName: "",
  customerType: "residencial",
};

function isCustomerType(v: unknown): v is CustomerType {
  return typeof v === "string" && VALID_CUSTOMER_TYPES.includes(v as CustomerType);
}

function normalizeItem(raw: unknown): OrderItem | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id.trim() : "";
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const unitPrice = Number(o.unitPrice);
  const qty = Math.floor(Number(o.quantity));
  if (
    !id ||
    !name ||
    !Number.isFinite(unitPrice) ||
    unitPrice < 0 ||
    !Number.isFinite(qty) ||
    qty < 1
  ) {
    return null;
  }
  return { id, name, unitPrice, quantity: qty };
}

function readStoredOrder(): StoredOrderPayload {
  if (typeof window === "undefined") {
    return { ...defaultState };
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw || raw.trim() === "") {
      return { ...defaultState };
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { ...defaultState };
    }
    const p = parsed as Record<string, unknown>;
    const itemsRaw = Array.isArray(p.items) ? p.items : [];
    const items = itemsRaw
      .map(normalizeItem)
      .filter((x): x is OrderItem => x !== null);
    const customerName =
      typeof p.customerName === "string" ? p.customerName : "";
    const customerType = isCustomerType(p.customerType)
      ? p.customerType
      : "residencial";
    return { items, customerName, customerType };
  } catch {
    return { ...defaultState };
  }
}

function writeStoredOrder(payload: StoredOrderPayload) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota, modo privado, etc. */
  }
}

function clearStoredOrderKey() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function useOrder() {
  const initialRef = useRef<StoredOrderPayload | null>(null);
  if (initialRef.current === null) {
    initialRef.current = readStoredOrder();
  }
  const snap = initialRef.current;

  const [items, setItems] = useState<OrderItem[]>(() => snap.items);
  const [customerName, setCustomerName] = useState(() => snap.customerName);
  const [customerType, setCustomerType] = useState<CustomerType>(
    () => snap.customerType,
  );

  useEffect(() => {
    const isCleared =
      items.length === 0 &&
      customerName.trim() === "" &&
      customerType === "residencial";
    if (isCleared) {
      clearStoredOrderKey();
      return;
    }
    writeStoredOrder({ items, customerName, customerType });
  }, [items, customerName, customerType]);

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
