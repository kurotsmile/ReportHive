# ReportHive
Power size measurement and reporting tools

Đây là Demo dự án, cách xây dựng giao diện, cầu nối dữ liệu và các công thức,chức năng tổng quát sơ lược

# Chạy Frontend

Dưới đây là các câu lệnh để tạo và chạy frontend bằng `Next.js`

```
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm install axios jwt-decode
```


# Liên kết Frontend với Backend

Backend Spring Boot chạy trên server khác, đảm bảo API của bạn có thể truy cập công khai.
Nếu backend local, bạn có thể sử dụng công cụ như Ngrok để tạo URL công khai tạm thời:

```
ngrok http 8080
```

Cập nhật biến môi trường `API_URL` trong Vercel để trỏ đến URL của backend.

# Biểu đồ báo cáo tạo theo công thức

service layer để tính toán:

`Doanh thu, sản lượng build`: Query từ cơ sở dữ liệu.

`Utilization`: Dựa trên công thức:

```
Utilization (%) = (Required Capacity / Installed Capacity) * 100
Installed Capacity = Max Equipment x 3 Shifts
````

`Điểm nhấn`: Tìm các mục vượt 85% hoặc thiếu line/tester