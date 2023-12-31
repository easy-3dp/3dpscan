const {
  identity: { getSubIdentitiesCollection },
} = require("@statescan/mongo");
const { getIdentityStorage } = require("../../utils/getIdentityStorage");
const { getSubIdentityDisplay } = require("../../utils/unitConversion");
const { toDecimal128 } = require("@statescan/common/src/utils/toDecimal128");

async function addSubIdentitiesCollection(subIdentity) {
  const collection = await getSubIdentitiesCollection();
  //update and upsert collection
  await collection.updateOne(
    { _id: subIdentity.accountId },
    { $set: subIdentity },
    { upsert: true },
  );
}

async function setSubIdentity(method, event, indexer) {
  let subIdentity = {};
  const parentIdentityAccountId = event.data[1].toString();
  const subIdentityAccountId = event.data[0].toString();
  const deposit = event.data[2];

  subIdentity = await getIdentityStorage(parentIdentityAccountId);
  subIdentity.deposit = toDecimal128(deposit);

  // override main identity display with sub identity display below as only sub identity display name is different, rest info is inherited from parent identity
  subIdentity.info.display = await getSubIdentityDisplay(subIdentityAccountId);

  subIdentity.accountId = subIdentityAccountId;
  subIdentity.subIdentityAccountId = subIdentityAccountId;
  subIdentity.parentIdentityAccountId = parentIdentityAccountId;
  subIdentity.method = method;
  subIdentity.indexer = indexer;

  await addSubIdentitiesCollection(subIdentity);
}

// delete sub identity
async function deleteSubIdentity(event) {
  const subIdentityAccountId = event.data[0].toString();
  const registrarsCollection = await getSubIdentitiesCollection();
  await registrarsCollection.deleteOne({ _id: subIdentityAccountId });
}

module.exports = {
  setSubIdentity,
  deleteSubIdentity,
};
