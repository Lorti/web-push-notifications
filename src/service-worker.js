self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();

        const title = data.title;
        const options = {
            body: data.body,
            icon: data.icon || 'https://pbs.twimg.com/profile_images/717346718870859776/vsyH7GEi.jpg',
            tag: data.tag || 'default',
            data: data.url,
        };

        event.waitUntil(
            self.registration.showNotification(title, options),
        );
    }
});

self.addEventListener('pushsubscriptionchange', (event) => {
    const options = event.oldSubscription.options;
    // Fetch options if they do not exist in the event.
    event.waitUntil(
        self.registration.pushManager.subscribe(options)
            .then((subscription) => { // eslint-disable-line no-unused-vars
                // Send new subscription to application server.
            }),
    );
});

self.addEventListener('notificationclick', (event) => {
    let url = 'http://localhost:8080/';
    if (event.notification.data) {
        url = event.notification.data;
    }

    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({
            type: 'window',
        }).then((clientList) => {
            for (let i = 0; i < clientList.length; i += 1) {
                const client = clientList[i];
                const found = client.url === url || client.url === `${url}/`;
                if (found && 'focus' in client) {
                    client.focus();
                    return;
                }
            }
            if (self.clients.openWindow) {
                self.clients.openWindow(url);
            }
        }),
    );
});
