const {
  chain: { getApi },
} = require("@osn/scan-common");
const { toDecimal128 } = require("@statescan/common/src/utils/toDecimal128");

async function getIdentityStorage(accountId) {
  const api = await getApi();
  let identity = {};
  identity.accountId = accountId;

  const identityInfo = await api.query.identity.identityOf(accountId);

  if (!identityInfo.isSome) {
    return identity;
  }

  const { info, judgements, deposit } = identityInfo.unwrap();

  identity.info = {
    display:  info.display.asRaw.toUtf8?.() || null,
    legal:    info.legal.asRaw.toHuman?.() || null,
    web:      info.web.asRaw.toHuman?.() || null,
    riot:     info.riot.asRaw.toHuman?.() || null,
    email:    info.email.asRaw.toHuman?.() || null,
    image:    info.image.asRaw.toHuman?.() || null,
    twitter:  info.twitter.asRaw.toHuman?.() || null,
    pgpFingerprint: info.pgpFingerprint.isSome ? info.pgpFingerprint.unwrap().toHex() : null,
    additional: {},
  };

  info.additional?.forEach(item => {
    const key = item[0].asRaw.toUtf8();
    const value = item[1].asRaw.toUtf8();
    identity.info.additional[key] = value;
  });

  identity.deposit = toDecimal128(deposit);
  if (judgements.length > 0) {
    identity.judgements = setIdentityJudgements(identity, judgements);
  }
  identity.accountId = accountId;
  return identity;
}

function setIdentityJudgements(identity, judgements) {
  let judgementsList = [];

  if (judgements.length > 0) {
    judgementsList = judgements.map(([registrarIndex, judgement]) => {
      return {
        registrarIndex: registrarIndex.toNumber(),
        judgement: judgement.toString(),
      };
    });
  }

  return judgementsList;
}

module.exports = {
  getIdentityStorage,
};
