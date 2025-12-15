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

  // 👉 thêm
  totalQuantity: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const found = state.items.find((i) => i.id === item.id);

      if (!found) {
        return {
          items: [...state.items, { ...item, quantity: 1 }],
        };
      }

      return {
        items: state.items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }),

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

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),

  // 👉 tổng số lượng
  totalQuantity: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),

  // 👉 tổng tiền
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
