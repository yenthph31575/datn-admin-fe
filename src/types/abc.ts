import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

type AddItemPayload = Omit<CartItem, "quantity">;

interface CartState {
  items: CartItem[];

  addItem: (item: AddItemPayload) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  updateQuantity: (id: number, delta: number) => void;
  setQuantity: (id: number, quantity: number) => void;

  totalQuantity: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  /* ================= ADD ITEM ================= */
  addItem: (item) =>
    set((state) => {
      const existedItem = state.items.find((i) => i.id === item.id);

      if (existedItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  /* ================= UPDATE QUANTITY (+ / -) ================= */
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  /* ================= SET QUANTITY (INPUT) ================= */
  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) =>
              i.id === id
                ? { ...i, quantity: Math.max(1, Math.floor(quantity)) }
                : i
            ),
    })),

  /* ================= REMOVE ITEM ================= */
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  /* ================= CLEAR CART ================= */
  clearCart: () => set({ items: [] }),

  /* ================= TOTAL QUANTITY ================= */
  totalQuantity: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  /* ================= TOTAL PRICE ================= */
  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
}));
