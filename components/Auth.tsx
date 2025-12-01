import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth process
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#221910] dark:bg-background-dark text-white font-display">
      {/* Login View */}
      {isLogin ? (
        <div className="relative flex h-auto min-h-screen w-full flex-col items-center p-4">
          <div className="w-full max-w-md mx-auto flex flex-col justify-center flex-grow">
            {/* App Logo */}
            <div className="flex justify-center pt-8 pb-10">
              <div className="h-16 w-16 bg-[#ee8c2b] rounded-2xl flex items-center justify-center text-[#221910]">
                <span className="material-symbols-outlined text-4xl">local_mall</span>
              </div>
            </div>

            {/* Headline and Body Text */}
            <div className="w-full text-center mb-8">
              <h1 className="text-zinc-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">Đăng nhập</h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-base font-normal leading-normal pt-2">
                Quản lý chi tiêu và bữa ăn thông minh cho gia đình bạn
              </p>
            </div>

            {/* Input Fields */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <label className="flex flex-col w-full">
                <p className="text-zinc-800 dark:text-white text-base font-medium leading-normal pb-2">Email hoặc Tên đăng nhập</p>
                <div className="relative flex w-full items-center">
                  <span className="material-symbols-outlined absolute left-4 text-zinc-500 dark:text-zinc-400">person</span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#ee8c2b]/50 border border-zinc-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] focus:border-[#ee8c2b] h-14 placeholder:text-zinc-400 dark:placeholder:text-[#b9ab9d] pl-12 pr-4 text-base font-normal leading-normal"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </label>

              <label className="flex flex-col w-full">
                <p className="text-zinc-800 dark:text-white text-base font-medium leading-normal pb-2">Mật khẩu</p>
                <div className="relative flex w-full items-center">
                  <span className="material-symbols-outlined absolute left-4 text-zinc-500 dark:text-zinc-400">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#ee8c2b]/50 border border-zinc-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] focus:border-[#ee8c2b] h-14 placeholder:text-zinc-400 dark:placeholder:text-[#b9ab9d] pl-12 pr-12 text-base font-normal leading-normal"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-zinc-500 dark:text-zinc-400"
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </label>

              {/* Forgot Password */}
              <div className="w-full text-right mt-4">
                <a href="#" className="text-[#ee8c2b] text-sm font-medium leading-normal underline">Quên mật khẩu?</a>
              </div>

              {/* CTA Button */}
              <div className="w-full mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-[#ee8c2b] text-[#221910] text-base font-bold leading-normal flex items-center justify-center hover:bg-opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
              </div>
            </form>

            {/* Social Login Separator */}
            <div className="flex items-center w-full gap-4 my-8">
              <hr className="flex-grow border-t border-zinc-200 dark:border-zinc-700" />
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-normal">Hoặc đăng nhập với</p>
              <hr className="flex-grow border-t border-zinc-200 dark:border-zinc-700" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex w-full justify-center items-center gap-4">
              <button className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-transparent hover:bg-gray-50">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.484,12.967,1.484 c-6.211,0-11.25,5.039-11.25,11.25c0,6.211,5.039,11.25,11.25,11.25c6.211,0,11.25-5.039,11.25-11.25 C23.967,11.297,23.722,10.932,12.545,10.239z"/>
                </svg>
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-transparent hover:bg-gray-50">
                <svg className="h-6 w-6 dark:invert" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.05 20.28c-5.07 2.61-10.84 1.04-13.46-4.02-2.61-5.07-1.04-10.84 4.02-13.46 5.07-2.61 10.84-1.04 13.46 4.02 2.61 5.07 1.04 10.84-4.02 13.46M14.5 9.5L13 12l1.5 2.5H12l-1.5-2.5 1.5-2.5z"/>
                </svg>
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-transparent hover:bg-gray-50">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="w-full text-center py-8">
              <p className="text-zinc-600 dark:text-zinc-400 text-base">
                Chưa có tài khoản? <button onClick={() => setIsLogin(false)} className="font-bold text-[#ee8c2b] hover:underline">Đăng ký ngay</button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Signup View */
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-[#221910] group/design-root overflow-x-hidden">
          <div className="flex flex-col w-full grow">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6 font-display">Tạo Tài Khoản</h1>
            <div className="flex flex-col gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2 font-display">Tên người dùng</p>
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] focus:border-[#ee8c2b] dark:focus:border-[#ee8c2b] h-14 placeholder:text-slate-400 dark:placeholder:text-[#b9ab9d] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
                    placeholder="Nhập tên của bạn"
                  />
                  <div className="text-slate-500 dark:text-[#b9ab9d] flex border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] items-center justify-center pr-[15px] rounded-r-xl border-l-0">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                </div>
              </label>

              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2 font-display">Email</p>
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] focus:border-[#ee8c2b] dark:focus:border-[#ee8c2b] h-14 placeholder:text-slate-400 dark:placeholder:text-[#b9ab9d] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
                    placeholder="Nhập email của bạn"
                  />
                  <div className="text-slate-500 dark:text-[#b9ab9d] flex border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] items-center justify-center pr-[15px] rounded-r-xl border-l-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                </div>
              </label>

              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2 font-display">Mật khẩu</p>
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] focus:border-[#ee8c2b] dark:focus:border-[#ee8c2b] h-14 placeholder:text-slate-400 dark:placeholder:text-[#b9ab9d] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
                    placeholder="Tạo mật khẩu"
                  />
                  <div className="text-slate-500 dark:text-[#b9ab9d] flex border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] items-center justify-center pr-[15px] rounded-r-xl border-l-0">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                </div>
              </label>

              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2 font-display">Xác nhận mật khẩu</p>
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] focus:border-[#ee8c2b] dark:focus:border-[#ee8c2b] h-14 placeholder:text-slate-400 dark:placeholder:text-[#b9ab9d] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
                    placeholder="Xác nhận mật khẩu"
                  />
                  <div className="text-slate-500 dark:text-[#b9ab9d] flex border border-slate-300 dark:border-[#54473b] bg-white dark:bg-[#27211c] items-center justify-center pr-[15px] rounded-r-xl border-l-0">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-4 px-4 py-6">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center font-bold text-white text-base h-14 w-full rounded-xl bg-[#ee8c2b] hover:bg-opacity-90 transition-colors font-display"
              >
                Đăng ký
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 px-4 pb-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal font-display">Hoặc tiếp tục với</p>
              <div className="flex w-full items-center justify-center gap-4">
                <button className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.484,12.967,1.484 c-6.211,0-11.25,5.039-11.25,11.25c0,6.211,5.039,11.25,11.25,11.25c6.211,0,11.25-5.039,11.25-11.25 C23.967,11.297,23.722,10.932,12.545,10.239z"/>
                  </svg>
                </button>
                <button className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50">
                  <svg className="h-6 w-6 dark:invert" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.05 20.28c-5.07 2.61-10.84 1.04-13.46-4.02-2.61-5.07-1.04-10.84 4.02-13.46 5.07-2.61 10.84-1.04 13.46 4.02 2.61 5.07 1.04 10.84-4.02 13.46M14.5 9.5L13 12l1.5 2.5H12l-1.5-2.5 1.5-2.5z"/>
                  </svg>
                </button>
                <button className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-4 py-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal font-display">
                Bằng cách đăng ký, bạn đồng ý với
                <a className="font-medium text-[#ee8c2b] hover:underline" href="#"> Điều khoản Dịch vụ</a> và
                <a className="font-medium text-[#ee8c2b] hover:underline" href="#"> Chính sách Bảo mật</a> của chúng tôi.
              </p>
            </div>

            <div className="px-4 pt-2 pb-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal font-display">
                Đã có tài khoản?
                <button onClick={() => setIsLogin(true)} className="font-bold text-[#ee8c2b] hover:underline ml-1">Đăng nhập</button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
