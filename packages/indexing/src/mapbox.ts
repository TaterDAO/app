import axios from "axios";
import { config } from "dotenv";

config({ path: ".env" });

//@ts-ignore
const api = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  params: { access_token: process.env.MAPBOX_KEY as string }
});

class Geocoding {
  static async forward(searchText: string): Promise<any> {
    return "";
  }
  static async reverse(longitude: number, latitude: number): Promise<any> {
    const { data } = await api.get(`${longitude},${latitude}.json`);
    console.log(data);
    return "";
  }

  static isCoordinates(value: string): boolean {
    const re = new RegExp(/[a-z]+/);
    return !re.test(value);
  }
}

export { Geocoding };
