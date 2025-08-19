const { faker } = require("@faker-js/faker");

function generatePeopleRecord(num, minYear, maxYear) {
  return Array(num)
    .fill()
    .map((item) => {
      let living = [true, false];
      let isLiving = faker.helpers.arrayElement(living);
      let sex = faker.person.sex();
      let birthdate = faker.date.birthdate({
        mode: "year",
        min: minYear,
        max: maxYear,
      });
      return {
        sex: sex,
        first_name: faker.person.firstName(sex),
        last_name: faker.person.lastName(sex),
        mother_id: null,
        father_id: null,
        date_of_birth: birthdate,
        date_of_death: !isLiving
          ? faker.date.between({
              from: birthdate,
              to: `${maxYear + 1}-01-01T00:00:00.000Z`,
            })
          : null,
        hometown_id: null,
        citizenship: faker.location.country(),
      };
    });
}

function generateFamilyTree(density, depth) {
  let results = [];
  let previousGeneration = [];
  let startYear = 1800;
  for (let i = 0; i < depth; i++) {
    let generation = generatePeopleRecord(density, startYear, startYear + 25);
    if (previousGeneration.length > 0) {
      let women = previousGeneration.filter((item) => item.sex === "female");
      let men = previousGeneration.filter((item) => item.sex === "male");
      generation = generation.map((item) => {
        return {
          ...item,
          mother_id: faker.helpers.arrayElement(women).id,
          father_id: faker.helpers.arrayElement(men).id,
        };
      });
    }
    results.push(...generation);
    startYear += 25;
    previousGeneration = generation;
  }
  return results;
}

function generateLocationRecord(num) {
  return Array(num)
    .fill()
    .map((item) => {
      return {
        street_address: faker.location.streetAddress(),
        country: faker.location.country(),
        state: faker.location.state(),
        city: faker.location.city(),
        postal_code: faker.location.zipCode(),
      };
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("location").del();
  await knex("people").del();
  await knex("location").insert(generateLocationRecord(6));
  await knex("people").insert(generateFamilyTree(3, 2));
};
