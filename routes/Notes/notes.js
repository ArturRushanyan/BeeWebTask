import express from 'express';
import * as noteController from './notes.controller';
import IsAuthenticated from '../../Middlewares/IsAuthenticated';


const router = express.Router();

router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id',  noteController.delete);

// IsAuthenticated

export default router;
