echo "Installing Modules"

echo "Web..."
cd modules/web
rm -rf node_modules
yarn --silent
cp .env.sample .env.development.local

echo "Contracts.."
cd ../contracts
rm -rf node_modules
yarn --silent
cp .env.sample .env

echo "Installation Complete"
