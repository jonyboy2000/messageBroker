const amqp = require('amqplib/callback_api');
const db = require('./dbIntegration');

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        const ex = 'directLogs';
        channel.assertExchange(ex, 'direct', {durable: false});
        channel.assertQueue('error');
        channel.assertQueue('event');
        channel.assertQueue('log');
        channel.bindQueue('error', ex, 'error');
        channel.bindQueue('event', ex, 'event');
        channel.bindQueue('log', ex, 'logs');
        channel.consume('error', message => {
            console.log(message.content.toString());
            channel.ack(message);
            db.insertData(message.content.toString(), 'error');
        });

        channel.consume('log', message => {
            console.log(message.content.toString());
            channel.ack(message);
            db.insertData(message.content.toString(), 'info');
        });

        channel.consume('event', message => {
            console.log(message.content.toString());
            channel.ack(message);
            db.insertData(message.content.toString(), 'event');
        });
    })
});