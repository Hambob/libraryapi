import {Client, expect} from '@loopback/testlab';
import {MyApplication} from '../../application';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: MyApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
  it('invokes post /fav', async () => {
    const res = await client
      .post('/fav')
      .send({userId: '123', productId: '123'})
      .expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
