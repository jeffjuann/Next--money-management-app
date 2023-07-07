import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, transaction } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{ 
  if(req.query.params === undefined) return res.status(200).json({ error: "params undefined"});
  const id = req.query.params[0];
  const period = req.query.params[1];
  if(req.method === 'GET')
  {
    const allTrans = await prisma.transaction.findMany();
    res.status(200).json(
      {
        id: id,
        period: period,
        transactions: allTrans
      }
    );
  }
  else if(req.method === 'POST')
  {
    const Trans: transaction = {
      name: 'Testing',
      description: 'testing app',
      amount: 15000,
      type: 'expense',
      doneAt: new Date('01-01-2023'),
      userId: id
    };
    const newTrans = await prisma.transaction.create({ data: Trans });
    console.log(newTrans)
    res.status(200).json(newTrans);
  }
}