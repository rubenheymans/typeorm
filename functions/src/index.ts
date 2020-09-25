import * as functions from 'firebase-functions';
import { connect } from './config';
import { Hat } from './entity/Hat';
import { Hippo } from './entity/Hippo';

// Add CORS to your index.js
const cors = require('cors')({ origin: true });



export const createHippo = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    const { name, weight } = request.body;

    try {
      const connection = await connect();

      const repo = connection.getRepository(Hippo);

      const newHippo = new Hippo();
      newHippo.name = name;
      newHippo.weight = weight;

      const savedHippo = await repo.save(newHippo);

      response.send(savedHippo);

    } catch (error) {
      response.send(error)
    }
  });

});

export const getHippos = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {

    try {
      const connection = await connect();
      const hippoRepo = connection.getRepository(Hippo);

      // JOIN Query
      const hipposWearingHats = await hippoRepo
        .createQueryBuilder('hippo')
        .leftJoinAndSelect('hippo.hats', 'hat')
        .getMany();

      // Get all rows
      // const allHippos = await hippoRepo.find();

      response.send(hipposWearingHats);
    } catch (error) {
      response.send(error)
    }
  });
});

export const createHat = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    const { owner, color } = request.body;

    const connection = await connect();
    const repo = connection.getRepository(Hat);

    const newHat = new Hat();
    newHat.owner = owner;
    newHat.color = color;

    const savedHat = await repo.save(newHat);
    response.send(savedHat);
  });
});

export const testCall = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      response.send(['test']);
    } catch (error) {
      response.send(error)
    }
  });
});
