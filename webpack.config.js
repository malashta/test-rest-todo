/**
 * Created by Tallerr on 28.03.2017.
 */
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'production' || NODE_ENV === 'prod') {
    module.exports = require('./webpack.production');
} else {
    module.exports = require('./webpack.develop');
}