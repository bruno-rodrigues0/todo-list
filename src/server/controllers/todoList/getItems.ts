import {Request, Response} from 'express'

type TStats = 'todo' | 'in process' | 'done'

type TItem = {
    nome: string,
    stats: TStats,
}

export const getItems = (req: Request, res: Response) => {
    return res.send({
        body: req.body,
        message: 'added',
    })
}