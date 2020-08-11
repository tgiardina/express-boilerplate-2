import { Connection, createConnection, getConnection } from 'typeorm';

export async function initConnection(): Promise<Connection> {
  let connection: Connection;
  try {
    connection = getConnection();
  } catch (err) {
    connection = await createConnection();
  }
  await Promise.all(connection.entityMetadatas.map(async (table) => {
    await connection.manager.query(`TRUNCATE ${table.tableName}`);
  }));
  return connection;
}
