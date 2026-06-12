import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateRecipe({ ingredients, equipment, cuisine, timeLimit }) {
  const prompt = `You are a professional chef and recipe developer. Generate a recipe based on these constraints:

AVAILABLE INGREDIENTS: ${ingredients.join(', ')}
AVAILABLE EQUIPMENT: ${equipment.join(', ')}
CUISINE PREFERENCE: ${cuisine || 'Any'}
TIME LIMIT: ${timeLimit || 'No limit'}

IMPORTANT RULES:
- Only use the listed ingredients (you may add basic pantry staples like salt, pepper, olive oil, butter)
- Only use cooking methods possible with the listed equipment
- The total time must fit within the time limit if provided

Return ONLY valid JSON in this exact format, no other text:
{
  "title": "Recipe name",
  "description": "2 sentence description",
  "prepTime": 10,
  "cookTime": 20,
  "totalTime": 30,
  "ingredients": [
    { "name": "ingredient name", "amount": "2", "unit": "cups" }
  ],
  "instructions": [
    "Step 1 description",
    "Step 2 description"
  ],
  "equipmentUsed": ["Stove"]
}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content)
}