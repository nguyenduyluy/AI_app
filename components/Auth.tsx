import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(true);

  // SVG Icons
  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4 transform rotate-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-display">
                {isRegister ? 'Tạo Tài Khoản' : 'Chào mừng trở lại'}
            </h1>
            <p className="text-zinc-400 text-sm">
                {isRegister ? 'Quản lý tài chính & bữa ăn cho gia đình bạn' : 'Đăng nhập để tiếp tục hành trình'}
            </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
            <div className="space-y-5">
                
                {isRegister && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 ml-1 uppercase tracking-wider">Tên của bạn</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                                <UserIcon />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Nhập tên"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 ml-1 uppercase tracking-wider">Email</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                            <MailIcon />
                        </div>
                        <input 
                            type="email" 
                            placeholder="name@example.com"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 ml-1 uppercase tracking-wider">Mật khẩu</label>
                    <div className="relative group">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                            <LockIcon />
                        </div>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                {isRegister && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 ml-1 uppercase tracking-wider">Xác nhận mật khẩu</label>
                        <div className="relative group">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                                <LockIcon />
                            </div>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                        </div>
                    </div>
                )}

                <button 
                    onClick={onLogin}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                >
                    {isRegister ? 'Đăng Ký Ngay' : 'Đăng Nhập'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-zinc-800 flex-1"></div>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Hoặc</span>
                    <div className="h-px bg-zinc-800 flex-1"></div>
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={onLogin}
                        className="h-12 flex-1 bg-zinc-800 rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center justify-center hover:border-zinc-600 active:scale-95"
                    >
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 opacity-80" alt="Google" />
                    </button>
                    <button 
                        onClick={onLogin}
                        className="h-12 flex-1 bg-zinc-800 rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center justify-center hover:border-zinc-600 active:scale-95"
                    >
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 opacity-80" alt="Facebook" />
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-zinc-500 text-sm">
                        {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
                        <button 
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-orange-500 font-bold ml-1.5 hover:text-orange-400 transition-colors"
                        >
                            {isRegister ? 'Đăng nhập' : 'Đăng ký ngay'}
                        </button>
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;