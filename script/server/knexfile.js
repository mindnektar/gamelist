module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'ec2-54-247-101-205.eu-west-1.compute.amazonaws.com',
            user: 'uhmaqsotchzdji',
            password: '7405f5ed4b489f76bd4171bd4d4e23b90507a8fd7d16658cc9ec4749aabdf285',
            database: 'df24hlkag356b5',
            port: 5432,
            ssl: true,
        },
    },

    production: {
        client: 'pg',
        connection: {
            host: 'ec2-54-247-101-205.eu-west-1.compute.amazonaws.com',
            user: 'uhmaqsotchzdji',
            password: '7405f5ed4b489f76bd4171bd4d4e23b90507a8fd7d16658cc9ec4749aabdf285',
            database: 'df24hlkag356b5',
            port: 5432,
            ssl: true,
        },
    },
};
