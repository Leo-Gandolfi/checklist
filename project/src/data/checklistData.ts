import { Section } from '../types';
import { Focus, Zap, Monitor, Building2, Users, Coffee } from 'lucide-react';
import React from 'react';

export const initialSections: Section[] = [
  {
    id: 'sala-foco',
    title: 'Sala de Foco',
    icon: Focus,
    items: [
      { id: 'sf-cadeiras', name: 'Cadeiras', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 8, foundQuantity: 0 },
      { id: 'sf-mesas', name: 'Mesas', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'sf-luz', name: 'Iluminação', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'sf-ar', name: 'Ar condicionado', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sf-tv', name: 'TV/Monitor', response: null, priority: 'optional', condition: null, observations: '' },
      { id: 'sf-tomadas', name: 'Tomadas e pontos elétricos', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 6, foundQuantity: 0 },
      { id: 'sf-limpeza', name: 'Limpeza e organização', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sf-ventilacao', name: 'Ventilação adequada', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sf-acessibilidade', name: 'Acesso para PcD', response: null, priority: 'critical', condition: null, observations: '' }
    ]
  },
  {
    id: 'sala-agilidade',
    title: 'Sala de Agilidade',
    icon: Zap,
    items: [
      { id: 'sa-cadeiras', name: 'Cadeiras', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 10, foundQuantity: 0 },
      { id: 'sa-mesas', name: 'Mesas', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 2, foundQuantity: 0 },
      { id: 'sa-luz', name: 'Iluminação', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'sa-ar', name: 'Ar condicionado', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sa-tv', name: 'TV/Monitor', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sa-quadro', name: 'Quadro branco/Flipchart', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sa-tomadas', name: 'Tomadas e pontos elétricos', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 8, foundQuantity: 0 },
      { id: 'sa-limpeza', name: 'Limpeza e organização', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sa-acessibilidade', name: 'Acesso para PcD', response: null, priority: 'critical', condition: null, observations: '' }
    ]
  },
  {
    id: 'sala-digital',
    title: 'Sala Digital',
    icon: Monitor,
    items: [
      { id: 'sd-mesas', name: 'Mesas', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 6, foundQuantity: 0 },
      { id: 'sd-cadeiras', name: 'Cadeiras ergonômicas', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 6, foundQuantity: 0 },
      { id: 'sd-ar', name: 'Ar condicionado', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'sd-iluminacao', name: 'Iluminação adequada', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'sd-tomadas', name: 'Tomadas e pontos elétricos', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 12, foundQuantity: 0 },
      { id: 'sd-internet', name: 'Internet/Wi-Fi', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'sd-limpeza', name: 'Limpeza e organização', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'sd-acessibilidade', name: 'Acesso para PcD', response: null, priority: 'critical', condition: null, observations: '' }
    ]
  },
  {
    id: 'sala-solucao',
    title: 'Sala de Solução',
    icon: Building2,
    items: [
      { id: 'ss-mesa-reuniao', name: 'Mesa de reunião', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'ss-cadeiras', name: 'Cadeiras', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 12, foundQuantity: 0 },
      { id: 'ss-ar', name: 'Ar condicionado', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'ss-videoconferencia', name: 'Equipamento de videoconferência', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'ss-iluminacao', name: 'Iluminação adequada', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'ss-tomadas', name: 'Tomadas e pontos elétricos', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'ss-privacidade', name: 'Privacidade acústica', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'ss-limpeza', name: 'Limpeza e organização', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'ss-acessibilidade', name: 'Acesso para PcD', response: null, priority: 'critical', condition: null, observations: '' }
    ]
  },
  {
    id: 'sala-rh',
    title: 'Sala de Recursos Humanos (RH)',
    icon: Users,
    items: [
      { id: 'rh-mesas', name: 'Mesas', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'rh-cadeiras', name: 'Cadeiras ergonômicas', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'rh-suportes', name: 'Suportes para notebook', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'rh-monitores', name: 'Monitores', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'rh-kit-mouse', name: 'Kit de mouse e teclados', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'rh-ar', name: 'Ar condicionado', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'rh-armarios', name: 'Armários/gavetas com chave', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 4, foundQuantity: 0 },
      { id: 'rh-impressora', name: 'Impressora', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'rh-scanner', name: 'Scanner', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'rh-telefone', name: 'Telefone', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 2, foundQuantity: 0 },
      { id: 'rh-internet', name: 'Internet/Wi-Fi', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'rh-privacidade', name: 'Privacidade acústica', response: null, priority: 'critical', condition: null, observations: '' },
      { id: 'rh-limpeza', name: 'Limpeza e organização', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'rh-acessibilidade', name: 'Acesso para PcD', response: null, priority: 'critical', condition: null, observations: '' }
    ]
  },
  {
    id: 'copa',
    title: 'Copa',
    icon: Coffee,
    items: [
      { id: 'copa-mesas', name: 'Mesas', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 2, foundQuantity: 0 },
      { id: 'copa-cadeiras', name: 'Cadeiras', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 8, foundQuantity: 0 },
      { id: 'copa-bebedouros', name: 'Bebedouros', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'copa-utensilios', name: 'Utensílios', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'copa-geladeira', name: 'Geladeira', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'copa-microondas', name: 'Microondas', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'copa-armario', name: 'Armário', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 2, foundQuantity: 0 },
      { id: 'copa-cafeteira', name: 'Cafeteira', response: null, priority: 'optional', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'copa-pia', name: 'Pia e torneira', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'copa-lixeiras', name: 'Lixeiras', response: null, priority: 'important', condition: null, observations: '', expectedQuantity: 3, foundQuantity: 0 },
      { id: 'copa-produtos', name: 'Produtos de limpeza', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'copa-extintor', name: 'Extintor de incêndio', response: null, priority: 'critical', condition: null, observations: '', expectedQuantity: 1, foundQuantity: 0 },
      { id: 'copa-ventilacao', name: 'Ventilação/exaustor', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'copa-limpeza', name: 'Limpeza e organização', response: null, priority: 'important', condition: null, observations: '' },
      { id: 'copa-acessibilidade', name: 'Acesso para PcD', response: null, priority: 'critical', condition: null, observations: '' }
    ]
  }
];