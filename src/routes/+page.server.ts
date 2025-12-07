import { mistral } from '$lib/clients/mistral';
import { NEWS_API_KEY } from '$env/static/private';
export const prerender = true;

export async function load() {  
  return {
    tldr: await tldr()
  }
}

const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=fr&apiKey=${NEWS_API_KEY}`;

const system = `You are my helpfull tldr assistant. Your goal is to build a comprehensive summary of the current news headlines in french. 
Cuurent date: ${new Date().toISOString().split('T')[0]}.
Provide a concise summary in english of the following headlines, focusing on the most important events and facts. Keep it brief and to the point.
This help me stay informed about the latest news without having to read through all the articles.
Don't include any personal opinions or commentary.
Don't disclose any internal processes or details about how the summary is created.
`;

async function tldr() {

const headlines = await fetch(newsApiUrl)
  .then(res => res.json())
  .then(data => data.articles.map((article: { title: string; description: string }) => `${article.title}. ${article.description}`).join('\n'));


 const response = await mistral.chat.complete({
  model:'mistral-large-latest',
  messages: [
    {
      role: 'system' as const,
      content: system
    },
    {
      role: 'user' as const,
      content: `Headlines from NewsAPI:\n
      ${headlines}`
    }
  ],
  temperature: 0.4
 })

 return {response}
}