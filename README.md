## Giới thiệu <a name="intro"></a>

Boilerplate này được tạo ra nhằm xây dựng ứng dụng NextJS nhanh hơn và đơn giản hơn.

## Bắt đầu <a name="getting-started"></a>

1. Nếu sử dụng Windows, hãy chạy các lệnh sau:

- `git config --global core.eol lf`

- `git config --global core.autocrlf input`

Các lệnh này sẽ đồng bộ hoá end-of-line (EOL) giống với Linux/Mac. Nếu không thiết lập, có thể gặp conflict với đồng đội dùng hệ thống khác và một số bash script sẽ không chạy được.

2. Clone repository này.

3. Cài đặt pnpm toàn cục: `npm install -g pnpm` (yêu cầu Node >= 18).

4. Chạy `pnpm install` để cài đặt dependencies.

---

### Chạy server phát triển
```bash
pnpm dev
```


Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

Có thể bắt đầu chỉnh sửa giao diện bằng cách sửa file app/page.tsx. Trang sẽ tự động reload khi lưu thay đổi.

Dự án này sử dụng [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) để tối ưu hóa và tự động tải [Geist](https://vercel.com/font), một font mới đến từ Vercel.

## Tìm hiểu thêm

Để tìm hiểu thêm về Next.js, tham khảo các tài nguyên sau:

- [Next.js Documentation](https://nextjs.org/docs) - tìm hiểu tính năng & API.
- [Learn Next.js](https://nextjs.org/learn) - khóa học tương tác.

Có thể xem repo Next.js trên [the Next.js GitHub repository](https://github.com/vercel/next.js)
