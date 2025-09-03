import React from 'react';
import { Building2, User, Calendar, MapPin, FileText } from 'lucide-react';
import { VerificationInfo } from '../types';

interface VerificationHeaderProps {
  verificationInfo: VerificationInfo;
  onInfoChange: (field: keyof VerificationInfo, value: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  showForm: boolean;
}

export const VerificationHeader: React.FC<VerificationHeaderProps> = ({
  verificationInfo,
  onInfoChange,
  darkMode,
  onToggleDarkMode,
  showForm
}) => {
  return (
    <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1E4382] rounded-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#1E4382]'}`}>
                Checklist da Estrutura Física do RH
              </h1>
              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} text-sm mt-1`}>
                Verificação Completa da Infraestrutura
              </p>
            </div>
          </div>
          
          <button
            onClick={onToggleDarkMode}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600' 
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {darkMode ? '☀️ Claro' : '🌙 Escuro'}
          </button>
        </div>

        {/* Verification Info Form */}
        {showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
              <User size={16} />
              Responsável pela Verificação
            </label>
            <input
              type="text"
              value={verificationInfo.verifierName}
              onChange={(e) => onInfoChange('verifierName', e.target.value)}
              placeholder="Nome completo"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
              <Calendar size={16} />
              Data da Verificação
            </label>
            <input
              type="date"
              value={verificationInfo.verificationDate}
              onChange={(e) => onInfoChange('verificationDate', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
              <MapPin size={16} />
              Unidade/Local
            </label>
            <input
              type="text"
              value={verificationInfo.unit}
              onChange={(e) => onInfoChange('unit', e.target.value)}
              placeholder="Ex: Sede - São Paulo"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
              <FileText size={16} />
              Template
            </label>
            <select
              value={verificationInfo.template}
              onChange={(e) => onInfoChange('template', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <option value="padrao">Padrão RH</option>
              <option value="completo">Completo</option>
              <option value="basico">Básico</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};