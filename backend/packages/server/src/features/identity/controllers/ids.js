const {
    identity: { getIdentityCollection, getIdentityWebCollection },
  } = require("@statescan/mongo");
  
  function getJudgementText(judgements){
    if (!judgements || judgements.length == 0) {
      return "NOT_VERIFIED";
    }

    let result = null;
    for (const item of judgements) {
      switch (item.judgement) {
        case 'Erroneous':
          return 'Erroneous';
        case 'Out of Date':
        case 'Low Quality':
          result = 'NOT_VERIFIED';
          break;
        case 'Reasonable':
        case 'Known Good':
          if (result !== 'NOT_VERIFIED') {
            result = 'VERIFIED';
          }
          break;
        default:
          break;
      }
    }

    return result ?? 'NOT_VERIFIED';

  }

  function normalizeHolders(holders) {
    return holders.map((item) => ({
      address: item._id,
      info: {
        status: getJudgementText(item.judgements),
        display: item.info.display ?? item.info.additional.Discord,
      }
    }));
  }

  async function getIds(ctx) {
    const { addresses } = ctx.request.body;
    const col = await getIdentityCollection();
    const items = await col.find({ _id: { $in: addresses } }).toArray();
    const col2 = await getIdentityWebCollection();
    const items2 = await col2.find({ _id: { $in: addresses } }).toArray();

    items2.forEach((element2) => {
      const found = items.find((element1) => element1._id === element2._id);
      if (!found) {
        items.push(element2);
      }
    });

    ctx.body = normalizeHolders(items);
  }
  
  module.exports = {
    getIds,
  };
  