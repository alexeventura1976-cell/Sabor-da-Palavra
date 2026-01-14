
export enum AppView {
  HOJE = 'hoje',
  AVISOS = 'avisos',
  CATEQUESE = 'catequese',
  SOBRE = 'sobre',
  ORACAO = 'oracao',
  EDITOR = 'editor'
}

export interface Liturgy {
  date: string;
  liturgicalTime: string;
  firstReading: string;
  psalm: string;
  secondReading?: string; // Opcional, para domingos e festas
  gospel: string;
}

export interface Reflection {
  saborDaGraca: string;
  goleDeSabedoria: string;
  ultimoGole: string;
  audioUrl?: string; // Novo campo para o áudio da reflexão
}

export interface DailyContent {
  dateKey: string; // YYYY-MM-DD
  liturgy: Liturgy;
  reflection: Reflection;
}

export interface AvisosContent {
  agenda: string;
  atividades: string;
  updatedAt: string;
}

export interface VoceSabiaContent {
  titulo: string;
  texto: string;
  updatedAt: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
