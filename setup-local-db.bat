@echo off
echo Setting up Kelly's Kitchen Database...

REM Change these values to match your MySQL installation if needed
set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin"
set MYSQL_USER=root
set MYSQL_PASSWORD=

echo Creating database...
%MYSQL_PATH%\mysql -u %MYSQL_USER% --execute="CREATE DATABASE IF NOT EXISTS kellysdatabase;"

echo Importing schema...
%MYSQL_PATH%\mysql -u %MYSQL_USER% kellysdatabase < database.sql

echo Database setup complete!
pause