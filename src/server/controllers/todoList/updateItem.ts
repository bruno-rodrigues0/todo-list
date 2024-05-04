import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { pool as mysql } from "../../database";
import * as yup from "yup";
import { QueryError, QueryResult } from "mysql2";

type TStats = "todo" | "in process" | "done";

interface IUpdate {
    id: string;
    nome?: string;
    stats?: TStats;
}

export const updateItemValidator = validation((getSchema) => ({
    body: getSchema<IUpdate>(
        yup.object().shape({
            id: yup.string().required(),
            nome: yup.string(),
            stats: yup.string().oneOf(["done", "in process", "todo"]).required(),
        })
    ),
}));

export const updateItem = (
    req: Request<unknown, unknown, IUpdate>,
    res: Response
) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(StatusCodes.SERVICE_UNAVAILABLE).send({
                error: error,
            });
        }

        if(req.body.nome){
            conn.query(
                `UPDATE item SET nome = ? WHERE id = ?`,
                [req.body.nome, req.body.id],
                (error, result, filed) => {
                    conn.release();
                    if(error){
                        res.send({
                            error: error
                        })
                    }
                }
            )
        }

        if(req.body.stats){
            conn.query(
                `UPDATE item SET stats = ? WHERE id = ?`,
                [req.body.stats, req.body.id],
                (error, result, filed) => {
                    conn.release();
                    if(error){
                        res.send({error: error }); 
                    }
                }
            )
        }

    });

    return res.status(StatusCodes.ACCEPTED).send({
        status: 'UPDATED',
    })
};
