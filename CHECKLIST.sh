#!/bin/bash
# 🚀 FamPlan Deploy Checklist

echo "=========================================="
echo "  🎉 FamPlan Deploy Checklist"
echo "=========================================="
echo ""

# Check Node.js
echo "✓ Kiểm tra Node.js..."
if command -v node &> /dev/null; then
    echo "  ✅ Node.js: $(node --version)"
else
    echo "  ❌ Node.js chưa cài đặt"
    exit 1
fi

# Check npm
echo ""
echo "✓ Kiểm tra npm..."
if command -v npm &> /dev/null; then
    echo "  ✅ npm: $(npm --version)"
else
    echo "  ❌ npm chưa cài đặt"
    exit 1
fi

# Check project files
echo ""
echo "✓ Kiểm tra file dự án..."
files=("package.json" "vite.config.ts" "tailwind.config.js" "tsconfig.json" ".env.example")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file không tìm thấy"
    fi
done

# Check components
echo ""
echo "✓ Kiểm tra Components..."
components=("Auth.tsx" "Dashboard.tsx" "BudgetPlan.tsx" "MealPlanner.tsx" "Onboarding.tsx")
for component in "${components[@]}"; do
    if [ -f "components/$component" ]; then
        echo "  ✅ components/$component"
    else
        echo "  ❌ components/$component không tìm thấy"
    fi
done

# Check environment
echo ""
echo "✓ Kiểm tra Environment..."
if [ -f ".env.local" ]; then
    echo "  ✅ .env.local tồn tại"
    if grep -q "VITE_GEMINI_API_KEY" .env.local; then
        echo "  ✅ VITE_GEMINI_API_KEY đã được thiết lập"
    else
        echo "  ⚠️  VITE_GEMINI_API_KEY chưa được thiết lập"
    fi
else
    echo "  ⚠️  .env.local chưa được tạo (sao chép từ .env.example)"
fi

echo ""
echo "=========================================="
echo "  📝 Bước Tiếp Theo:"
echo "=========================================="
echo ""
echo "1. Cài đặt dependencies:"
echo "   npm install"
echo ""
echo "2. Cấu hình environment:"
echo "   - Copy .env.example sang .env.local"
echo "   - Thêm VITE_GEMINI_API_KEY"
echo ""
echo "3. Test development:"
echo "   npm run dev"
echo ""
echo "4. Build production:"
echo "   npm run build"
echo ""
echo "5. Deploy lên Vercel:"
echo "   - Push lên GitHub"
echo "   - Kết nối Vercel"
echo "   - Thêm Environment Variables"
echo "   - Deploy!"
echo ""
echo "=========================================="
