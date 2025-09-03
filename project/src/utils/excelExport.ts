import * as XLSX from 'xlsx';
import { Section, VerificationInfo, ChecklistItem } from '../types';

export const exportToExcel = (sections: Section[], verificationInfo: VerificationInfo) => {
  const data: any[] = [];
  
  // Header information
  data.push(['CHECKLIST DA ESTRUTURA FÍSICA DO RH']);
  data.push([]);
  data.push(['INFORMAÇÕES DA VERIFICAÇÃO']);
  data.push(['Responsável:', verificationInfo.verifierName]);
  data.push(['Data da Verificação:', verificationInfo.verificationDate]);
  data.push(['Unidade/Local:', verificationInfo.unit]);
  data.push(['Template Utilizado:', verificationInfo.template]);
  data.push([]);

  // Summary statistics
  const totalItems = sections.reduce((total, section) => total + section.items.length, 0);
  const completedItems = sections.reduce((total, section) => 
    total + section.items.filter(item => item.response !== null).length, 0
  );
  const conformityItems = sections.reduce((total, section) => 
    total + section.items.filter(item => item.response === true).length, 0
  );
  const criticalIssues = sections.reduce((total, section) => 
    total + section.items.filter(item => item.response === false && item.priority === 'critical').length, 0
  );

  data.push(['RESUMO ESTATÍSTICO']);
  data.push(['Total de Itens:', totalItems]);
  data.push(['Itens Verificados:', completedItems]);
  data.push(['Itens em Conformidade:', conformityItems]);
  data.push(['Taxa de Conformidade:', `${Math.round((conformityItems / totalItems) * 100)}%`]);
  data.push(['Problemas Críticos:', criticalIssues]);
  data.push([]);

  // Action plan for non-conformities
  data.push(['PLANO DE AÇÃO - ITENS NÃO CONFORMES']);
  data.push(['Sala', 'Item', 'Prioridade', 'Estado', 'Observações', 'Ação Recomendada']);
  
  sections.forEach(section => {
    section.items.forEach(item => {
      if (item.response === false) {
        const actionRecommendation = getActionRecommendation(item);
        data.push([
          section.title,
          item.name,
          getPriorityLabel(item.priority),
          getConditionLabel(item.condition),
          item.observations || 'Sem observações',
          actionRecommendation
        ]);
      }
    });
  });
  
  data.push([]);

  // Detailed data by section
  data.push(['DETALHAMENTO POR SALA']);
  sections.forEach(section => {
    data.push([]);
    data.push([section.title.toUpperCase()]);
    data.push(['Item', 'Status', 'Prioridade', 'Estado', 'Qtd. Esperada', 'Qtd. Encontrada', 'Última Manutenção', 'Observações']);
    
    section.items.forEach(item => {
      const status = item.response === null ? 'Não Verificado' : 
                   item.response === true ? 'Conforme' : 'Não Conforme';
      
      data.push([
        item.name,
        status,
        getPriorityLabel(item.priority),
        getConditionLabel(item.condition),
        item.expectedQuantity || 'N/A',
        item.foundQuantity || 'N/A',
        item.lastMaintenance || 'N/A',
        item.observations || 'Sem observações'
      ]);
    });
  });

  // Historical comparison section
  data.push([]);
  data.push(['COMPARATIVO HISTÓRICO']);
  data.push(['(Para implementação futura - integração com verificações anteriores)']);

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  
  // Style the worksheet
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  
  // Set column widths
  worksheet['!cols'] = [
    { width: 25 }, // Sala/Item
    { width: 20 }, // Status
    { width: 15 }, // Prioridade
    { width: 15 }, // Estado
    { width: 15 }, // Qtd. Esperada
    { width: 15 }, // Qtd. Encontrada
    { width: 18 }, // Última Manutenção
    { width: 40 }  // Observações
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Checklist RH');
  
  const fileName = `Checklist_Estrutura_RH_${verificationInfo.verificationDate.replace(/-/g, '')}_${verificationInfo.verifierName.replace(/\s+/g, '_')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case 'critical': return 'Crítico';
    case 'important': return 'Importante';
    case 'optional': return 'Opcional';
    default: return 'N/A';
  }
};

const getConditionLabel = (condition: string | null) => {
  switch (condition) {
    case 'new': return 'Novo';
    case 'good': return 'Bom';
    case 'regular': return 'Regular';
    case 'poor': return 'Ruim';
    default: return 'N/A';
  }
};

const getActionRecommendation = (item: ChecklistItem): string => {
  if (item.priority === 'critical') {
    return 'AÇÃO IMEDIATA NECESSÁRIA - Resolver em até 24h';
  } else if (item.priority === 'important') {
    return 'Programar correção em até 7 dias';
  } else {
    return 'Incluir no próximo ciclo de manutenção';
  }
};