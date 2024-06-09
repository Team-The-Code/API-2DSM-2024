import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const router = express.Router();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bdabp2',
  password: '123',
  port: 5432, // Porta padrão do PostgreSQL
});

// Rota para salvar a área do projeto
router.post('/projects/:id/area', async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const areaCoordinates = req.body.coordinates;

  try {
    const result = await pool.query(
      'INSERT INTO project_areas (project_id, coordinates) VALUES ($1, $2) RETURNING *',
      [projectId, JSON.stringify(areaCoordinates)]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar a área do projeto' });
  }
});

// Rota para buscar a área do projeto
router.get('/projects/:id/area', async (req: Request, res: Response) => {
  const projectId = req.params.id;

  try {
    const result = await pool.query(
      'SELECT coordinates FROM project_areas WHERE project_id = $1',
      [projectId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Área do projeto não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a área do projeto' });
  }
});

export default router;
