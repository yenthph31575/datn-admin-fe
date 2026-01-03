import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ================= TYPES ================= */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

type AddItemPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

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

/* ================= HELPERS ================= */
const clampQuantity = (value: number, min = 0): number => {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.floor(value));
};

const calcTotalQuantity = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

const calcTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

/* ================= STORE ================= */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /* ================= ADD ITEM ================= */
      addItem: ({ quantity = 1, ...item }) =>
        set((state) => {
          const q = clampQuantity(quantity, 1);
          const existed = state.items.find((i) => i.id === item.id);

          if (!existed) {
            return {
              items: [...state.items, { ...item, quantity: q }],
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + q }
                : i
            ),
          };
        }),

      /* ================= UPDATE QUANTITY (+ / -) ================= */
      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.id !== id) return i;
              const nextQty = clampQuantity(i.quantity + delta);
              return nextQty === i.quantity ? i : { ...i, quantity: nextQty };
            })
            .filter((i) => i.quantity > 0),
        })),

      /* ================= SET QUANTITY ================= */
      setQuantity: (id, quantity) =>
        set((state) => {
          const q = clampQuantity(quantity);
          if (q === 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }

          return {
            items: state.items.map((i) =>
              i.id === id && i.quantity !== q
                ? { ...i, quantity: q }
                : i
            ),
          };
        }),

      /* ================= REMOVE ITEM ================= */
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      /* ================= CLEAR CART ================= */
      clearCart: () => set({ items: [] }),

      /* ================= TOTALS ================= */
      totalQuantity: () => calcTotalQuantity(get().items),
      totalPrice: () => calcTotalPrice(get().items),
    }),
    {
      name: 'cart-storage',
      version: 1,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
