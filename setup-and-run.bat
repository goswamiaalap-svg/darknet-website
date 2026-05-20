@echo off
echo =========================================
echo  THE DARKNET COMMUNITY - DB SETUP
echo =========================================
echo.

cd /d "C:\Users\AALAP GOSWAMI\OneDrive\Desktop\darknet website"

echo [1/2] Generating Prisma client...
call npx prisma generate
echo.

echo [2/2] Creating database...
call npx prisma db push
echo.

echo =========================================
echo  DATABASE READY! Starting server...
echo =========================================
echo.

call npm run dev

pause
