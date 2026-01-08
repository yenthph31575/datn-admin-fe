export const validationMessages = {
  required: (field?: string) => (field ? `${field} là bắt buộc!` : 'Trường này là bắt buộc!'),

  number: (field?: string) => (field ? `${field} phải là số!` : 'Trường này phải là số!'),

  between: (min: number, max: number, field?: string) =>
    field ? `${field.toLowerCase()} phải từ ${min} đến ${max} ký tự` : `Trường này phải từ ${min} đến ${max} ký tự`,

  max: (max: number, field?: string) => (field ? `${field} tối đa ${max} ký tự!` : `Tối đa ${max} ký tự!`),

  gt: (min: number, field?: string) => (field ? `${field} phải có ít nhất ${min} ký tự` : `Phải có ít nhất ${min} ký tự`),

  gte: (min: number, field?: string) => (field ? `${field} phải lớn hơn hoặc bằng ${min}` : `Giá trị phải lớn hơn hoặc bằng ${min}`),

  lt: (max: number, field?: string) => (field ? `${field} phải nhỏ hơn ${max}` : `Giá trị phải nhỏ hơn ${max}`),

  lte: (max: number, field?: string) => (field ? `${field} phải nhỏ hơn hoặc bằng ${max}` : `Giá trị phải nhỏ hơn hoặc bằng ${max}`),

  specialCharacters: () => "Chỉ được phép chứa các ký tự đặc biệt: '-', '_', ' '. Không được dùng các ký tự đặc biệt khác.",

  emoji: () => 'Không được dùng emoji khác',

  invalid: (field?: string) => (field ? `${field} không hợp lệ` : 'Giá trị không hợp lệ'),
};
