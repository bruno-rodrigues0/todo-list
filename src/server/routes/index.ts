import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router();

router.get('/todo', (req, res) => {
    res.status(StatusCodes.OK).send({
        status: 'connected',
    })
})

export { router }
