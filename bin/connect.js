// Conexión base de datos
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/podcastDB';
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

// Or using promises
mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => { console.log('Conectado a DB') },
    /** handle initial connection error */
    err => { console.log(err) }
);

module.export = mongoose;