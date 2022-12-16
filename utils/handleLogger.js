const {IncomingWebhook} = require('@slack/webhook')



const webhook = new IncomingWebhook(process.env.SALCK_WEBHOOK)

const loggerStream = {
    write: message =>{
        webhook.send({
            text:message
        })
    },
};

module.exports = loggerStream