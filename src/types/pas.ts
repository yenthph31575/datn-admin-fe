import { create } from "zustand";

/* ================= TYPES ================= */

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export type AddItemPayload = Omit<CartItem, "quantity">;

export interface CartState {
  items: CartItem[];

  addItem: (item: AddItemPayload) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  updateQuantity: (id: number, delta: number) => void;
  setQuantity: (id: number, quantity: number) => void;

  totalQuantity: () => number;
  totalPrice: () => number;
}

/* ================= HELPERS ================= */

const clampQuantity = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;

/* ================= STORE ================= */

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  /* ADD ITEM */
  addItem: (item) =>
    set((state) => {
      const found = state.items.find((i) => i.id === item.id);

      if (found) {
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

  /* UPDATE (+ / -) */
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  /* SET QUANTITY (INPUT) */
  setQuantity: (id, quantity) =>
    set((state) => {
      const q = clampQuantity(quantity);

      if (q === 0) {
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }

      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: q } : i
        ),
      };
    }),

  /* REMOVE */
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  /* CLEAR */
  clearCart: () => set({ items: [] }),

  /* TOTALS */
  totalQuantity: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    ),
}));
