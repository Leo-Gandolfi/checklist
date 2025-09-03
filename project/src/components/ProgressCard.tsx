import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ProgressCardProps {
  totalItems: number;
  completedItems: number;
  conformityItems: number;
  criticalIssues: number;
  darkMode: boolean;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  totalItems,
  completedItems,
  conformityItems,
  criticalIssues,
  darkMode
}) => {
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const conformityPercentage = totalItems > 0 ? (conformityItems / totalItems) * 100 : 0;

  return (
    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-100'} rounded-xl shadow-sm border p-6 mb-8`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
            {Math.round(progressPercentage)}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-blue-600'} flex items-center justify-center gap-1`}>
            <Clock size={16} />
            Progresso
          </div>
        </div>

        <div className="text-center">
          <div className={`text-2xl font-bold ${conformityPercentage >= 80 ? 'text-green-600' : conformityPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {Math.round(conformityPercentage)}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-blue-600'} flex items-center justify-center gap-1`}>
            <CheckCircle size={16} />
            Conformidade
          </div>
        </div>

        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
            {completedItems}/{totalItems}
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-blue-600'} flex items-center justify-center gap-1`}>
            <TrendingUp size={16} />
            Verificados
          </div>
        </div>

        <div className="text-center">
          <div className={`text-2xl font-bold ${criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {criticalIssues}
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-blue-600'} flex items-center justify-center gap-1`}>
            <AlertTriangle size={16} />
            Críticos
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Progresso Geral</span>
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{completedItems} de {totalItems} itens</span>
        </div>
        <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-blue-100'} rounded-full h-3`}>
          <div 
            className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm">
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Taxa de Conformidade</span>
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{conformityItems} conformes</span>
        </div>
        <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-3`}>
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              conformityPercentage >= 80 ? 'bg-gradient-to-r from-green-600 to-green-500' :
              conformityPercentage >= 60 ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' :
              'bg-gradient-to-r from-red-600 to-red-500'
            }`}
            style={{ width: `${conformityPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};