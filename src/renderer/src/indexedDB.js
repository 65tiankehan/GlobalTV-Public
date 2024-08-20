// indexedDB.js
const dbName = 'sampleDB';
const storeName = 'items';

export default class IndexedDBManager {
  constructor() {
    this.db = null;
    this.request = indexedDB.open(dbName, 1);

    this.request.onerror = (event) => console.error('Database error:', event);
    this.request.onsuccess = (event) => {
      this.db = this.request.result;
      console.log('Database opened successfully'+event);
    };
    this.request.onupgradeneeded = (event) => {
      const db = this.request.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
      console.log('Database upgraded and object store created'+event);
    };
  }

  // 添加数据
  async add(item) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event);
    });
  }

  // 查询数据
  async get(key) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      const transaction = this.db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event);
    });
  }

  // 更新数据
  async update(key, item) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const cleanItem = JSON.parse(JSON.stringify(item)); // 清除不可克隆的属性
      const request = objectStore.put({ ...cleanItem, id: key });
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event);
    });
  }

  // 删除数据
  async delete(key) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }

  // 获取所有数据
  async getAll() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      const transaction = this.db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const items = [];

      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        } else {
          resolve(items);
        }
      };

      transaction.onerror = (event) => reject(event);
    });
  }
}
