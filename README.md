# ReportHive - POWER SIZE MEASUREMENT AND REPORTING TOOLS

Power size measurement and reporting tools

Đây là Demo dự án tính toán dữ liệu báo cáo và sao lưu, cách xây dựng giao diện, cầu nối dữ liệu và các công thức,chức năng tổng quát sơ lượt

# Chạy Frontend

Dưới đây là các câu lệnh để tạo và chạy frontend bằng `Next.js`

```
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm install axios jwt-decode
```


# Liên kết Frontend với Backend

Backend Spring Boot chạy trên server khác, đảm bảo API có thể truy cập công khai.
Nếu backend local, bạn có thể sử dụng công cụ như Ngrok để tạo URL công khai tạm thời:

```
ngrok http 8080
```

Cập nhật biến môi trường `API_URL` trong môi trương `Frontend` để trỏ đến URL của backend.

# Biểu đồ báo cáo tạo theo công thức

service layer để tính toán - và sử dụng Char.js để hiển thị biểu đồ:

`Doanh thu, sản lượng build`: Query từ cơ sở dữ liệu.

`Utilization`: Dựa trên công thức:

```
Utilization (%) = (Required Capacity / Installed Capacity) * 100
Installed Capacity = Max Equipment x 3 Shifts
````

`Điểm nhấn`: Tìm các mục vượt 85% hoặc thiếu line/tester

# Sao lưu - Utilize a backup database

Tích hợp tính năng sao lưu, dự án sẽ sử dụng 2 cơ sỡ dữ liệu `SQL Server`

`Tạo cơ chế sao lưu dữ liệu` :Mô phỏng lỗi trên cơ sở dữ liệu chính và kiểm tra chuyển đổi sang cơ sở dữ liệu dự phòng.

```
# Primary database
spring.datasource.primary.url=jdbc:sqlserver://<PRIMARY_HOST>:1433;databaseName=<PRIMARY_DB>
spring.datasource.primary.username=<USERNAME>
spring.datasource.primary.password=<PASSWORD>

# Backup database
spring.datasource.backup.url=jdbc:sqlserver://<BACKUP_HOST>:1433;databaseName=<BACKUP_DB>
spring.datasource.backup.username=<USERNAME>
spring.datasource.backup.password=<PASSWORD>
```

# Chức năng import Excel

Chạy url `/upload`