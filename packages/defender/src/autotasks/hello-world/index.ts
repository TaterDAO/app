const handler = async function () {
  console.log("Hello World");
};

// Local Development
if (require.main === module) {
  try {
    handler();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export { handler };
