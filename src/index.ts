import App from './app'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

const app = new App()

app.run(HOST, PORT)
