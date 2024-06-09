import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import areaRouter from './routes/areaproject'
import bodyParser from 'body-parser';
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;

const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// configura o servidor para receber requisições de qualquer domínio
app.use(cors());

app.use(bodyParser.json());
app.use('/api', areaRouter);

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});

// define a rota para o pacote /routes
app.use(routes);