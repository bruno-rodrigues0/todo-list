import { Request, Response } from "express";
import { pool as mysql } from "../../database";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

type TStats = "todo" | "in process" | "done";

interface IFilter {
    nome?: string;
    stats?: TStats;
}

export const getItemValidation = validation((getSchema) => ({
    query: getSchema<IFilter>(
        yup.object().shape({
            nome: yup.string(),
            stats: yup
                .string()
                .oneOf(["done", "todo", "in process"])
                .required(),
        })
    ),
}));

export const getItems = (
    req: Request<unknown, unknown, unknown, IFilter>,
    res: Response
) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: error
            })
        }

        let response: unknown;

        if(req.query.stats){
            conn.query(
                `SELECT * FROM item WHERE stats LIKE ?`,
                [req.query.stats],
                (error, result, filed) => {
                    conn.release();
                    if(error){
                        return res.status(StatusCodes.BAD_REQUEST).send({
                            error: error
                        })
                    }

                    return res.status(StatusCodes.ACCEPTED).send({
                        status: 'ACCEPTED',
                        result: result,
                        query: req.query
                    })
                }
            )
        }
    })
};
