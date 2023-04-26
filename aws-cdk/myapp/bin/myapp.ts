import middy from '@middy/core';
import cors from '@middy/http-cors';
import { jsonBodyParser } from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express, { Request, Response } from 'express';
import { getAssets } from './getAssets';
import { createAsset } from './createAsset';
import { deleteAsset } from './deleteAsset';

const app = express();

app.use(jsonBodyParser());
app.use(cors());

app.get('/assets', async (req: Request, res: Response) => {
  try {
    const result = await getAssets.handler(null, null);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/assets', async (req: Request, res: Response) => {
  try {
    const result = await createAsset.handler({
      body: JSON.stringify(req.body)
    }, null);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.delete('/assets/:assetId', async (req: Request, res: Response) => {
  try {
    const result = await deleteAsset.handler({
      pathParameters: { assetId: req.params.assetId }
    }, null);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

export const handler = middy(app);