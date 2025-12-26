import { create } from "zustand";

/* ===================== TYPE ===================== */

/**
 * Một item trong giỏ hàng
 */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

/**
 * Payload khi add item
 * → không cần quantity vì mặc định +1
 */
type AddItemPayload = Omit<CartItem, "quantity">;

/**
 * State + Actions của Cart
 */
interface CartState {
  /* ---------- STATE ---------- */
  items: CartItem[];

  /* ---------- ACTIONS ---------- */
  addItem: (item: AddItemPayload) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  updateQuantity: (id: number, delta: number) => void;
  setQuantity: (id: number, quantity: number) => void;

  /* ---------- SELECTORS ---------- */
  totalQuantity: () => number;
  totalPrice: () => number;
}

/* ===================== STORE ===================== */

export const useCartStore = create<CartState>((set, get) => ({
  /* ---------- INITIAL STATE ---------- */
  items: [],

  /* ================= ADD ITEM ================= */
  /**
   * - Nếu sản phẩm đã tồn tại → tăng quantity +1
   * - Nếu chưa tồn tại → thêm mới với quantity = 1
   */
  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.id === item.id
      );

      // Đã tồn tại
      if (existingIndex !== -1) {
        const newItems = [...state.items];

        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };

        return { items: newItems };
      }

      // Chưa tồn tại
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  /* ================= UPDATE QUANTITY (+ / -) ================= */
  /**
   * delta: +1 | -1
   * - Nếu quantity <= 0 → tự động xoá item
   */
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  /* ================= SET QUANTITY (INPUT NUMBER) ================= */
  /**
   * Set quantity trực tiếp từ input
   * - quantity <= 0 → xoá item
   * - quantity luôn là số nguyên >= 1
   */
  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, Math.floor(quantity)),
              }
            : item
        ),
      };
    }),

  /* ================= REMOVE ITEM ================= */
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  /* ================= CLEAR CART ================= */
  clearCart: () => set({ items: [] }),

  /* ================= TOTAL QUANTITY ================= */
  /**
   * Tổng số lượng sản phẩm trong giỏ
   */
  totalQuantity: () =>
    get().items.reduce(
      (total, item) => total + item.quantity,
      0
    ),

  /* ================= TOTAL PRICE ================= */
  /**
   * Tổng tiền giỏ hàng
   */
  totalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
}));
