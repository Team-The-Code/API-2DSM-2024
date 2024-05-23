import { Request, Response } from "express";
import query from "./init";
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

  public async login(req: Request, res: Response): Promise<Response> {
    const {name, mail, password} = req.body;
    const r: any = await query(
      `SELECT * FROM users WHERE mail = $2 AND senha = $3`,
      [name, mail, password]
      );
    return res.json(r);
  }

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
