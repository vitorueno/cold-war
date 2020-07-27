
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('chapter', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('text_button_1').notNullable();
        table.string('text_button_2').notNullable();
        table.integer('href_button_1').notNullable();
        table.integer('href_button_2').notNullable();
        table.integer('id_chapter').notNullable();
        table.foreign('id_chapter').references('id').inTable('chapter');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('chapter')
}