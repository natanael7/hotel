// import fetch from "node-fetch";

const OPENAI_API_KEY = "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";

export interface choiceInterface {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}
interface responseInterface {
  choices: choiceInterface[];
}

export default async function generateDescription(foodName: string) {
  const apiKey = OPENAI_API_KEY;
  const prompt = `La descrizione di un piatto dovrebbe contenere il nome, gli ingredienti principali, il metodo di preparazione, i condimenti o le salse e il gusto in massimo 70 parole.
Per esempio la descrizzione della "Pasta al pomodoro" su un sito web: "pasta semplice condita con salsa di pomodoro fresco e basilico."

La descrizzione della "${foodName}" su un sito web:`;
  const model = "text-davinci-003";
  const temperature = 0.1;
  const maxTokens = 150;

  const response = await fetch(
    "https://api.openai.com/v1/engines/" + model + "/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate Italian description");
  }

  const responseData = await response.json();
  const openAIResponse = responseData as responseInterface;
  const { choices } = openAIResponse;

  const description = choices[0].text.trim();
  return description.replace(/"/g, "");
}
