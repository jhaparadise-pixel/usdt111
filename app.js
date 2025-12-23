document.addEventListener("DOMContentLoaded", () => {
  console.log("bip39 =", window.bip39);
  console.log("bip32 =", window.bip32);
  console.log("bitcoinjs =", window.bitcoinjs);
  console.log("ethers =", window.ethers);

  document
    .getElementById("generateBtn")
    .addEventListener("click", generateAll);
});

function generateAll() {
  console.log("点击成功");

  // 1. 助记词
  const mnemonic = bip39.generateMnemonic();
  document.getElementById("mnemonic").value = mnemonic;

  // 2. BTC
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoinjs.networks.bitcoin);
  const child = root.derivePath("m/44'/0'/0'/0/0");

  const btc = bitcoinjs.payments.p2pkh({
    pubkey: child.publicKey,
    network: bitcoinjs.networks.bitcoin
  }).address;

  document.getElementById("btc").value = btc;

  // 3. ETH
  const ethWallet = ethers.Wallet.fromMnemonic(mnemonic);
  document.getElementById("eth").value = ethWallet.address;

  // 4. TRON（演示用）
  document.getElementById("tron").value =
    "T" + ethWallet.address.slice(2, 34);

  console.log("生成完成");
}
