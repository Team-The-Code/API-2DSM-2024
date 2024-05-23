import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import StatusAtibaia from "./routes/Atibaia/StatusAtibaia";
import bodyParser from "body-parser";
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3001;
const app = express(); 
app.use(cors({
  origin: ['http://localhost:3000']
}));
// cria o servidor e coloca na variável app
// suportar parâmetros JSON no body da requisição
app.use(express.json());
app.use(bodyParser.json())

// inicializa o servidor na porta especificada
app.use(StatusAtibaia);
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}...`);
});
// define a rota para o pacote /routes
