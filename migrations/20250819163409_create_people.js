/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("people", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.uuid("mother_id");
    table.foreign("mother_id").references("id").inTable("people");
    table.uuid("father_id");
    table.foreign("father_id").references("id").inTable("people");
    table.date("date_of_birth").notNullable();
    table.date("date_of_death");
    table.integer("hometown_id").unsigned();
    table.foreign("hometown_id").references("id").inTable("location");
    table.string("citizenship");
    table.enu("sex", ["male", "female"]).notNullable();
    //table.string("occupation").notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("people", (table) => {
      table.dropForeign("mother_id");
      table.dropForeign("father_id");
    })
    .then(() => knex.schema.dropTableIfExists("people"));
};
