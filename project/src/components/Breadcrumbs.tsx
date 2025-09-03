import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentStep: number;
  totalSteps: number;
  currentSectionTitle: string;
  onStepChange: (step: number) => void;
  darkMode: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentStep,
  totalSteps,
  currentSectionTitle,
  onStepChange,
  darkMode
}) => {
  const steps = [
    'Informações',
    'Sala de Foco',
    'Sala de Agilidade', 
    'Sala Digital',
    'Sala de Solução',
    'Sala de RH',
    'Copa',
    'Resumo'
  ];

  return (
    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b px-4 sm:px-6 lg:px-8 py-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Progresso: {currentStep + 1} de {totalSteps}
            </span>
            <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-2`}>
            <div 
              className="bg-gradient-to-r from-[#1E4382] to-[#2563eb] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1 overflow-x-auto">
          <button
            onClick={() => onStepChange(0)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 0
                ? 'bg-[#1E4382] text-white'
                : darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'text-slate-600 hover:text-[#1E4382] hover:bg-slate-100'
            }`}
          >
            <Home size={16} />
            <span className="hidden sm:inline">Informações</span>
          </button>

          {steps.slice(1, -1).map((step, index) => {
            const stepIndex = index + 1;
            const isActive = currentStep === stepIndex;
            const isCompleted = currentStep > stepIndex;
            
            return (
              <React.Fragment key={step}>
                <ChevronRight size={16} className={`${darkMode ? 'text-slate-500' : 'text-slate-400'} flex-shrink-0`} />
                <button
                  onClick={() => onStepChange(stepIndex)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1E4382] text-white'
                      : isCompleted
                        ? darkMode
                          ? 'text-green-400 hover:text-white hover:bg-slate-700'
                          : 'text-green-600 hover:text-[#1E4382] hover:bg-slate-100'
                        : darkMode
                          ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                          : 'text-slate-500 hover:text-[#1E4382] hover:bg-slate-100'
                  }`}
                >
                  {step}
                </button>
              </React.Fragment>
            );
          })}

          <ChevronRight size={16} className={`${darkMode ? 'text-slate-500' : 'text-slate-400'} flex-shrink-0`} />
          <button
            onClick={() => onStepChange(totalSteps - 1)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === totalSteps - 1
                ? 'bg-[#1E4382] text-white'
                : darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'text-slate-600 hover:text-[#1E4382] hover:bg-slate-100'
            }`}
          >
            <span>Resumo</span>
          </button>
        </nav>

        {/* Current Section Title */}
        <div className="mt-4">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#1E4382]'}`}>
            {currentSectionTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};