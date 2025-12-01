# 🚀 FamPlan Deploy Checklist (Windows PowerShell)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  🎉 FamPlan Deploy Checklist" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "✓ Kiểm tra Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  ❌ Node.js chưa cài đặt" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host ""
Write-Host "✓ Kiểm tra npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "  ✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "  ❌ npm chưa cài đặt" -ForegroundColor Red
    exit 1
}

# Check project files
Write-Host ""
Write-Host "✓ Kiểm tra file dự án..." -ForegroundColor Yellow
$files = @("package.json", "vite.config.ts", "tailwind.config.js", "tsconfig.json", ".env.example")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file không tìm thấy" -ForegroundColor Red
    }
}

# Check components
Write-Host ""
Write-Host "✓ Kiểm tra Components..." -ForegroundColor Yellow
$components = @("Auth.tsx", "Dashboard.tsx", "BudgetPlan.tsx", "MealPlanner.tsx", "Onboarding.tsx")
foreach ($component in $components) {
    $componentPath = "components\$component"
    if (Test-Path $componentPath) {
        Write-Host "  ✅ $componentPath" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $componentPath không tìm thấy" -ForegroundColor Red
    }
}

# Check environment
Write-Host ""
Write-Host "✓ Kiểm tra Environment..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "  ✅ .env.local tồn tại" -ForegroundColor Green
    $envContent = Get-Content ".env.local"
    if ($envContent -match "VITE_GEMINI_API_KEY") {
        Write-Host "  ✅ VITE_GEMINI_API_KEY đã được thiết lập" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  VITE_GEMINI_API_KEY chưa được thiết lập" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠️  .env.local chưa được tạo (sao chép từ .env.example)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  📝 Bước Tiếp Theo:" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Cài đặt dependencies:" -ForegroundColor Yellow
Write-Host "   npm install" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Cấu hình environment:" -ForegroundColor Yellow
Write-Host "   - Copy .env.example sang .env.local" -ForegroundColor Cyan
Write-Host "   - Thêm VITE_GEMINI_API_KEY" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Test development:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Build production:" -ForegroundColor Yellow
Write-Host "   npm run build" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Deploy lên Vercel:" -ForegroundColor Yellow
Write-Host "   - Push lên GitHub" -ForegroundColor Cyan
Write-Host "   - Kết nối Vercel" -ForegroundColor Cyan
Write-Host "   - Thêm Environment Variables" -ForegroundColor Cyan
Write-Host "   - Deploy!" -ForegroundColor Cyan
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
