const KEY = process.env.K

const img =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII='

async function main() {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.M,
      max_completion_tokens: 60,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'What color is this image? Answer in 3 words.' },
            { type: 'image_url', image_url: { url: img } },
          ],
        },
      ],
    }),
  })
  console.log(res.status, (await res.text()).slice(0, 600))
}
main()
