import * as functions from 'firebase-functions';
import { connect } from './config';

import { Hippo } from './entity/Hippo';

export const createHippo = functions.https.onRequest(async (request, response) => {

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

export const getHippos = functions.https.onRequest(async (request, response) => {

  const connection = await connect();
  const hippoRepo = connection.getRepository(Hippo);

  // Get all rows
  const allHippos = await hippoRepo.find();

  response.send(allHippos);

});

