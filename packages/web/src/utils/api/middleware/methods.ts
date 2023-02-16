/**
 * Middleware to allow/reject requests based on the HTTP method.
 */

import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST";

export default function methods(
  handler: NextApiHandler,
  allow: Array<Method> = []
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return allow.includes(req.method as Method)
      ? handler(req, res)
      : res.status(405).send("");
  };
}
