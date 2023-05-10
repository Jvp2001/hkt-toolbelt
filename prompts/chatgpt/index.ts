import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

async function main() {
  let input = ''
  process.stdin.setEncoding('utf8')

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk) {
      input += chunk
    }
  })

  process.stdin.on('end', async () => {
    const res = await openai.createCompletion({
      prompt: input,
      model: 'gpt-4'
    })
    console.log(res.data.choices[0].text)
    process.exit(0)
  })
}

if (!process.stdin.isTTY) main()
