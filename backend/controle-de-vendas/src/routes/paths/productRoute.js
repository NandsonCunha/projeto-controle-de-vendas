import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/report/buyers', ProductController.buyersReport);

export default router;
