self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
// No caching of authenticated data; this worker only routes device notifications.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    const current = wins.find(w => w.url.startsWith(self.registration.scope));
    if (current) await current.focus();
    else await self.clients.openWindow(self.registration.scope);
  })());
});
