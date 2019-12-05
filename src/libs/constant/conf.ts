import * as prod from './conf.prod';
import * as dev from './conf.dev';
const isProd = process.env.NODE_ENV === 'production';

const conf = isProd ? prod : dev;

export const StaticRoot = conf.StaticRoot;
export const APIBase = conf.APIBase;
