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
const clampQuantity = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;

/* ================= STORE ================= */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /* ================= ADD ITEM ================= */
      addItem: ({ quantity = 1, ...item }) =>
        set((state) => {
          const existed = state.items.find((i) => i.id === item.id);
          if (existed) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + clampQuantity(quantity) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: clampQuantity(quantity) }] };
        }),

      /* ================= UPDATE QUANTITY (+ / -) ================= */
      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, quantity: clampQuantity(i.quantity + delta) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      /* ================= SET QUANTITY ================= */
      setQuantity: (id, quantity) =>
        set((state) => {
          const q = clampQuantity(quantity);
          return {
            items:
              q === 0
                ? state.items.filter((i) => i.id !== id)
                : state.items.map((i) =>
                    i.id === id ? { ...i, quantity: q } : i
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
      totalQuantity: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'cart-storage', // lưu vào localStorage
    }
  )
);
