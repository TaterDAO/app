import type { NextApiRequest, NextApiResponse } from "next";

import { methods } from "@utils/api/middleware";
import { cidToURL } from "@services/IPFS";

import axios from "axios";

/**
 * Enables 1-click downloading of KML.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = req.query.cid as string;
  const fileRes = await axios.get(cidToURL(cid).href);

  res.setHeader("Content-Type", "application/vnd.google-earth.kml+xml");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=taterdao-${cid}.kml`
  );
  res.status(200);
  res.send(fileRes.data);
}

export default methods(handler, ["GET"]);
