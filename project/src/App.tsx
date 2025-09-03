import React, { useState, useEffect } from 'react';
import { Section, VerificationInfo, ChecklistItem } from './types';
import { ItemCard } from './components/ItemCard';
import { VerificationHeader } from './components/VerificationHeader';
import { ProgressCard } from './components/ProgressCard';
import { Breadcrumbs } from './components/Breadcrumbs';
import { NavigationButtons } from './components/NavigationButtons';
import { SummaryPage } from './components/SummaryPage';
import { exportToExcel } from './utils/excelExport';
import { initialSections } from './data/checklistData';

function App() {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [verificationInfo, setVerificationInfo] = useState<VerificationInfo>({
    verifierName: '',
    verificationDate: new Date().toISOString().split('T')[0],
    unit: '',
    template: 'padrao'
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  console.log("chegou aqui", {
  ItemCard,
  VerificationHeader,
  ProgressCard,
  Breadcrumbs,
  NavigationButtons,
  SummaryPage
});



  // Steps: 0=Info, 1-6=Sections, 7=Summary
  const totalSteps = sections.length + 2;

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled) {
      const timer = setTimeout(() => {
        localStorage.setItem('checklist-data', JSON.stringify({ 
          sections, 
          verificationInfo, 
          currentStep 
        }));
        localStorage.setItem('checklist-timestamp', new Date().toISOString());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sections, verificationInfo, currentStep, autoSaveEnabled]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('checklist-data');
    if (savedData) {
      try {
        const { sections: savedSections, verificationInfo: savedInfo, currentStep: savedStep } = JSON.parse(savedData);
        setSections(savedSections);
        setVerificationInfo(savedInfo);
        setCurrentStep(savedStep || 0);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleResponseChange = (sectionId: string, itemId: string, response: boolean) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, response } : item
              )
            }
          : section
      )
    );
  };

  const handleConditionChange = (sectionId: string, itemId: string, condition: ChecklistItem['condition']) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, condition } : item
              )
            }
          : section
      )
    );
  };

  const handleObservationChange = (sectionId: string, itemId: string, observation: string) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, observations: observation } : item
              )
            }
          : section
      )
    );
  };

  const handleQuantityChange = (sectionId: string, itemId: string, found: number) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, foundQuantity: found } : item
              )
            }
          : section
      )
    );
  };

  const handleMaintenanceChange = (sectionId: string, itemId: string, date: string) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, lastMaintenance: date } : item
              )
            }
          : section
      )
    );
  };


  const handleVerificationInfoChange = (field: keyof VerificationInfo, value: string) => {
    setVerificationInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleExport = () => {
    if (!verificationInfo.verifierName.trim()) {
      alert('Por favor, preencha o nome do responsável pela verificação antes de exportar.');
      return;
    }
    exportToExcel(sections, verificationInfo);
  };

  const getCurrentSectionTitle = () => {
    if (currentStep === 0) return 'Informações da Verificação';
    if (currentStep === totalSteps - 1) return 'Resumo e Exportação';
    const sectionIndex = currentStep - 1;
    return sections[sectionIndex]?.title || '';
  };

  const getCurrentSection = () => {
    if (currentStep === 0 || currentStep === totalSteps - 1) return null;
    const sectionIndex = currentStep - 1;
    return sections[sectionIndex];
  };

  const canExport = verificationInfo.verifierName.trim().length > 0;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <VerificationHeader
        verificationInfo={verificationInfo}
        onInfoChange={handleVerificationInfoChange}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        showForm={currentStep === 0}
      />

      <Breadcrumbs
        currentStep={currentStep}
        totalSteps={totalSteps}
        currentSectionTitle={getCurrentSectionTitle()}
        onStepChange={handleStepChange}
        darkMode={darkMode}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 0: Information Form */}
        {currentStep === 0 && (
          <div className="space-y-8">
            <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl shadow-sm border p-8`}>
              <div className="text-center mb-8">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#1E4382]'} mb-4`}>
                  Bem-vindo ao Checklist de Estrutura Física do RH
                </h2>
                <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
                  Este sistema permite verificar a conformidade da infraestrutura física das salas do RH. 
                  Preencha as informações abaixo para começar a verificação.
                </p>
              </div>

              <ProgressCard
                totalItems={sections.reduce((total, section) => total + section.items.length, 0)}
                completedItems={sections.reduce((total, section) => 
                  total + section.items.filter(item => item.response !== null).length, 0
                )}
                conformityItems={sections.reduce((total, section) => 
                  total + section.items.filter(item => item.response === true).length, 0
                )}
                criticalIssues={sections.reduce((total, section) => 
                  total + section.items.filter(item => item.response === false && item.priority === 'critical').length, 0
                )}
                darkMode={darkMode}
              />

              {/* Instructions */}
              <div className={`${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#1E4382]'} mb-4`}>
                  Instruções de Uso
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} space-y-2`}>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E4382] mt-1">•</span>
                      Preencha todas as informações do cabeçalho
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E4382] mt-1">•</span>
                      Navegue pelas salas usando os breadcrumbs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E4382] mt-1">•</span>
                      Verifique cada item e marque como Conforme/Não Conforme
                    </li>
                  </ul>
                  <ul className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} space-y-2`}>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E4382] mt-1">•</span>
                      Avalie o estado de conservação de cada item
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E4382] mt-1">•</span>
                      Registre observações detalhadas quando necessário
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E4382] mt-1">•</span>
                      Os dados são salvos automaticamente
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Steps 1-6: Section Pages */}
        {currentStep > 0 && currentStep < totalSteps - 1 && (
          <div className="space-y-8">
            {(() => {
              const section = getCurrentSection();
              if (!section) return null;
              
              const Icon = section.icon;
              return (
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl shadow-sm border overflow-hidden`}>
                  <div className="bg-gradient-to-r from-[#1E4382] to-[#2563eb] px-6 py-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <Icon size={32} className="text-white" />

                        <div>
                          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                          <p className="text-blue-100 mt-1">
                            Verifique todos os itens desta sala
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-white/20 text-white text-sm px-4 py-2 rounded-full mb-2">
                          {section.items.filter(item => item.response !== null).length}/{section.items.length} verificados
                        </div>
                        <div className="bg-white/20 text-white text-sm px-4 py-2 rounded-full">
                          {section.items.filter(item => item.response === true).length} conformes
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid gap-6">
                      {section.items.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          sectionId={section.id}
                          onResponseChange={handleResponseChange}
                          onConditionChange={handleConditionChange}
                          onObservationChange={handleObservationChange}
                          onQuantityChange={handleQuantityChange}
                          onMaintenanceChange={handleMaintenanceChange}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Step 7: Summary Page */}
        {currentStep === totalSteps - 1 && (
          <SummaryPage
            sections={sections}
            verificationInfo={verificationInfo}
            darkMode={darkMode}
          />
        )}

        {/* Navigation */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onExport={handleExport}
          canExport={canExport}
          darkMode={darkMode}
        />

        {/* Footer */}
        <div className={`mt-16 text-center pb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <p className="text-sm">
            Sistema de Checklist RH v3.0 - Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p className="text-xs mt-2">
            {autoSaveEnabled && 'Auto-save ativo'} | Dados salvos localmente no navegador
          </p>
        </div>
      </div>
    </div>

  );
  
}

export default App;