import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('myDatabase.db');

export const initializeCartTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cart (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                price REAL, 
                quantity INTEGER
            )`,
            [],
            () => { console.log('Cart table created successfully'); },
            (tx, error) => { console.log('Error creating cart table', error); }
        );
    });
};

export const loadProducts = (setProducts) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM products',
            [],
            (_, { rows: { _array } }) => {
                setProducts(_array);
            },
            (tx, error) => { console.log('Error loading products', error); }
        );
    });
};

// Execute SQL queries
// db.transaction(tx => {
//     // Create a table
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)',
//       [],
//       (tx, result) => {
//         console.log('Table created successfully');
//       },
//       (tx, error) => {
//         console.log('Error creating table', error);
//       }
//     );
  
//     // Insert a record
//     tx.executeSql(
//       'INSERT INTO Users (name, age) VALUES (?, ?)',
//       ['Ralph', 30],
//       (tx, result) => {
//         console.log('User inserted successfully');
//       },
//       (tx, error) => {
//         console.log('Error inserting user', error);
//       }
//     );
  
//     // Query data
//     tx.executeSql(
//       'SELECT * FROM Users',
//       [],
//       (tx, result) => {
//         const rows = result.rows;
//         for (let i = 0; i < rows.length; i++) {
//           console.log(`User: ${rows.item(i).name}, Age: ${rows.item(i).age}`);
//         }
//       },
//       (tx, error) => {
//         console.log('Error querying data', error);
//       }
//     );
//   });