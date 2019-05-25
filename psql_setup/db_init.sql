-- Reset DB
DROP DATABASE IF EXISTS american_fugitive;
CREATE DATABASE american_fugitive;

-- Connect to DB
\c american_fugitive

-- Enable postgis
CREATE EXTENSION postgis;
