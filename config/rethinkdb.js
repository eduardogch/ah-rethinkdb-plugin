exports.default = {
    rethinkdb: function(api){
        return {
            host: process.env.RETHINKDB_HOST || 'localhost',
            port: process.env.RETHINKDB_PORT || '28015',
            authKey: process.env.RETHINKDB_AUTHKEY || '',
            db: process.env.RETHINKDB_DB || 'test',
            modelPath: api.projectRoot + '/models',
            session: true
        };
    }
};