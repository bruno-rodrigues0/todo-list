import { Request, Response } from "express";
import { pool as mysql } from "../../database";
import { StatusCodes } from "http-status-codes";

export const getItems = (
    req: Request,
    res: Response
) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: error
            })
        }
        conn.query(
        `SELECT * FROM item`,
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
            })
        })
    })
};
