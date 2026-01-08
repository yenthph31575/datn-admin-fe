import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ================= TYPES ================= */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

type AddItemPayload = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

interface CartState {
  items: CartItem[];

  addItem: (item: AddItemPayload) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  updateQuantity: (id: number, delta: number) => void;
  setQuantity: (id: number, quantity: number) => void;
}

/* ================= HELPERS ================= */
const MAX_QTY = 999;

const clamp = (value: number, min = 0, max = MAX_QTY) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

/* ================= STORE ================= */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      /* ===== ADD ITEM ===== */
      addItem: ({ quantity = 1, ...item }) =>
        set((state) => {
          const q = clamp(quantity, 1);
          const existed = state.items.find((i) => i.id === item.id);

          if (!existed) {
            return { items: [...state.items, { ...item, quantity: q }] };
          }

          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: clamp(i.quantity + q, 1) }
                : i
            ),
          };
        }),

      /* ===== UPDATE (+ / -) ===== */
      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, quantity: clamp(i.quantity + delta) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      /* ===== SET EXACT ===== */
      setQuantity: (id, quantity) =>
        set((state) => {
          const q = clamp(quantity);
          return q === 0
            ? { items: state.items.filter((i) => i.id !== id) }
            : {
                items: state.items.map((i) =>
                  i.id === id ? { ...i, quantity: q } : i
                ),
              };
        }),

      /* ===== REMOVE ===== */
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      /* ===== CLEAR ===== */
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      version: 1,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
