import express from "express";
import bodyParser from "body-parser";
import config from "./vars";
import routes from "../api/routes";
import logger from 'morgan';
import helmet from 'helmet';
import * as error from "./error";
import passport from 'passport';
import cors from 'cors';
import '../passport/local-signin';
import '../passport/local-signup';
import '../passport/jwt';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup

app.set('jwt-secret', config.secret);


const corsOptions = {
    origin: 'http://localhost:3001', // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(express.static("public"));

app.use(passport.initialize());

app.use("/v1", routes);
app.use(error.converter);
app.use(error.handler);
app.use(error.notFound);


export default app;
