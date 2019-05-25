#!bin/bash
psql -f /tmp/psql_setup/db_init.sql
psql american_fugitive < /tmp/psql_setup/american_fugitive.sql
