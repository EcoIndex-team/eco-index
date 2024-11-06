import type { NextApiRequest, NextApiResponse } from "next"
import reader from "./restapi"

export default async function han(req?: NextApiRequest, res?: NextApiResponse) {
  const data = await reader()

  return data
}