const log4js = require('log4js');
var microsoftTeamsLogWebhook = 'https://teams.microsoft.com/l/channel/19%3a9b0b91f808e04cd48477c9dc5499d3b1%40thread.skype/DevOps?groupId=d294d237-fb58-47cb-98fb-10af453dc793&tenantId=b0002a9b-0017-404d-97dc-3d3bab09be81';
log4js.configure({
    appenders: {
        microsoftTeams: {
            type: 'log4js-node-microsoft-teams',
            webhook: microsoftTeamsLogWebhook,
            layout: {
                type: 'pattern',
                pattern: ' [%d{yyyy-MM-dd hh:mm:ss}][%p] %m '
            },
            errorHandler: (info) => {
                console.log(info);
            }
        }
    },
    categories: {
        default: {
            appenders: ['microsoftTeams'],
            level: 'all'
        }
    }
});

module.exports = log4js.getLogger();
    