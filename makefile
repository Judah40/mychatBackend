# Variables
MIGRATION_NAME ?= init

# Run development migration (creates DB & applies schema)
migrate-dev:
	npx prisma migrate dev --name $(MIGRATION_NAME)

# Create SQL migration files without applying them
migrate-save:
	npx prisma migrate dev --create-only --name $(MIGRATION_NAME)

# Apply migrations in production
migrate-deploy:
	npx prisma migrate deploy

# Push schema to database (no migration files generated)
push:
	npx prisma db push

# Generate Prisma Client
generate:
	npx prisma generate --no-engine

# Reset the database
reset:
	npx prisma migrate reset

# Format schema
format:
	npx prisma format

#test db connection
test:
	npx prisma db pull
