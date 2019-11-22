import dev from './dev';
import prod from './prod';
const conf = process.env.NODE_ENV === 'production' ? prod : dev;
export default conf;
