const webpush = require('web-push');

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey);
// console.log(vapidKeys.privateKey);
// process.exit();

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90',
    'Rs4ALPgHaAgjaOUrihdpNCaSWtUTPu5ZyU-oHBetX0E'
);

const subscription = {
    endpoint: null,
    keys: {
        p256dh: null,
        auth: null,
    },
};

const notification = JSON.stringify({
    title: 'Stahlstadt.js #13',
    body: 'Hello World, Stahlstadtkinder ;)',
    url: 'https://twitter.com/stahlstadtjs',
});

webpush.sendNotification(subscription, notification)
    .then(success => console.log(success))
    .catch(error => console.log(error));
