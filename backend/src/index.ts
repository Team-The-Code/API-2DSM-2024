import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import login from "./routes/login";
import cadastro from "./routes/cadastro";
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3001;
const app = express(); // cria o servidor e coloca na variável app
// suportar parâmetros JSON no body da requisição
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
// inicializa o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}...`);
});
app.use(login)
app.use(cadastro)
// define a rota para o pacote /routes
