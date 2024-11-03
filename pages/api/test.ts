// pages/api/test-citas.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testCitasHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const citas = await prisma.$queryRaw`SELECT * FROM Cita`; // Usa consulta cruda
      return res.status(200).json(citas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al consultar las citas' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default testCitasHandler;
