# 🏠 FamPlan AI - Quản Lý Gia Đình Thông Minh

**FamPlan AI** là ứng dụng quản lý ngân sách gia đình và lập kế hoạch bữa ăn được hỗ trợ bởi AI Gemini của Google. Giúp gia đình quản lý tài chính hiệu quả với giao diện hiện đại và thân thiện.

---

## ✨ Tính Năng Chính

### 🔐 **Hệ Thống Xác Thực**
- Đăng nhập/Đăng ký hiện đại với tùy chọn đăng nhập xã hội
- Bảo mật dữ liệu người dùng

### 👋 **Onboarding Thông Minh**
- Hướng dẫn thiết lập từng bước cho gia đình
- Cấu hình số lượng thành viên gia đình
- Thiết lập mục tiêu tài chính

### 📊 **Bảng Điều Khiển**
- Tổng quan ngân sách hàng ngày
- Gợi ý kế hoạch bữa ăn
- Danh sách giao dịch gần đây

### 💰 **Lập Kế Hoạch Ngân Sách**
- Theo dõi chi tiêu theo danh mục
- Biểu đồ tiến độ chi tiêu
- Cảnh báo vượt ngân sách

### 🍽️ **Lập Kế Hoạch Bữa Ăn**
- Lên kế hoạch bữa ăn theo tuần
- Gợi ý công thức từ AI
- Danh sách mua sắm thông minh

### 🌙 **Hỗ Trợ Dark Mode**
- Giao diện sáng/tối hoàn chỉnh
- Bảo vệ mắt khi sử dụng ban đêm

### 📱 **Responsive Design**
- Tối ưu cho tất cả kích thước màn hình
- Mobile-first experience

---

## 🎨 UI Templates Sẵn Có

| Tên Màn Hình | Mô Tả |
|---|---|
| **Đăng Nhập** | Giao diện xác thực hiện đại với tùy chọn đăng nhập xã hội |
| **Đăng Ký** | Form đăng ký đầy đủ với xác thực mật khẩu |
| **Welcome & Profile** | Hướng dẫn thiết lập hồ sơ gia đình 3 bước |
| **Main Dashboard** | Tổng quan ngân sách, gợi ý bữa ăn, giao dịch gần đây |
| **Meal Planner** | Lập kế hoạch bữa ăn theo tuần với gợi ý AI |
| **Budget Detail** | Chi tiết ngân sách theo danh mục với biểu đồ |

---

## 🛠️ Tech Stack

| Công Nghệ | Phiên Bản |
|---|---|
| **React** | 18.2.0 |
| **TypeScript** | 5.2.2 |
| **Vite** | 5.2.0 |
| **Tailwind CSS** | 3.4.3 |
| **Google Gemini API** | Latest |

---

## 🚀 Hướng Dẫn Nhanh

### Yêu Cầu
- Node.js v16 trở lên
- npm hoặc yarn

### Cài Đặt

1. **Clone/Download dự án**
   ```bash
   cd d:\Desktop\AI_app
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường**
   - Sao chép `.env.example` thành `.env.local`
   - Thêm API key Gemini của bạn:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Chạy development server**
   ```bash
   npm run dev
   ```
   Truy cập: http://localhost:5173

5. **Build cho production**
   ```bash
   npm run build
   ```

---

## 📦 Deploy lên Vercel

### Phương Pháp 1: GitHub Integration (Khuyến Nghị)

1. Push code lên GitHub:
   ```bash
   git add .
   git commit -m "Deploy FamPlan"
   git push origin main
   ```

2. Trên Vercel Dashboard:
   - Vào https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Chọn repository GitHub
   - Cấu hình:
     - **Framework**: Vite
     - **Build Command**: `npm run build`
     - **Output**: `dist`

3. Thêm Environment Variables:
   - `VITE_GEMINI_API_KEY` = API key của bạn

4. Click Deploy

### Phương Pháp 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

---

## ⚙️ Scripts Dostępne

```bash
npm run dev      # Chạy server development
npm run build    # Build cho production
npm run preview  # Xem trước build production
```

---

## 📝 Biến Môi Trường

| Tên | Mô Tả | Bắt Buộc |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini API Key | ✅ Có |

### Cách Lấy Gemini API Key

1. Vào https://aistudio.google.com
2. Click "Get API Key"
3. Tạo hoặc chọn key hiện có
4. Copy và thêm vào `.env.local`

---

## 🔧 Troubleshooting

### Trang trắng sau deploy
- Kiểm tra console trình duyệt (F12)
- Đảm bảo API key đã được thiết lập
- Xem logs trong Vercel Dashboard

### Build thất bại
```bash
npm run build  # Kiểm tra lỗi TypeScript
```

### Không tìm module
```bash
npm install    # Cài đặt lại dependencies
```

---

## 📄 Tài Liệu Thêm

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Hướng dẫn chi tiết deploy
- **[vercel.json](./vercel.json)** - Cấu hình Vercel
- **[.env.example](./.env.example)** - Mẫu biến môi trường

---

## 🤝 Đóng Góp

Đây là dự án cá nhân. Để đề xuất tính năng mới, vui lòng tạo issue.

---

## 📄 Giấy Phép

Dự án này được cấp phép dưới MIT License.

---

## 👨‍💻 Tác Giả

**FamPlan Team** - Giải pháp quản lý gia đình thông minh

---

## 🌟 Donate Support

Nếu bạn thích dự án này, hãy ⭐ repository!

---

**Được xây dựng bằng ❤️ cho gia đình**
