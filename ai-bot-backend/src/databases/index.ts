import { DB_HOST, DB_PORT, DB_DATABASE ,DB_USER ,DB_PASSWORD} from '@config';

export const dbConfig = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
};
