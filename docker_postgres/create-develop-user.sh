#!/bin/bash
set -e

POSTGRES="psql ${DB_NAME} --username ${POSTGRES_USER}"

echo "Creating user: ${DB_DEVELOP_USER}"

$POSTGRES <<-EOSQL
CREATE USER develop WITH PASSWORD 'develop';
EOSQL