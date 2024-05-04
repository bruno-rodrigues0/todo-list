import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { todoListController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send({
        status: 'connected',
    })
})

router.get('/item',  todoListController.getItems);
router.post('/item', todoListController.addItemValidator, todoListController.addItem);
router.put('/item', todoListController.updateItemValidator, todoListController.updateItem);

export { router }
