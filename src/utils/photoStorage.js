// IndexedDB storage utility for storing user-uploaded real photos locally in browser
const DB_NAME = 'SaviFairylandGalleryDB';
const STORE_NAME = 'user_photos';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported on this browser"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getStoredPhotos() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not read from IndexedDB, falling back to empty list:", err);
    return [];
  }
}

export async function savePhotoToStorage(photo) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(photo);
      req.onsuccess = () => resolve(photo);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("Failed to save photo to IndexedDB:", err);
    throw err;
  }
}

export async function deletePhotoFromStorage(id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("Failed to delete photo from IndexedDB:", err);
    return false;
  }
}

