import express from 'express';
import { postsController } from '../controllers/postsController.js';

export const router = express.Router();

router.get('/', postsController.getAll);
router.post('/', postsController.create);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.delete);
