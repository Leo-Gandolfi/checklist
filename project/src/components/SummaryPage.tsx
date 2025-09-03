import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, FileText, Calendar } from 'lucide-react';
import { Section, VerificationInfo } from '../types';

interface SummaryPageProps {
  sections: Section[];
  verificationInfo: VerificationInfo;
  darkMode: boolean;
}

export const SummaryPage: React.FC<SummaryPageProps> = ({
  sections,
  verificationInfo,
  darkMode
}) => {
  const getTotalItems = () => {
    return sections.reduce((total, section) => total + section.items.length, 0);
  };

  const getCompletedItems = () => {
    return sections.reduce((total, section) => 
      total + section.items.filter(item => item.response !== null).length, 0
    );
  };

  const getConformityItems = () => {
    return sections.reduce((total, section) => 
      total + section.items.filter(item => item.response === true).length, 0
    );
  };

  const getCriticalIssues = () => {
    return sections.reduce((total, section) => 
      total + section.items.filter(item => item.response === false && item.priority === 'critical').length, 0
    );
  };

  const getNonConformItems = () => {
    return sections.reduce((total, section) => 
      total + section.items.filter(item => item.response === false).length, 0
    );
  };

  const getSectionProgress = (section: Section) => {
    const total = section.items.length;
    const completed = section.items.filter(item => item.response !== null).length;
    const conforming = section.items.filter(item => item.response === true).length;
    return { total, completed, conforming, percentage: (completed / total) * 100 };
  };

  const totalItems = getTotalItems();
  const completedItems = getCompletedItems();
  const conformityItems = getConformityItems();
  const criticalIssues = getCriticalIssues();
  const nonConformItems = getNonConformItems();
  const conformityPercentage = totalItems > 0 ? (conformityItems / totalItems) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Verification Info Summary */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <FileText size={24} className="text-[#1E4382]" />
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#1E4382]'}`}>
            Informações da Verificação
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Responsável:</label>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{verificationInfo.verifierName || 'Não informado'}</p>
          </div>
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Data:</label>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {new Date(verificationInfo.verificationDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Unidade:</label>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{verificationInfo.unit || 'Não informado'}</p>
          </div>
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Template:</label>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{verificationInfo.template}</p>
          </div>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={24} className="text-[#1E4382]" />
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#1E4382]'}`}>
            Estatísticas Gerais
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#1E4382]'}`}>
              {completedItems}/{totalItems}
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Itens Verificados
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl font-bold ${conformityPercentage >= 80 ? 'text-green-600' : conformityPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {Math.round(conformityPercentage)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Taxa de Conformidade
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl font-bold ${conformityItems > 0 ? 'text-green-600' : 'text-slate-400'}`}>
              {conformityItems}
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Itens Conformes
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl font-bold ${criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {criticalIssues}
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Problemas Críticos
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Progresso Geral</span>
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{Math.round((completedItems / totalItems) * 100)}%</span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-3`}>
            <div 
              className="bg-gradient-to-r from-[#1E4382] to-[#2563eb] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedItems / totalItems) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Section Progress */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl shadow-sm border p-6`}>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#1E4382]'} mb-6`}>
          Progresso por Sala
        </h3>
        <div className="space-y-4">
          {sections.map((section) => {
            const progress = getSectionProgress(section);
            const Icon = section.icon; // 👈 aqui
            return (
              <div key={section.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={20} className="text-[#1E4382]" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {progress.completed}/{progress.total}
                    </span>
                    <span className={`text-sm font-medium ${
                      progress.percentage === 100 ? 'text-green-600' : 
                      progress.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {Math.round(progress.percentage)}%
                    </span>
                  </div>
                </div>
                <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-2`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      progress.percentage === 100 ? 'bg-green-500' :
                      progress.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Issues Summary */}
      {nonConformItems > 0 && (
        <div className={`${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} rounded-xl border p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-red-600" />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
              Itens Não Conformes ({nonConformItems})
            </h3>
          </div>
          <div className="space-y-3">
            {sections.map((section) => {
              const nonConformSectionItems = section.items.filter(item => item.response === false);
              if (nonConformSectionItems.length === 0) return null;
              
              return (
                <div key={section.id}>
                  <h4 className={`font-medium ${darkMode ? 'text-red-300' : 'text-red-700'} mb-2`}>
                    {section.title}
                  </h4>
                  <ul className="space-y-1 ml-4">
                    {nonConformSectionItems.map((item) => (
                      <li key={item.id} className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-600'} flex items-center gap-2`}>
                        <XCircle size={14} />
                        <span>{item.name}</span>
                        {item.priority === 'critical' && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            CRÍTICO
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Success Message */}
      {completedItems === totalItems && conformityItems === totalItems && (
        <div className={`${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'} rounded-xl border p-6 text-center`}>
          <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-green-400' : 'text-green-800'} mb-2`}>
            🎉 Parabéns! Verificação Completa
          </h3>
          <p className={`${darkMode ? 'text-green-200' : 'text-green-700'}`}>
            Todos os itens foram verificados e estão em conformidade!
          </p>
        </div>
      )}
    </div>
  );
};