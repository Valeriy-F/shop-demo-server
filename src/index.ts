import express, { Request, Response } from 'express'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT ? +process.env.PORT: 3001

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('This is a get request')
})

app.listen(PORT, HOST, () => {
    console.log(`Server running on port http://${HOST}:${PORT}`)
})