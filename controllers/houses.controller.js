import * as housesRepository from "../repositories/houses.repository.js";
import HTTPError from "../errorHandling/HTTPError.js";

// hent alle houses //
export async function getAllHouses(req, res) {
  const houses = await housesRepository.getAllHouses();

  return res.status(200).json(houses);
}

// hent et bestemt house //
export async function getHouseById(req, res) {
  const id = req.params.id;

  const house = await housesRepository.getHouseById(id);

  if (!house) {
    throw new HTTPError(404, "House not found");
  }

  return res.status(200).json(house);
}
