import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateComment1650432437910 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'COMMENT',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user_id',
						type: 'uuid',
					},
					{
						name: 'post_id',
						type: 'uuid',
					},

					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FKUser',
						referencedTableName: 'USER',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
					},
					{
						name: 'FKPost',
						referencedTableName: 'POST',
						referencedColumnNames: ['id'],
						columnNames: ['post_id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('COMMENT');
	}
}
