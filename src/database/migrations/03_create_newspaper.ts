
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('newspaper', table => {
        table.increments('id').primary();
        table.string('headline').notNullable();
        table.string('subtitle').notNullable();
        table.string('text').notNullable();
        table.string('image_path').notNullable();
        table.integer('id_chapter').notNullable();
        table.foreign('id_chapter').references('id').inTable('chapter');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('newspaper')
}