import { Request, Response } from "express";
import query, { pool } from "./db";
import jwt from "jsonwebtoken"
class UserController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, mail, password, profile } = req.body;
    const r: any = await query(
      `INSERT INTO users(name,mail,password,profile) 
       VALUES ($1,$2,$3,$4) 
       RETURNING id, name, mail, profile`,
      [name, mail, password, profile]
    );
    return res.json(r);
  }

  public async login(req: Request, res: Response) {
    const { name, mail, password } = req.body;
  
  try {
    const user = await pool.query('SELECT nome,email,senha FROM usuario WHERE nome = $1 AND email = $2  AND senha = $3', [name, mail, password]);
    
    if (user.rows.length === 0) {
      console.log(user.rows[0].id)
      return res.status(401).json({ error: 'Credenciais inválidas', alert: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign({ usuario: user.rows[0].id },"Beare");
    
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body; // id do registro a ser excluído
    const r: any = await query("DELETE FROM users WHERE id = $1", [id]);
    return res.json(r);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, mail, password } = req.body;
    const r: any = await query(
      "UPDATE users SET mail=$2, password=$3 WHERE id=$1",
      [id, mail, password]
    );
    return res.json(r);
  }

}
export default new UserController();
