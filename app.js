const { db } = require('./models');

db.authenticate().
then(() => {
    console.log('connected to the dtabase');
})