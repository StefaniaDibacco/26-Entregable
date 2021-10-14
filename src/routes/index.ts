import { Router } from 'express';
import routerProductos from './productos';
import cartRouter from './carrito';
import { isLoggedIn } from '../middleware/auth';
import UserRouter from './user';
import authRouter from './auth';

const router = Router();

router.use('/productos', routerProductos);
router.use('/cart', cartRouter); // A REALIZAR PARA LA PROXIMA ENTREGA
router.use('/auth', authRouter);
router.get('/hello', (req, res) => {
  res.json({ msg: 'HOLA', session: req.session });
});

router.use('/user', isLoggedIn, UserRouter);
export default router;
