const chains = Object.freeze({
  pass3d: "pass3d",
});

const ss58Format = Object.freeze({
  [chains.pass3d]: 71,
});

function getSs58Format(chain) {
  return ss58Format[chain];
}

const assetsModuleChains = [
  chains.pass3d,
];

const uniquesModuleChains = [...assetsModuleChains];

module.exports = {
  chains,
  assetsModuleChains,
  uniquesModuleChains,
  getSs58Format,
};
