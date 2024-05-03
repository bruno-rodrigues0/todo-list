import {Request, Response} from 'express'

type TStats = 'todo' | 'in process' | 'done'

type TItem = {
    nome: string,
    stats: TStats,
}

export const addItem = (req: Request, res: Response) => {
    console.log(req.body)
    return res.send({
        message: 'added',
    })
}