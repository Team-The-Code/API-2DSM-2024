import { Request, Response } from 'express';
import pool from '../../controllers/db';


// Importe a interface Dados


const statusAtibaia = async (req: Request, res: Response) => {
    try {
        // Consulta para buscar os dados dos analistas
        const result = await pool.query("SELECT atribuicao, COUNT(CASE WHEN status = 'finalizado' THEN 1 END) AS finalizados, COUNT(CASE WHEN status <> 'finalizado' AND status <> 'em andamento' OR status IS NULL THEN 1 END) AS nao_finalizados, COUNT(CASE WHEN validacao = 'validado' THEN 1 END) AS validados, COUNT(CASE WHEN validacao <> 'validado' OR validacao IS NULL THEN 1 END) AS nao_validados FROM tbgrade_atuacao_atibaia WHERE atribuicao IS NOT NULL GROUP BY atribuicao UNION SELECT atribuicao, COUNT(CASE WHEN status = 'finalizado' THEN 1 END) AS finalizados, COUNT(CASE WHEN status <> 'finalizado' AND status <> 'em andamento' OR status IS NULL THEN 1 END) AS nao_finalizados, COUNT(CASE WHEN validacao = 'validado' THEN 1 END) AS validados, COUNT(CASE WHEN validacao <> 'validado' OR validacao IS NULL THEN 1 END) AS nao_validados FROM tbgrade_atuacao_cruzeiro WHERE atribuicao IS NOT NULL GROUP BY atribuicao ORDER BY atribuicao;");
        console.log(result.rows)
        // Retorna os resultados como JSON
        res.status(201).send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar dados dos analistas:', error);
        res.status(500).json(error);
    }
};

export default statusAtibaia;