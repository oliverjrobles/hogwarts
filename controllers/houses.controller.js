import * as housesRepository from "../repositories/houses.repository.js";

//hent alle houses//
export async function getAllHouses(req, res) {
  try {
    const houses = await housesRepository.getAllHouses();

    res.status(200).json(houses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch houses" });
  }
}

//hent et bestemt house//
export async function getHouseById(req, res) {
  try {
    const id = req.params.id;
    const house = await housesRepository.getHouseById(id);

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    res.status(200).json(house);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch house" });
  }
}
