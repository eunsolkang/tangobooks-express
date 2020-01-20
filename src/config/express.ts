import express from "express";
import bodyParser from "body-parser";
import config from "./vars";
import routes from "../api/routes";
import logger from 'morgan';
import helmet from 'helmet';
import * as error from "./error";
import passport from 'passport';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup

app.set('jwt-secret', config.secret);



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
