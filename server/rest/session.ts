import axios, { AxiosError } from 'axios';
import { TPlugin } from '../_types/plugin';
import APIList from '../_upstream'

const relayPost = (req, rep, url) => axios.post(url, req.body)
    .then(res => rep.code(200).send(res.data))
    .catch(err => {
        if (err.isAxiosError) {
            const e = err as AxiosError
            return rep.code(e.response.status).send(e.response.data);
        } else {
            return rep.code(500).send({ msg: "unknown error" });
        }
    })



const auth: TPlugin<{}> = async (app, _opt) => {
    app.post("/auth/login", (req, rep) =>relayPost(req,rep,APIList.authJWTGet) )
    app.post("/auth/verify", (req,rep) =>relayPost(req,rep,APIList.authJWTVerify) )
    app.post("/auth/refresh", async (req,rep) =>relayPost(req,rep,APIList.authJWTRefresh) )
};

export default auth;
