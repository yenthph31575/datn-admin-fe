import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

export const statsData = [
  {
    title: 'Tổng doanh thu',
    value: 54200,
    format: 'currency',
    change: 20.1,
    icon: DollarSign,
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-500',
  },
  {
    title: 'Tổng sản phẩm',
    value: 1254,
    format: 'number',
    change: 12.4,
    icon: Package,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Tổng đơn hàng',
    value: 573,
    format: 'number',
    change: 8.2,
    icon: ShoppingCart,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    title: 'Tổng khách hàng',
    value: 2834,
    format: 'number',
    change: -2.5,
    icon: Users,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
];

export const salesData = [
  { name: 'Tháng 1', total: 1200 },
  { name: 'Tháng 2', total: 1900 },
  { name: 'Tháng 3', total: 2400 },
  { name: 'Tháng 4', total: 1800 },
  { name: 'Tháng 5', total: 2800 },
  { name: 'Tháng 6', total: 3200 },
  { name: 'Tháng 7', total: 2600 },
  { name: 'Tháng 8', total: 3800 },
  { name: 'Tháng 9', total: 4200 },
  { name: 'Tháng 10', total: 3600 },
  { name: 'Tháng 11', total: 4800 },
  { name: 'Tháng 12', total: 5400 },
];

export const productCategoryData = [
  { name: 'Điện tử', value: 35 },
  { name: 'Thời trang', value: 25 },
  { name: 'Nhà & Đời sống', value: 20 },
  { name: 'Sách', value: 10 },
  { name: 'Khác', value: 10 },
];

export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const weeklyOrdersData = [
  { day: 'Thứ 2', orders: 45 },
  { day: 'Thứ 3', orders: 52 },
  { day: 'Thứ 4', orders: 38 },
  { day: 'Thứ 5', orders: 65 },
  { day: 'Thứ 6', orders: 78 },
  { day: 'Thứ 7', orders: 90 },
  { day: 'Chủ nhật', orders: 48 },
];

export const recentOrders = [
  { id: '1', customer: 'John Doe', amount: 120, status: 'COMPLETED', date: '2023-10-15' },
  { id: '2', customer: 'Jane Smith', amount: 350, status: 'TO_PAY', date: '2023-10-14' },
  { id: '3', customer: 'Robert Johnson', amount: 75, status: 'COMPLETED', date: '2023-10-13' },
  { id: '4', customer: 'Emily Davis', amount: 220, status: 'CANCELED', date: '2023-10-12' },
  { id: '5', customer: 'Michael Brown', amount: 180, status: 'COMPLETED', date: '2023-10-11' },
];

export const topProducts = [
  { id: '1', name: 'Wireless Headphones', sales: 245, stock: 45 },
  { id: '2', name: 'Smart Watch', sales: 186, stock: 32 },
  { id: '3', name: 'Laptop Backpack', sales: 152, stock: 28 },
  { id: '4', name: 'Bluetooth Speaker', sales: 138, stock: 12 },
  { id: '5', name: 'Fitness Tracker', sales: 127, stock: 34 },
];

export const performanceMetrics = [
  { name: 'Conversion Rate', value: 3.6, format: 'percent', color: 'bg-blue-500', width: '36%' },
  { name: 'Average Order Value', value: 128, format: 'currency', color: 'bg-green-500', width: '64%' },
  { name: 'Customer Retention', value: 72, format: 'percent', color: 'bg-purple-500', width: '72%' },
];

export const orderStatusColors = {
  COMPLETED: 'text-green-600',
  TO_PAY: 'text-yellow-600',
  CANCELED: 'text-red-600',
  REFUND: 'text-gray-600',
  EXPIRED: 'text-orange-600',
  PROCESSING: 'text-blue-600',
  SHIPPED: 'text-indigo-600',
  DELIVERED: 'text-emerald-600',
};

// Monthly revenue data for the past year
export const yearlyRevenueData = [
  { month: 'Tháng 1 2023', revenue: 32500 },
  { month: 'Tháng 2 2023', revenue: 36700 },
  { month: 'Tháng 3 2023', revenue: 42300 },
  { month: 'Tháng 4 2023', revenue: 38900 },
  { month: 'Tháng 5 2023', revenue: 44200 },
  { month: 'Tháng 6 2023', revenue: 48700 },
  { month: 'Tháng 7 2023', revenue: 52100 },
  { month: 'Tháng 8 2023', revenue: 49800 },
  { month: 'Tháng 9 2023', revenue: 53400 },
  { month: 'Tháng 10 2023', revenue: 58900 },
  { month: 'Tháng 11 2023', revenue: 62300 },
  { month: 'Tháng 12 2023', revenue: 67800 },
];

// Traffic sources data
export const trafficSourcesData = [
  { source: 'Trực tiếp', sessions: 5840, percentage: 35 },
  { source: 'Tìm kiếm tự nhiên', sessions: 4200, percentage: 25 },
  { source: 'Mạng xã hội', sessions: 3360, percentage: 20 },
  { source: 'Giới thiệu', sessions: 1680, percentage: 10 },
  { source: 'Email', sessions: 1680, percentage: 10 },
];

// Customer demographics data
export const customerDemographicsData = [
  { age: '18-24', percentage: 15 },
  { age: '25-34', percentage: 32 },
  { age: '35-44', percentage: 27 },
  { age: '45-54', percentage: 18 },
  { age: '55+', percentage: 8 },
];

// Product inventory status
export const inventoryStatusData = [
  { status: 'Còn hàng', count: 842, percentage: 67 },
  { status: 'Hết hàng', count: 253, percentage: 20 },
  { status: 'Sắp hết hàng', count: 159, percentage: 13 },
];

// Recent activities
export const recentActivities = [
  { id: 1, type: 'order', message: 'Đơn hàng mới #12345 đã được nhận', time: '5 phút trước' },
  { id: 2, type: 'product', message: 'Sản phẩm "Smart watch" sắp hết hàng', time: '25 phút trước' },
  { id: 3, type: 'customer', message: 'Đăng ký khách hàng mới: Jane Smith', time: '1 giờ trước' },
  { id: 4, type: 'review', message: 'Đánh giá 5 sao mới cho "Tai nghe không dây"', time: '2 giờ trước' },
  { id: 5, type: 'order', message: 'Đơn hàng #12340 đã được giao', time: '3 giờ trước' },
  { id: 6, type: 'system', message: 'Cập nhật hệ thống đã hoàn tất', time: '5 giờ trước' },
];
