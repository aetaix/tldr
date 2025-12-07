import { mistral } from '$lib/clients/mistral';
import { NEWS_API_KEY } from '$env/static/private';

export const prerender = true;

// Types
interface Article {
	title: string;
	description: string;
	publishedAt: string;
	url: string;
	source: { name: string };
}

interface NewsApiResponse {
	articles: Article[];
}

interface Source {
	title: string;
	url: string;
}

// Constants
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
const MISTRAL_MODEL = 'ministral-14b-latest';
const TEMPERATURE = 0.4;

const SYSTEM_PROMPT = `You are my helpful TLDR assistant. Your goal is to build a comprehensive summary and analysis of the current news headlines.
Current date: ${new Date().toISOString().split('T')[0]}.
Provide a concise summary and note analysis in English of the following headlines, focusing on the most important events and facts. Keep it brief and to the point.
Try to connect the dots between different news stories if possible, and highlight any emerging trends or significant developments.
This helps me stay informed about the latest news without having to read through all the articles.
Don't include a title for the summary.
# Tone
- Informative
- Neutral
- Concise
# Guardrails
- Use clear and simple language.
- Avoid jargon or technical terms unless necessary.
- Do not include any speculative information or personal opinions.
- Stick to the facts presented in the headlines.
- Don't disclose any internal processes or details about how the summary is created.`;

// Helper functions
function formatArticle(article: Article): string {
	const { title, publishedAt, source, description } = article;
	return `${title}. Published on ${publishedAt} - Source: ${source.name}. ${description}`;
}

function extractSources(articles: Article[]): Source[] {
	return articles.map(({ title, url }) => ({ title, url }));
}

async function fetchHeadlines(): Promise<NewsApiResponse> {
	const response = await fetch(NEWS_API_URL);

	if (!response.ok) {
		throw new Error(`Failed to fetch headlines: ${response.statusText}`);
	}

	return response.json();
}

async function generateSummary(headlinesText: string): Promise<string> {
	const response = await mistral.chat.complete({
		model: MISTRAL_MODEL,
		temperature: TEMPERATURE,
		messages: [
			{ role: 'system', content: SYSTEM_PROMPT },
			{ role: 'user', content: `Headlines from NewsAPI:\n${headlinesText}` }
		]
	});

	const content = response.choices?.[0]?.message?.content;

	if (!content || typeof content !== 'string') {
		throw new Error('No summary generated');
	}

	return content;
}

// Page load function
export async function load() {
	const { articles } = await fetchHeadlines();

	const headlinesText = articles.map(formatArticle).join('\n');
	const sources = extractSources(articles);
	const summary = await generateSummary(headlinesText);

	return { sources, summary };
}
