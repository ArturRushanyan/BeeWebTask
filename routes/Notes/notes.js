import express from 'express';
import * as noteController from './notes.controller';
import IsAuthenticated from '../../Middlewares/IsAuthenticated';


const router = express.Router();

router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.post('/', IsAuthenticated, noteController.create);
router.put('/:id', IsAuthenticated, noteController.update);
router.delete('/:id', IsAuthenticated, noteController.delete);

export default router;
