const tintColorLight = '#10B981';
const tintColorDark = '#10B981'; // Manter o verde como cor de destaque

export const lightTheme = {
  text: '#1E293B',
  background: '#F8FAFC',
  card: '#FFFFFF',
  primary: tintColorLight,
  tabIconDefault: '#64748B',
  tabIconSelected: tintColorLight,
  border: '#E2E8F0',
  inputBackground: '#F1F5F9',
  textMuted: '#64748B',
  danger: '#EF4444',
  primaryBackground: '#F0FDF4', // Fundo verde claro para o card do usuário
  dangerBackground: '#FEF2F2',
  dangerBorder: '#FECACA',
};

export const darkTheme = {
  text: '#F8FAFC',
  background: '#0F172A', // Um azul bem escuro
  card: '#1E293B', // Um azul/cinza escuro
  primary: tintColorDark,
  tabIconDefault: '#94A3B8',
  tabIconSelected: tintColorDark,
  border: '#334155',
  inputBackground: '#334155',
  textMuted: '#94A3B8',
  danger: '#F87171',
  primaryBackground: '#064E3B', // Fundo verde escuro para o card do usuário
  dangerBackground: '#450A0A',
  dangerBorder: '#7F1D1D',
};