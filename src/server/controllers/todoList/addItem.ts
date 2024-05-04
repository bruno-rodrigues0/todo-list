import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { pool as mysql } from "../../database";
import * as yup from "yup";

type TStats = "todo" | "in process" | "done";

interface IItem {
    nome: string;
    stats: TStats;
}

export const addItemValidator = validation((getSchema) => ({
    body: getSchema<IItem>(
        yup.object().shape({
            nome: yup.string().required(),
            stats: yup.string().oneOf(["done", "in process", "todo"]).required(),
        })
    ),
}));

export const addItem = (
    req: Request<unknown, unknown, IItem>,
    res: Response
) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(StatusCodes.SERVICE_UNAVAILABLE).send({
                error: error,
            });
        }

        conn.query(
            `INSERT INTO item (nome, stats) VALUES (?, ?)`,
            [req.body.nome, req.body.stats],
            (error, result, filed) => {
                conn.release();
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).send({
                        error: error,
                    });
                }

                return res.status(StatusCodes.CREATED).send({
                    status: "CREATED",
                    result: result,
                    item: req.body,
                });
            }
        );
    });
};
