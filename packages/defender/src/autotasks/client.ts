import { AutotaskClient } from "defender-autotask-client";
import { config } from "dotenv";

config();

const client = new AutotaskClient({
  apiKey: process.env.API_KEY as string,
  apiSecret: process.env.API_SECRET as string
});

export default client;
