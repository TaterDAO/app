echo "\033[1;35m \n Local Development Quick Start \n \033[0m"

# Start local ganache
echo "\033[1;33m 1. Starting local Hardhat chain in background \033[0m"
cd packages/contracts
pm2 update
pm2 delete hh
pm2 start --name hh 'yarn dev:chain'
echo "\033[1;32m Success \n \033[0m"

# Deploy contract to local ganache
echo "\033[1;33m 2. Deploying contract to local blockchain \033[0m"
yarn deploy:dev
cd ../..
echo "\033[1;32m Success \n \033[0m"

# Seed records to contract
echo "\033[1;33m 3. Seeding local contract \033[0m"
cd packages/indexing
yarn build
node dist/scripts/dev/seed.js
echo "\033[1;32m Success \n \033[0m"

# Index contract to Algolia
echo "\033[1;33m 4. Indexing local contract \033[0m"
node dist/scripts/indexTitles.js localhost http://127.0.0.1:8545/
echo "\033[1;32m Success \n \033[0m"

echo "\033[1;32m Ready for app development \n \033[0m"
