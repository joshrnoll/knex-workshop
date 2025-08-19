const { faker } = require('@faker-js/faker');

function generatePeopleRecord(num, minYear, maxYear){
  
  return Array(num).fill().map((item) => {
    return {
      sex: faker.people.sex(),
      first_name: faker.people.firstName(this.sex),
      last_name: faker.people.lastName(this.sex),
      mother_id: '',
      father_id: '',
      date_of_birth: faker.date.birthdate({mode: 'year', min: minYear, max: maxYear}),
      date_of_death: faker.helpers. faker.date.between({ from: this.date_of_birth, to: `${maxYear}-01-01T00:00:00.000Z`}),
      hometown_id: '',
      citizenship: faker.location.country(),
    }
  })
}

function generateLocationRecord(num){
  return Array(num).fill().map((item) => {
    return {
      street_address: faker.location.streetAddress(),
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
      postal_code: faker.location.zipCode()
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('location').del()
  await knex('people').del()
  await knex('location').insert(generateLocationRecord(10));
  await knex('people').insert(generatePeopleRecord(10));
};
