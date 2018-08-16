/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import config from './config';

const server = new GraphQLServer({
    typeDefs: mergeTypes(fileLoader(path.join(__dirname, 'typeDefs'))),
    resolvers: mergeResolvers(fileLoader(path.join(__dirname, 'resolvers'))),
});

server.express.use(express.static(path.join(__dirname, '../public')));

server.start({
    port: config.get('ports').express,
    endpoint: '/api',
    playground: '/api',
}, () => {
    console.log(`Server running at http://localhost:${config.get('ports').express}`);
});

process.on('SIGINT', () => { process.exit(); });
