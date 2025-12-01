
import React from 'react';
import { Recipe } from '../types';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[85vh] rounded-t-[32px] sm:rounded-[32px] overflow-hidden relative z-10 animate-slide-up flex flex-col shadow-2xl">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
            <span className="material-symbols-outlined">close</span>
        </button>

        {/* Hero Image */}
        <div className="h-64 w-full shrink-0 relative">
            <img 
                src={recipe.image} 
                alt={recipe.name} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                    {recipe.type}
                </span>
                <h2 className="text-2xl font-display font-bold text-white leading-tight">{recipe.name}</h2>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
            
            {/* Stats Row */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                <div className="text-center flex-1 border-r border-gray-100">
                    <span className="material-symbols-outlined text-orange-500 mb-1">timer</span>
                    <p className="text-xs text-gray-400 font-bold uppercase">Thời gian</p>
                    <p className="font-bold text-gray-800">{recipe.time}</p>
                </div>
                <div className="text-center flex-1 border-r border-gray-100">
                    <span className="material-symbols-outlined text-green-500 mb-1">local_fire_department</span>
                    <p className="text-xs text-gray-400 font-bold uppercase">Calo</p>
                    <p className="font-bold text-gray-800">{recipe.calories || 300} kcal</p>
                </div>
                <div className="text-center flex-1">
                    <span className="material-symbols-outlined text-blue-500 mb-1">attach_money</span>
                    <p className="text-xs text-gray-400 font-bold uppercase">Chi phí</p>
                    <p className="font-bold text-gray-800">
                        {formatMoney(recipe.ingredients.reduce((acc, i) => acc + i.price, 0))}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 italic text-sm mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                "{recipe.desc}"
            </p>

            {/* Ingredients */}
            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">grocery</span>
                    Nguyên liệu
                </h3>
                <div className="space-y-3">
                    {recipe.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span className="text-gray-700 font-medium text-sm">{ing.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-gray-900 block">{ing.qty} {ing.unit}</span>
                                {/* <span className="text-[10px] text-gray-400">{formatMoney(ing.price)}</span> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">cooking</span>
                    Cách làm
                </h3>
                <div className="space-y-6 relative pl-2">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                    {recipe.instructions.map((step, idx) => (
                        <div key={idx} className="relative flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 z-10 ring-4 ring-white shadow-sm">
                                {idx + 1}
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 pt-0 bg-white">
            <button 
                onClick={onClose}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-black transition-all active:scale-[0.98]"
            >
                Đã hiểu
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
