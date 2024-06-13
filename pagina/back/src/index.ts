import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD:backend/src/index.ts
import login from "./routes/login";
import cadastro from "./routes/cadastro";
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3001;
=======
import routes from "./routes";
import bodyParser from 'body-parser';
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;

>>>>>>> develop:pagina/back/src/index.ts
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// configura o servidor para receber requisições de qualquer domínio
app.use(cors());

app.use(bodyParser.json());

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});
<<<<<<< HEAD:backend/src/index.ts
app.use(login)
app.use(cadastro)
// define a rota para o pacote /routes
=======

// define a rota para o pacote /routes
app.use(routes);
>>>>>>> develop:pagina/back/src/index.ts
