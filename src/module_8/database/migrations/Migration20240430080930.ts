import { Migration } from "@mikro-orm/migrations"

export class Migration20240430080930 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    this.addSql('create table "product" ("id" uuid not null default uuid_generate_v4(), "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');
    this.addSql('create table "cart_item" ("id" uuid not null default uuid_generate_v4(), "product_id" uuid not null, "cart_id" uuid not null, "count" int not null, constraint "cart_item_pkey" primary key ("id"));');
    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "cart_id" uuid, "name" varchar(255) not null default \'username\', "email" varchar(255) not null default \'username@mail.com\', constraint "user_pkey" primary key ("id"));');
    this.addSql('create table "cart" ("id" uuid not null default uuid_generate_v4(), "user_id" uuid, constraint "cart_pkey" primary key ("id"));');
    this.addSql('create table "order" ("id" uuid not null default uuid_generate_v4(), "user_id" uuid not null, "cart_id" uuid, "items" jsonb null, "payment" varchar(255) not null, "delivery" varchar(255) not null, "comments" varchar(255) not null, "status" varchar(255) not null default \'username@mail.com\', "total" int not null, constraint "order_pkey" primary key ("id"));');


    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user" add constraint "user_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete set null;');
    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;')
    this.addSql('drop table if exists "user" cascade;')
    this.addSql('drop table if exists "order" cascade;')
    this.addSql('drop table if exists "cart" cascade;')
    this.addSql('drop table if exists "cart_item" cascade;')
  }
}
