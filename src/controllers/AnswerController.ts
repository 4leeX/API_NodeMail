import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUserRepository";


class AnswerController {

    // http://localhost:3333/answers/1?u=8ff504f6-76f1-4dce-bd9d-bc45e760e473

    async execute(req: Request, res: Response){
        const { value } = req.params;
        const { u } = req.query;

        const surveysUserRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUserRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            return res.status(400).json({
                error: "Survey User does not exists!"
            });
        }

        surveyUser.value = Number(value);

        await surveysUserRepository.save(surveyUser);

        return res.json(surveyUser);
    }
}

export { AnswerController };