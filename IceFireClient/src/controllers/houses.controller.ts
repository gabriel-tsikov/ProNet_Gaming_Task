import { Request, Response, NextFunction } from 'express';
import { fetchHouses, fetchHouse } from '../services/houses.service';

export async function getHouses(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const houses = await fetchHouses(page, pageSize);
    res.json(houses);
  } catch (err) {
    next(err);
  }
}

export async function getHouse(req: Request, res: Response, next: NextFunction) {
  try {
    const houseId = req.params.id;
    const house = await fetchHouse(houseId);
    res.json(house);
  } catch (err) {
    next(err);
  }
}