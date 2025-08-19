/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("location", (table) => {
    table.increments("id").primary();
    table.string("street_address").notNullable();
    table.string("country").notNullable();
    table.string("state").notNullable(); // adds an auto incrementing PK column
    table.string("postal_code").notNullable(); // equivalent of varchar(255)
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("location");
};
