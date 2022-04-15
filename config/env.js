const config = {
    production: {
        SECRET: process.env.SECRET,
    },
    default: {
        SECRET: 'SECRETT',
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}