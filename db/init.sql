-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE conexadb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'conexadb')\gexec