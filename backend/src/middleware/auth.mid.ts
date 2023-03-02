import { VerifyErrors, verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
  // const token = req.headers.access_token as string;
  // console.log("this is token: " + token);
  // //if (!token) return res.status(HTTP_UNAUTHORIZED).send();

  // try {
  //   const decodedUser = verify(token, process.env.JWT_SECRET!);
  //   console.log("this is decoder" + decodedUser);
  //   req.user = decodedUser;
  // } catch (error) {
  //   //res.status(HTTP_UNAUTHORIZED).send();
  // }

  const token = req.headers.access_token as string;

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).send();
  }

  verify(token, "verySecretValue", (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      //return res.status(HTTP_UNAUTHORIZED).send();
    }

    req.user = decoded;
    return next();
  });

  return next();
};
