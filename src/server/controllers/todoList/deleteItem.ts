import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { pool as mysql } from "../../database";
import * as yup from "yup";

type TStats = "todo" | "in process" | "done";

interface IDelete {
    id: string;
}

export const deleteItemValidator = validation((getSchema) => ({
    body: getSchema<IDelete>(
        yup.object().shape({
            id: yup.string().required(),
        })
    ),
}));

export const deleteItem = (
    req: Request<unknown, unknown, IDelete>,
    res: Response
) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(StatusCodes.SERVICE_UNAVAILABLE).send({
                error: error,
            });
        }
      
        conn.query(
            `DELETE FROM item WHERE id = ?`,
            [req.body.id],
            (error, result, filed) => {
                conn.release();
                if(error){
                    return res.send({
                        error: error
                    })
                }

                return res.status(StatusCodes.ACCEPTED).send({
                    status: 'DELETED'
                })
            }
        )
    });
};
