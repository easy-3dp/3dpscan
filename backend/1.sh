cd packages/account-scan
NODE_ENV=production pm2 start src/scripts/all/index.js --name account-all --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --cron-restart='*/5 * * * *' --no-autorestart
NODE_ENV=production pm2 start src/index.js --name account-scan --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
cd ../asset-scan
NODE_ENV=production pm2 start src/index.js --name asset-scan --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
cd ../block-scan
NODE_ENV=production pm2 start src/index.js --name block-scan --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
cd ../identity-scan
NODE_ENV=production pm2 start src/index.js --name identity-scan --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
cd ../runtime-scan
NODE_ENV=production pm2 start src/index.js --name runtime-scan --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
#cd ../uniques-scan
#NODE_ENV=production pm2 start src/scripts/jobs/parse.js --name uniques-parse --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
#NODE_ENV=production pm2 start src/scripts/jobs/resource.js --name uniques-resource --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
#NODE_ENV=production pm2 start src/scripts/jobs/populate.js --name uniques-populate --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
#NODE_ENV=production pm2 start src/scripts/jobs/syncParseResult.js --name uniques-sync-result --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
#NODE_ENV=production pm2 start src/index.js --name uniques-scan --log-date-format 'YYYY-MM-DD HH:mm Z' --env production --max-memory-restart 600M
cd ../server
NODE_ENV=production pm2 start src/index.js --name server --log-date-format 'YYYY-MM-DD HH:mm Z' --env production
