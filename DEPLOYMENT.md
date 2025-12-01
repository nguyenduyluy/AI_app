# Hướng Dẫn Deploy FamPlan lên Vercel

## Chuẩn Bị

1. **Đảm bảo đã cài đặt Node.js** (phiên bản 16+ khuyến nghị)
   ```bash
   node --version
   npm --version
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Test build local**
   ```bash
   npm run build
   ```

## Deploy lên Vercel

### Phương Pháp 1: Qua Vercel CLI

1. **Cài đặt Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Đăng nhập Vercel**
   ```bash
   vercel login
   ```

3. **Deploy từ dự án**
   ```bash
   vercel
   ```

### Phương Pháp 2: Kết Nối GitHub (Khuyên Dùng)

1. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "Deploy FamPlan"
   git push origin main
   ```

2. **Trên Vercel Dashboard:**
   - Truy cập https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Chọn repository GitHub của bạn
   - Cấu hình:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Thêm Environment Variables (nếu cần)**
   - Trong Project Settings → Environment Variables
   - Thêm các biến cần thiết

4. **Click Deploy**

## Cấu Hình Vercel (vercel.json)

File `vercel.json` đã được tạo với cấu hình tối ưu:
- Hỗ trợ SPA (Single Page Application)
- Redirects cho tất cả routes tới index.html
- Cache strategies tối ưu

## Sau Deploy

1. **Kiểm tra URL Deployment**
   - Vercel sẽ cung cấp URL tương tự: `https://your-project.vercel.app`

2. **Thử nghiệm tính năng**
   - Đăng nhập / Đăng ký
   - Onboarding
   - Dashboard
   - Meal Planner
   - Budget Planning

3. **Kiểm tra Console trình duyệt**
   - Nếu có lỗi, check DevTools Console
   - Xem logs trong Vercel Dashboard → Deployments

## Troubleshooting

### Lỗi: "Cannot find module 'vite'"
- Chạy `npm install` để cài đặt dependencies

### Build thất bại
- Kiểm tra TypeScript errors: `npm run build`
- Xem logs trong Vercel Dashboard

### Trang trắng sau deploy
- Kiểm tra Console trình duyệt
- Đảm bảo import paths chính xác
- Kiểm tra Environment Variables

## Thêm Custom Domain

1. Trong Vercel Dashboard → Project Settings → Domains
2. Thêm domain của bạn
3. Update DNS records tại nhà cung cấp domain

## Tối Ưu Hóa

- Dự án đã sử dụng Tailwind CSS (production-ready)
- Images được optimize tự động
- Code splitting tự động
- Compression được bật mặc định

## Support

Nếu gặp vấn đề:
- Xem logs Vercel: Dashboard → Deployments → Select deployment → Logs
- Check source code errors
- Verify Environment Variables
