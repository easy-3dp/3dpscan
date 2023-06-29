import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  DEFAULT_PASS3D_NODES,
  DEFAULT_PASS3D_NODE_URL,
} from "../utils/constants";

let nodeUrl = (() => {
  let localNodeUrl = null;
  try {
    localNodeUrl = JSON.parse(localStorage.getItem("nodeUrl"));
  } catch (e) {
    // ignore parse error
  }
  return {
    pass3d:
      DEFAULT_PASS3D_NODES.find((item) => item.url === localNodeUrl?.pass3d)
        ?.url || DEFAULT_PASS3D_NODE_URL,
  };
})();

const apiInstanceMap = new Map();

export function getChainApi(chain, queryUrl) {
  const url = queryUrl || nodeUrl?.[chain];
  if (!apiInstanceMap.has(url)) {
    apiInstanceMap.set(
      url,
      ApiPromise.create({ provider: new WsProvider(url) }),
    );
  }
  return apiInstanceMap.get(url);
}

export const estimateBlocksTime = async (chain, blocks) => {
  const api = await getChainApi(chain);
  const nsPerBlock = api.consts.babe.expectedBlockTime.toNumber();
  return nsPerBlock * blocks;
};
