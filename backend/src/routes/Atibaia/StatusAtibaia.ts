import express from 'express';
import statusAtibaia from '../../Relatorios/Atibaia';


const router = express.Router();

router.get('/StatusAtibaia', statusAtibaia);

export default router;