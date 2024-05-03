import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";

type TStats = "todo" | "inprocess" | "done";

interface IItem {
    nome: string;
    stats: TStats;
}

export const addItemValidator = validation((getSchema) => ({
    body: getSchema<IItem>(
        yup.object().shape({
            nome: yup.string().required(),
            stats: yup.string().oneOf(["done", "inprocess", "todo"]).required(),
        })
    ),
}));

export const addItem = (req: Request, res: Response) => {
    console.log(req.body);
    return res.send({
        message: "added",
    });
};
