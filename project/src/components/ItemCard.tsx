import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Camera, MessageSquare } from 'lucide-react';
import { ChecklistItem } from '../types';

interface ItemCardProps {
  item: ChecklistItem;
  sectionId: string;
  onResponseChange: (sectionId: string, itemId: string, response: boolean) => void;
  onConditionChange: (sectionId: string, itemId: string, condition: ChecklistItem['condition']) => void;
  onObservationChange: (sectionId: string, itemId: string, observation: string) => void;
  onQuantityChange: (sectionId: string, itemId: string, found: number) => void;
  onMaintenanceChange: (sectionId: string, itemId: string, date: string) => void;
  darkMode: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  sectionId,
  onResponseChange,
  onConditionChange,
  onObservationChange,
  onQuantityChange,
  onMaintenanceChange,
  darkMode
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return darkMode ? 'text-red-400 bg-red-900/30 border-red-800' : 'text-red-600 bg-red-50 border-red-200';
      case 'important': return darkMode ? 'text-orange-400 bg-orange-900/30 border-orange-800' : 'text-orange-600 bg-orange-50 border-orange-200';
      case 'optional': return darkMode ? 'text-blue-400 bg-blue-900/30 border-blue-800' : 'text-blue-600 bg-blue-50 border-blue-200';
      default: return darkMode ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Crítico';
      case 'important': return 'Importante';
      case 'optional': return 'Opcional';
      default: return '';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg p-6 space-y-4 hover:border-[#1E4382] transition-colors shadow-sm`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{item.name}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
              {getPriorityLabel(item.priority)}
            </span>
          </div>
          
          {/* Quantity */}
          {item.expectedQuantity && (
            <div className="flex items-center gap-4 mb-2">
              <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Esperado: {item.expectedQuantity}</span>
              <div className="flex items-center gap-2">
                <label className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Encontrado:</label>
                <input
                  type="number"
                  min="0"
                  value={item.foundQuantity || ''}
                  onChange={(e) => onQuantityChange(sectionId, item.id, parseInt(e.target.value) || 0)}
                  className={`w-16 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-[#1E4382] focus:border-[#1E4382] ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Response Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onResponseChange(sectionId, item.id, true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            item.response === true
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : darkMode
                ? 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-green-900/30 hover:text-green-400'
                : 'bg-slate-50 text-slate-600 border border-slate-300 hover:bg-green-50 hover:text-green-700'
          }`}
        >
          <CheckCircle size={16} />
          Conforme
        </button>
        <button
          onClick={() => onResponseChange(sectionId, item.id, false)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            item.response === false
              ? 'bg-red-100 text-red-800 border-2 border-red-300'
              : darkMode
                ? 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-red-900/30 hover:text-red-400'
                : 'bg-slate-50 text-slate-600 border border-slate-300 hover:bg-red-50 hover:text-red-700'
          }`}
        >
          <XCircle size={16} />
          Não Conforme
        </button>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Estado de Conservação:</label>
        <select
          value={item.condition || ''}
          onChange={(e) => onConditionChange(sectionId, item.id, e.target.value as ChecklistItem['condition'])}
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#1E4382] focus:border-[#1E4382] ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'
          }`}
        >
          <option value="">Selecione...</option>
          <option value="new">Novo</option>
          <option value="good">Bom</option>
          <option value="regular">Regular</option>
          <option value="poor">Ruim</option>
        </select>
      </div>

      {/* Last Maintenance */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Última Manutenção:</label>
        <input
          type="date"
          value={item.lastMaintenance || ''}
          onChange={(e) => onMaintenanceChange(sectionId, item.id, e.target.value)}
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#1E4382] focus:border-[#1E4382] ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'
          }`}
        />
      </div>

      {/* Observations */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
          <MessageSquare size={16} />
          Observações:
        </label>
        <textarea
          value={item.observations}
          onChange={(e) => onObservationChange(sectionId, item.id, e.target.value)}
          placeholder="Descreva problemas encontrados, detalhes importantes..."
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#1E4382] focus:border-[#1E4382] resize-none ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
              : 'bg-white border-slate-300 text-slate-900'
          }`}
          rows={2}
        />
      </div>

      {/* Photo Button */}
      <button className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${
        darkMode 
          ? 'text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-slate-300' 
          : 'text-slate-600 border-slate-300 hover:bg-slate-50'
      }`}>
        <Camera size={16} />
        Adicionar Foto
      </button>
    </div>
  );
};