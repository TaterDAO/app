// Libs
const algolia = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development.local" });

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_KEY
);

const attrs = {
  "attr.LandClassification": "Irrigated Cropland",
  "attr.Location": "3 Miles NW of Boyden",
  "attr.Deed": "",
  "attr.Parcels": "High Caliber Farm",
  "attr.Owner": "Unknown",
  "attr.Kml": "ipfs://QmPRgCAdRsTY6zL2j7PmvtoNf79Nx3xdhPA4vJdJQtJVjC",
  "attr.Tag": "Farm Sale, Iowa",
  "attr.CreatedDate": 1644339784,
  "attr.MaxSupply": 1
};

const records = [
  {
    objectID: "0",
    tokenId: 0,
    // Hardhat Account #19
    owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199".toLowerCase(),
    name: "Sioux County farm",
    description: "Sioux farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "1",
    tokenId: 1,
    owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199".toLowerCase(),
    name: "Sioux County farm",
    description: "Sioux farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "2",
    tokenId: 2,
    owner: "0xd453Cb82cB70b22BbB83fE7BaFb4a4144a8b9165".toLowerCase(),
    name: "Sioux County farm",
    description: "Sioux farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "3",
    tokenId: 3,
    owner: "0xd453Cb82cB70b22BbB83fE7BaFb4a4144a8b9165".toLowerCase(),
    name: "Sioux County farm",
    description: "Sioux farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "4",
    tokenId: 4,
    owner: "0xd453Cb82cB70b22BbB83fE7BaFb4a4144a8b9165".toLowerCase(),
    name: "Sioux County farm",
    description: "Sioux farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "5",
    tokenId: 5,
    // Hardhat Account #18
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "6",
    tokenId: 6,
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "7",
    tokenId: 7,
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "8",
    tokenId: 8,
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "9",
    tokenId: 9,
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "10",
    tokenId: 10,
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  },
  {
    objectID: "11",
    tokenId: 11,
    owner: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    name: "North Dakota Farm",
    description: "North Dakota farm with great productivity.",
    externalUrl:
      "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
    image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
    ...attrs
  }
];

(async () => {
  console.log("Seeding Localhost Data");

  const index = client.initIndex(`titles-localhost`);

  try {
    console.log("Clearing Records");
    await index.clearObjects();
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("Seeding Records");
    await index.saveObjects(records);
  } catch (error) {
    console.error(error);
  }
})();
