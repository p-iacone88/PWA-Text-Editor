import { openDB } from 'idb';

// Function to initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the object store 'jate' already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create the object store 'jate' with auto-incrementing key 'id'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Function to add content to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  try {
    // Open the 'jate' database
    const jateDB = await openDB('jate', 1);
    // Start a read-write transaction
    const tx = jateDB.transaction('jate', 'readwrite');
    // Get the object store 'jate'
    const store = tx.objectStore('jate');
    // Put the content into the object store with specified id
    const request = store.put({ id: 1, value: content });
    // Wait for the request
    const result = await request;
    console.log('Data successfully saved!', result);
  } catch (err) {
    console.error('putDb not implemented')
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Function to get all content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  try {
    // Open the 'jate' database
    const jateDB = await openDB('jate', 1);
    // Start a read-only transaction
    const tx = jateDB.transaction('jate', 'readonly');
    // Get the object store 'jate'
    const store = tx.objectStore('jate');
    // Get all objects from the object store
    const request = store.getAll();
    // Wait for the request to complete
    const result = await request;
    console.log('Data received!', result);
    // Return the retrieved values
    return result.value;
  } catch (err) {
    console.error('getDb not implemented', err);
    return [];
  }
};
// Initialize the database when module is loaded
initdb();
