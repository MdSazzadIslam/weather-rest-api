import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
class Validator {
  public weatherValidationRules = () => {
    return [check("city", "City is required").not().isEmpty()];
  };
  public validateWeather = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages: string[] = [];
      errors.array().forEach((error) => {
        messages.push(error.msg);
      });

      return res.status(500).send({ msg: messages });
    }
    next();
  };
}

export { Validator };
