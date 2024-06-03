import { Request, Response } from "express";
import query, { pool } from "../database/connection";
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
    const { mail, password } = req.body;
  
  try {
    const user = await pool.query('SELECT mail,password FROM users WHERE  mail = $1  AND password = $2', [ mail, password]);
    
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
  public async list(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      "SELECT id,mail,profile FROM users ORDER BY mail"
    );
    res.json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { iduser } = req.body;
    if (!iduser) {
      res.status(401).json({ erro: "Forneça o usuário a ser excluído" });
    } else {
      const response: any = await query(
        "DELETE FROM users WHERE id = $1 RETURNING id, mail, profile",
        [iduser]
      );

      if (response && response.rowcount && response.rowcount > 0) {
        res.json(response.rows);
      } else {
        res.json({ erro: "Usuário não localizado" });
      }
    }
  }

  public async updateMail(req: Request, res: Response): Promise<void> {
    const { mail } = req.body;
    const { id } = res.locals;
    if (!mail) {
      res.status(401).json({ erro: "Forneça o novo e-mail" });
    } else {
      const r: any = await query("UPDATE users SET mail=$2 WHERE id=$1", [
        id,
        mail,
      ]);

      if (r.rowcount == 1) {
        res.json({ mail });
      }
      else if (r.message.startsWith("duplicate key")) {
        res.json({ erro: `O e-mail ${mail} já existe no cadastro` });
      }
      else {
        res.json({ erro: "Não foi possível alterar o e-mail" });
      }
    }
  }
  public async updatePassword(req: Request, res: Response): Promise<void> {
    const { password } = req.body;
    const { id } = res.locals;
    if (!password) {
      res.status(401).json({ erro: "Forneça a nova senha" });
    } else {
      const r: any = await query("UPDATE users SET password=$2 WHERE id=$1", [
        id,
        password,
      ]);
      res.json(r);
    }
  }
  public async updateProfile(req: Request, res: Response): Promise<void> {
    const { id, profile } = req.body;
    if (profile === "adm" || profile === "user") {
      const r: any = await query("UPDATE users SET profile=$2 WHERE id=$1", [
        id,
        profile,
      ]);
      res.json(r);
    } else {
      res.json({ erro: "Perfil inexistente" });
    }
  }
}



export default new UserController();
