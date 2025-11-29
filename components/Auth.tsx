
import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePlaceholder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const colors = ['#ee8c2b', '#13ec5b', '#3b82f6', '#ec4899', '#8b5cf6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const svg = `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${color}" />
        <circle cx="50" cy="40" r="20" fill="rgba(255,255,255,0.9)" />
        <path d="M20 90 Q50 50 80 90" fill="rgba(255,255,255,0.9)" />
      </svg>
    `;
    setProfileImage(`data:image/svg+xml;base64,${btoa(svg)}`);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#221910] text-white font-display">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center flex-grow p-6">
        
        {/* Logo/Hero */}
        <div className="flex justify-center pt-8 pb-6">
          <div className="h-20 w-20 bg-[#ee8c2b] rounded-3xl flex items-center justify-center shadow-lg shadow-[#ee8c2b]/20">
            <span className="material-symbols-outlined text-4xl text-[#221910]">
              local_mall
            </span>
          </div>
        </div>

        {/* Headlines */}
        <div className="w-full text-center mb-8">
          <h1 className="text-white tracking-tight text-3xl font-bold leading-tight">
            {isLogin ? 'Đăng nhập' : 'Tạo Tài Khoản'}
          </h1>
          <p className="text-[#b9ab9d] text-base font-normal leading-normal pt-2">
            Quản lý chi tiêu và bữa ăn thông minh cho gia đình bạn
          </p>
        </div>

        {/* Inputs */}
        <div className="w-full space-y-4">
          {!isLogin && (
             <div className="flex flex-col items-center mb-2">
                <div 
                  className="relative group cursor-pointer" 
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                    <div className={`size-24 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all bg-[#27211c] ${profileImage ? 'border-[#ee8c2b]' : 'border-[#54473b] border-dashed hover:border-[#ee8c2b]'}`}>
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center text-[#8e8174]">
                                <span className="material-symbols-outlined text-3xl mb-1">add_a_photo</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Camera icon overlay when hovering existing image */}
                    {profileImage && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="material-symbols-outlined text-white">edit</span>
                        </div>
                    )}

                    {/* Generate Button (if no image) */}
                    {!profileImage && (
                        <button 
                            onClick={handleGeneratePlaceholder}
                            className="absolute -bottom-2 -right-2 bg-[#54473b] hover:bg-[#ee8c2b] text-white p-2 rounded-full border border-[#221910] transition-colors shadow-md"
                            title="Tạo ảnh ngẫu nhiên"
                        >
                            <span className="material-symbols-outlined text-sm font-bold">shuffle</span>
                        </button>
                    )}
                </div>
                <input 
                    id="avatar-upload"
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <p className="text-[#8e8174] text-xs mt-3">Ảnh đại diện</p>
             </div>
          )}

          {!isLogin && (
             <label className="flex flex-col w-full">
             <span className="text-white text-sm font-bold pb-2">Tên người dùng</span>
             <div className="relative flex w-full items-center">
               <span className="material-symbols-outlined absolute left-4 text-[#8e8174]">person</span>
               <input 
                 className="flex w-full rounded-xl border border-[#54473b] bg-[#27211c] h-14 pl-12 pr-4 text-base text-white placeholder-[#8e8174] focus:border-[#ee8c2b] focus:ring-[#ee8c2b] focus:ring-1 outline-none transition-all" 
                 placeholder="Nhập tên của bạn"
               />
             </div>
           </label>
          )}

          <label className="flex flex-col w-full">
            <span className="text-white text-sm font-bold pb-2">Email</span>
            <div className="relative flex w-full items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#8e8174]">mail</span>
              <input 
                className="flex w-full rounded-xl border border-[#54473b] bg-[#27211c] h-14 pl-12 pr-4 text-base text-white placeholder-[#8e8174] focus:border-[#ee8c2b] focus:ring-[#ee8c2b] focus:ring-1 outline-none transition-all" 
                placeholder="Nhập email của bạn"
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <span className="text-white text-sm font-bold pb-2">Mật khẩu</span>
            <div className="relative flex w-full items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#8e8174]">lock</span>
              <input 
                type="password"
                className="flex w-full rounded-xl border border-[#54473b] bg-[#27211c] h-14 pl-12 pr-12 text-base text-white placeholder-[#8e8174] focus:border-[#ee8c2b] focus:ring-[#ee8c2b] focus:ring-1 outline-none transition-all" 
                placeholder="Nhập mật khẩu"
              />
              <button className="absolute right-4 text-[#8e8174] hover:text-white transition-colors">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </label>
        </div>

        {isLogin && (
          <div className="w-full text-right mt-4">
            <button className="text-[#ee8c2b] text-sm font-bold hover:underline">Quên mật khẩu?</button>
          </div>
        )}

        {/* CTA */}
        <div className="w-full mt-8">
          <button 
            onClick={onLogin}
            className="w-full h-14 rounded-xl bg-[#ee8c2b] text-[#221910] text-lg font-bold shadow-lg shadow-[#ee8c2b]/25 hover:bg-[#d9771f] transition-all transform active:scale-95"
            title={isLogin ? "Đăng nhập" : "Đăng ký tài khoản mới"}
          >
            {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
          </button>
        </div>

        {/* Social */}
        <div className="flex items-center w-full gap-4 my-8">
          <hr className="flex-grow border-t border-[#54473b]" />
          <p className="text-[#8e8174] text-sm">Hoặc tiếp tục với</p>
          <hr className="flex-grow border-t border-[#54473b]" />
        </div>

        <div className="flex w-full justify-center items-center gap-4">
          {['google', 'facebook', 'apple'].map((provider) => (
             <button 
               key={provider} 
               onClick={onLogin}
               className="flex h-14 w-14 items-center justify-center rounded-full border border-[#54473b] bg-[#27211c] hover:bg-[#322a24] transition-colors"
               title={`Đăng nhập bằng ${provider}`}
             >
               <img 
                src={
                    provider === 'google' ? "https://www.svgrepo.com/show/475656/google-color.svg" :
                    provider === 'facebook' ? "https://www.svgrepo.com/show/475647/facebook-color.svg" :
                    "https://www.svgrepo.com/show/511330/apple-173.svg"
                } 
                alt={provider} 
                className={`h-6 w-6 ${provider === 'apple' ? 'invert' : ''}`} 
               />
             </button>
          ))}
        </div>

        {/* Toggle Mode */}
        <div className="w-full text-center py-6">
          <p className="text-[#b9ab9d] text-base">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-[#ee8c2b] hover:underline"
            >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
