/**
 * SQLite is local database to store information
 * expo-sqlite allow us to use SQLite
 * For more information visit: https://docs.expo.io/versions/v36.0.0/sdk/sqlite/
 */

import * as SQLite from "expo-sqlite";

/**
 * Connect db or create new db file if not found
 */
const db = SQLite.openDatabase("places.db");

/**
 * Init database
 */
export const init = () => {
  const initPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULl, imageUri TEXT NOT NULl, address TEXT NOT NULl, lat REAL, lng REAL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return initPromise;
};

/**
 * Insert new place in db
 * @param {string} title
 * @param {string} imageUri
 * @param {string} address
 * @param {number} lat
 * @param {number} lng
 */
export const insertPlace = (title, imageUri, address, lat, lng) => {
  const insertPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return insertPromise;
};
/**
 * Return all places
 */
export const getAllPlaces = () => {
  const getPlacesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return getPlacesPromise;
};
