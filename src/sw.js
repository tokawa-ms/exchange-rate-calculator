/**
 * Service Worker for 為替レート変換計算機
 * PWA機能とオフライン対応を提供
 */

const CACHE_NAME = 'exchange-rate-calculator-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './css/fallback.css',
  './js/script.js',
  './manifest.json',
  './icons/icon-72x72.svg',
  './icons/icon-96x96.svg',
  './icons/icon-128x128.svg',
  './icons/icon-144x144.svg',
  './icons/icon-152x152.svg',
  './icons/icon-192x192.svg',
  './icons/icon-384x384.svg',
  './icons/icon-512x512.svg'
];

/**
 * Service Worker インストール時の処理
 */
self.addEventListener('install', event => {
  console.log('Service Worker: インストール開始');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: ファイルをキャッシュ中...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: インストール完了');
        // 新しいService Workerを即座にアクティブにする
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: インストールエラー', error);
      })
  );
});

/**
 * Service Worker アクティベーション時の処理
 */
self.addEventListener('activate', event => {
  console.log('Service Worker: アクティベーション開始');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 古いキャッシュを削除
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 古いキャッシュを削除:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: アクティベーション完了');
      // すべてのクライアントを即座に制御下に置く
      return self.clients.claim();
    }).catch(error => {
      console.error('Service Worker: アクティベーションエラー', error);
    })
  );
});

/**
 * ネットワークリクエストの処理（フェッチイベント）
 * Cache First戦略を採用
 */
self.addEventListener('fetch', event => {
  console.log('Service Worker: フェッチリクエスト:', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュから見つかった場合はそれを返す
        if (response) {
          console.log('Service Worker: キャッシュから応答:', event.request.url);
          return response;
        }
        
        // キャッシュにない場合はネットワークから取得
        console.log('Service Worker: ネットワークから取得:', event.request.url);
        return fetch(event.request).then(response => {
          // レスポンスが無効な場合はそのまま返す
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // レスポンスのクローンを作成（レスポンスは一度しか消費できないため）
          const responseToCache = response.clone();
          
          // 新しいリソースをキャッシュに追加
          caches.open(CACHE_NAME)
            .then(cache => {
              console.log('Service Worker: 新しいリソースをキャッシュ:', event.request.url);
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(error => {
          console.error('Service Worker: フェッチエラー:', error);
          // オフライン時のフォールバック処理
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

/**
 * バックグラウンド同期（将来の機能拡張用）
 */
self.addEventListener('sync', event => {
  console.log('Service Worker: バックグラウンド同期:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // バックグラウンドでの処理をここに実装
      Promise.resolve().then(() => {
        console.log('Service Worker: バックグラウンド同期完了');
      })
    );
  }
});

/**
 * プッシュ通知（将来の機能拡張用）
 */
self.addEventListener('push', event => {
  console.log('Service Worker: プッシュ通知受信');
  
  const options = {
    body: 'プッシュ通知のメッセージ',
    icon: './icons/icon-192x192.svg',
    badge: './icons/icon-72x72.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'アプリを開く',
        icon: './icons/icon-192x192.svg'
      },
      {
        action: 'close',
        title: '閉じる',
        icon: './icons/icon-192x192.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('為替レート変換計算機', options)
  );
});