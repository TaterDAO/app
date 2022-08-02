echo "\033[1;35m Installing Modules \033[0m"

echo "\033[1;33m Globals \033[0m"
# Install PM2
yarn global add pm2
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

echo "\033[1;33m Web \033[0m"
cd modules/web
rm -rf node_modules
yarn --silent
cp .env.sample .env.development.local

echo "\033[1;33m Web \033[0m"
cd ../indexing
rm -rf node_modules
yarn --silent
cp .env.sample .env

echo "\033[1;33m Contracts \033[0m"
cd ../contracts
rm -rf node_modules
yarn --silent
cp .env.sample .env

echo "\033[1;33m Defender \033[0m"
cd ../Defender
rm -rf node_modules
yarn --silent
cp .env.sample .env

echo "\033[1;35m Installation Complete \033[0m"
