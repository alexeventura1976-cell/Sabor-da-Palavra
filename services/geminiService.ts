
import { GoogleGenAI, Type } from "@google/genai";
import { Liturgy, Reflection } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const REFLECTION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    liturgy: {
      type: Type.OBJECT,
      properties: {
        liturgicalTime: { type: Type.STRING },
        firstReading: { type: Type.STRING },
        psalm: { type: Type.STRING },
        secondReading: { type: Type.STRING, description: "Segunda leitura se houver (comum aos domingos), se não houver deixe em branco." },
        gospel: { type: Type.STRING },
      },
      required: ["liturgicalTime", "firstReading", "psalm", "gospel"],
    },
    reflection: {
      type: Type.OBJECT,
      properties: {
        saborDaGraca: { type: Type.STRING },
        goleDeSabedoria: { type: Type.STRING },
        ultimoGole: { type: Type.STRING },
      },
      required: ["saborDaGraca", "goleDeSabedoria", "ultimoGole"],
    },
  },
  required: ["liturgy", "reflection"],
};

export async function fetchFullDailyContent(date: Date): Promise<{ liturgy: Liturgy; reflection: Reflection }> {
  const dateStr = date.toLocaleDateString('pt-BR');
  
  const prompt = `
    1. Use o Google Search para encontrar as leituras litúrgicas católicas da CNBB para o dia ${dateStr}.
    2. Encontre: 1ª Leitura, Salmo Responsorial, 2ª Leitura (se houver) e Evangelho.
    3. Com base nessas leituras, gere uma reflexão pastoral profunda e poética chamada "Sabor da Graça".
    4. Crie um "Gole de Sabedoria" (proposta prática curta) e um "Último Gole" (despedida afetuosa).
    
    Responda estritamente em JSON conforme o schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: REFLECTION_SCHEMA,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      return {
        liturgy: {
          ...data.liturgy,
          date: date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        },
        reflection: data.reflection
      };
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Search fetch failed, falling back to basic generation", error);
    return {
      liturgy: {
        date: date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        liturgicalTime: "Tempo Comum",
        firstReading: "Leitura do dia...",
        psalm: "Salmo do dia...",
        gospel: "Evangelho do dia..."
      },
      reflection: {
        saborDaGraca: "A Palavra de Deus é viva e eficaz. Medite nas escrituras de hoje.",
        goleDeSabedoria: "Pratique a caridade hoje.",
        ultimoGole: "Fique com Deus."
      }
    };
  }
}
