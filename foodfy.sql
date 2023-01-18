CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);
CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "file_id" integer,
    "created_at" timestamp DEFAULT (now()),
    "updated_at" timestamp DEFAULT (now())
);
CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "chef_id" int,
  "user_id" int,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);
CREATE TABLE "recipe_files" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" integer,
    "file_id" integer
);
ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
ALTER TABLE "recipes" ADD FOREIGN KEY("chef_id") REFERENCES "chefs" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
