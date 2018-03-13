const amqp = require('amqplib/callback_api');

class Sender {
    constructor(){
    }

    createConnection(type, msg){
        amqp.connect('amqp://localhost', (error, connection) => {
            connection. createChannel((error, channel) => {
                const ex = 'directLogs';
                channel.assertExchange(ex, 'direct', {durable: false});
                channel.publish(ex, type, new Buffer(msg));
            });
            this.connectionClose(connection);
        })
    }

    connectionClose(connection) {
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 100)
    }

    logError(msg) {
        this.createConnection('error', msg);
    }

    logEvent(msg) {
        this.createConnection('event', msg)
    }

    log(msg){
        this.createConnection('logs', msg)
    }
}

const sender = new Sender();
module.exports = sender;
