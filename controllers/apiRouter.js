import { Router } from "express";
const apiRouter = Router()


apiRouter.post('/gemini', async (req, res) => {
  const { query } = req.body
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] }),
  })
  const data = await response.json()
  res.json(data)
})

apiRouter.post('/weather', async (req, res) => {
  const { location } = req.body
  const apiKey = process.env.WEATHER_API_KEY
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
  const data = await response.json()
  res.json(data)
})



export default apiRouter