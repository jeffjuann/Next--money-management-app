import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{ 
  if(req.query.params === undefined) return res.status(200).json({ error: "params undefined"});
  const id = req.query.params[0];
  const period = req.query.params[1];
  if(req.method === 'GET')
  {
    const res = await prisma.transaction.findMany({
      where: {
        addedAt: {
          lte: new Date()
          gte: 
        }
      }
    })
    res.status(200).json(
      {
        id: id,
        period: period,
      }
    );
  } 
}