import { CollectionBeforeChangeHook } from 'payload'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const generateContent: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  // Only run if the user checked the "Auto Generate" box
  if (!data?.autoGenerate) {
    return data
  }

  // Prevent infinite loops or running on delete (though beforeChange doesn't run on delete)

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('❌ Missing GEMINI_API_KEY')
      return data
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Fetch relevant products from Payload
    // We fetch a few items to give the AI context.
    const productsQuery = await req.payload.find({
      collection: 'product-variants',
      limit: 15,
      depth: 0,
      sort: '-updatedAt', // Prefer recently updated products
    })

    const productContext = productsQuery.docs
      .map((p) => `- ${p.productName} (${p.variantName ? p.variantName : 'Standard'})`)
      .join('\n')

    const topic = data.aiPrompt || data.title
    const prompt = `
    Context: You are writing for an e-commerce store that sells the following products:
    ${productContext}

    Task: Write a comprehensive, engaging blog post about: "${topic}".

    Instructions:
    1. Write clear, engaging content.
    2. Naturally mention 1-3 specific products from the list above that are relevant to the topic. Explain why they are good choices.
    3. Include a "Recommended Products" section at the end listing the products you mentioned.
    4. Keep it under 1000 words.
    5. Do NOT use Markdown formatting like **bold** or # headings, just plain text with line breaks (we will format it later).
    `

    console.log(`🤖 Generating content for: ${topic}`)

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (text) {
      // Convert plain text to minimal Lexical structure
      // We split by double newline to create paragraphs
      const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0)

      const lexicalChildren = paragraphs.map((p) => ({
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            text: p.trim(),
            version: 1,
          },
        ],
      }))

      data.content = {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: lexicalChildren,
          direction: 'ltr',
        },
      }

      // Uncheck the box so it doesn't regenerate on next save
      data.autoGenerate = false
    }
  } catch (error) {
    console.error('❌ Auto-generation failed:', error)
  }

  return data
}
