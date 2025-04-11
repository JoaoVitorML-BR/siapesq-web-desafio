import { Router } from 'express';

import user from './user/user.router';
import item from './item/item.router';
import tag from './tag/tag.router';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/login/user', user);
router.use('/create/user', user);

router.use('/user', user);
router.use('/item', item);
router.use('/tag', tag);

router.use('/', (req, res) => {
	console.log('Hello World!');
	res.json({ message: 'Hello World!' });
});

export default router;