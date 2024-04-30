import * as dotenv from 'dotenv'
dotenv.config()
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { defineConfig } from "@mikro-orm/postgresql";
import {Options} from '@mikro-orm/core';
import { Migrator } from "@mikro-orm/migrations";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { SeedManager } from "@mikro-orm/seeder";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import { Cart } from "../entities/cart";
import { CartItem } from "../entities/cartItem";
import { Order } from "../entities/order";
import { Product } from "../entities/product";
import { User } from "../entities/user";

const options: Options<PostgreSqlDriver> = {
  entities: [
    Cart,
    CartItem,
    Order,
    Product,
    User,
  ],
  host: "localhost",
  port: parseInt(process.env.DB_PORT!, 10),
  user: process.env.USER_ROOT,
  password: process.env.SECRET_KEY,
  dbName: process.env.DB_NAME,
  debug: true,

  seeder: {
    path: "dist/module_8/database/seeders",
    pathTs: "src/module_8/database/seeders",
    defaultSeeder: "DatabaseSeeder",
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    fileName: (className: string) => className,
  },
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'dist/database/migrations',
    pathTs: 'src/module_8/database/migrations',
    glob: "!(*.d).{js,ts}",
  },

  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
};

export default defineConfig(options);