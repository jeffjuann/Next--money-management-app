import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
{
	if (req.method === 'GET')
	{
		res.status(200).json("GET - Global");
	}
	else if(req.method === 'POST')
	{
		res.status(200).json("POST - Global");
	}
	else
	{
		
	}
}

export default handler;