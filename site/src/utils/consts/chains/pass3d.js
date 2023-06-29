import { ReactComponent as Polkadot } from "../../../components/icons/polkadot.svg";
import { governanceModules, treasuryModules } from "./modules";
import { assetChainModules } from "./assetChain";

const pass3d= {
  name: "3DPass",
  icon: <Polkadot />,
  identity: "pass3d",
  sub: "pass3d",
  value: "pass3d",
  chain: "pass3d",
  symbol: "P3D",
  decimals: 12,
  chainIcon: "originalPolkadot",
  color: "#323232",
  colorSecondary: "rgba(50, 50, 50, 0.1)",
  buttonColor: "#E6007A",
  logo: "logo-img-2",
  modules: {
    //...treasuryModules,
    //...governanceModules,
    ...assetChainModules,
  },
  //treasuryWebsite: "https://www.dotreasury.com/dot",
  //subSquareWebsite: "https://polkadot.subsquare.io",
};

export default pass3d;