@echo off
echo Adding .npmrc to Git...
git add .
echo Committing changes...
git commit -m "fix: replace broken wikimedia images with verified active unsplash city landmark IDs"
echo Pushing to GitHub (this will trigger a new Vercel deployment)...
git push origin master
echo.
echo Done! Your Vercel build should now start automatically and succeed.
pause
