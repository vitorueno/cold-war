
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('chapter', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.enu('country', ['EUA', 'URSS']).notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('chapter')
}