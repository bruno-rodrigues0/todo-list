import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { todoListController } from '../controllers';

const router = Router();

router.get('/todo', (req, res) => {
    res.status(StatusCodes.OK).send({
        status: 'connected',
    })
})

router.post('/todo/item', todoListController.addItem);
router.get('/todo/item', todoListController.getItems);

export { router }
