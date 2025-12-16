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

  // ➕ Thêm sản phẩm (nếu có rồi thì +1)
  addItem: (item) =>
    set((state) => {
      const index = state.items.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        const newItems = [...state.items];
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1,
        };
        return { items: newItems };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  // 🔼🔽 Tăng / giảm số lượng
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(i.quantity + delta, 0) }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  // ✏️ Set số lượng trực tiếp (input)
  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) =>
              i.id === id
                ? { ...i, quantity: Math.floor(quantity) }
                : i
            ),
    })),

  // ❌ Xoá sản phẩm
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  // 🧹 Xoá toàn bộ giỏ
  clearCart: () => set({ items: [] }),

  // 🔢 Tổng số lượng
  totalQuantity: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  // 💰 Tổng tiền
  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
}));
