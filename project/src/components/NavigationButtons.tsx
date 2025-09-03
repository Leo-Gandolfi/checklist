import React from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onExport: () => void;
  canExport: boolean;
  darkMode: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onExport,
  canExport,
  darkMode
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-slate-200">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          isFirstStep
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : darkMode
              ? 'bg-slate-700 text-white border border-slate-600 hover:bg-slate-600'
              : 'bg-white text-[#1E4382] border border-[#1E4382] hover:bg-[#1E4382] hover:text-white'
        }`}
      >
        <ChevronLeft size={20} />
        Anterior
      </button>

      <div className="flex items-center gap-4">
        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {currentStep + 1} de {totalSteps}
        </span>
        
        {isLastStep && (
          <button
            onClick={onExport}
            disabled={!canExport}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              canExport
                ? 'bg-gradient-to-r from-[#1E4382] to-[#2563eb] text-white hover:from-[#1a3a75] hover:to-[#1d4ed8] shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Download size={20} />
            Exportar Relatório
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={isLastStep}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          isLastStep
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#1E4382] to-[#2563eb] text-white hover:from-[#1a3a75] hover:to-[#1d4ed8] shadow-md hover:shadow-lg'
        }`}
      >
        Próximo
        <ChevronRight size={20} />
      </button>
    </div>
  );
};