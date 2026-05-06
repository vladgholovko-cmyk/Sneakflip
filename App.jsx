const PLATFORMS = [
  { id: "vinted", name: "Vinted", commission: 0.05, fixed: 0.7, color: "#09B1BA" },
  { id: "ebay", name: "eBay", commission: 0.13, fixed: 0.3, color: "#E53238" },
  { id: "subito", name: "Subito.it", commission: 0.08, fixed: 0, color: "#FF6B00" },
];

function calcMargin(buyPrice, sellPrice, platform) {
  const fees = sellPrice * platform.commission + platform.fixed;
  const profit = sellPrice - buyPrice - fees;
  const margin = ((profit / buyPrice) * 100).toFixed(1);
  return { profit: profit.toFixed(2), margin, fees: fees.toFixed(2) };
}

const LISTING_TEMPLATES = {
  vinted: (model, size, condition, price, extra) =>
    `🔥 ${model} – Taglia ${size}\n\n✅ Condizione: ${condition}\n💶 Prezzo: €${price}\n\n${extra ? extra + "\n\n" : ""}Acquistati in outlet Nike ufficiale Italia. Articolo originale al 100%.\n\n📦 Spedizione rapida e sicura con tracking.\n💬 Aperto a offerte ragionevoli!\n\n#nike #${model.toLowerCase().replace(/\s+/g, "")} #sneakers #outlet #originale`,
  ebay: (model, size, condition, price, extra) =>
    `Nike ${model} – Taglia EU ${size} – ${condition}\n\nNike ${model}\nTaglia EU: ${size}\nCondizione: ${condition}\n${extra ? "Note: " + extra + "\n" : ""}\n📦 Spedizione con tracking\n↩️ Reso entro 30 giorni\n\nOriginali, acquistati in outlet Nike Italia.`,
  subito: (model, size, condition, price, extra) =>
    `Nike ${model} taglia ${size} – €${price}\n\nCondizioni: ${condition}\nOriginali, acquistati in outlet Nike Italia.\n${extra ? extra + "\n" : ""}\nSpedisco in tutta Italia. Scrivi per info!`,
};

const CONDITIONS = ["Nuovo", "Come nuovo", "Ottime condizioni", "Buone condizioni"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }
  .app { min-height: 100vh; background: #0a0a0a; font-family: 'DM Mono', monospace; color: #f0f0f0; }
  .header { border-bottom: 1px solid #1f1f1f; padding: 20px 24px 16px; display: flex; align-items: flex-end; gap: 12px; }
  .logo { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 2px; color: #fff; line-height: 1; }
  .logo span { color: #39FF14; }
  .tagline { font-size: 10px; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .tabs { display: flex; border-bottom: 1px solid #1f1f1f; }
  .tab { flex: 1; padding: 14px; background: none; border: none; color: #555; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; }
  .tab.active { color: #39FF14; border-bottom: 2px solid #39FF14; }
  .body { padding: 24px; max-width: 600px; margin: 0 auto; }
  .label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #555; margin-bottom: 6px; display: block; }
  .input { width: 100%; background: #111; border: 1px solid #222; color: #f0f0f0; font-family: 'DM Mono', monospace; font-size: 14px; padding: 10px 14px; border-radius: 4px; outline: none; margin-bottom: 16px; }
  .input:focus { border-color: #39FF14; }
  .input::placeholder { color: #333; }
  select.input { cursor: pointer; appearance: none; }
  textarea.input { resize: vertical; min-height: 60px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .card { background: #111; border: 1px solid #1f1f1f; border-radius: 6px; padding: 16px; margin-bottom: 10px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .pname { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #888; }
  .profit { text-align: right; }
  .pnum { font-size: 20px; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; }
  .pos { color: #39FF14; } .neg { color: #FF4545; } .zero { color: #555; }
  .psub { font-size: 9px; color: #444; letter-spacing: 1px; }
  .section { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #333; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #1a1a1a; margin-top: 8px; }
  .ptabs { display: flex; gap: 8px; margin-bottom: 16px; }
  .ptab { padding: 7px 14px; border-radius: 3px; background: #111; border: 1px solid #222; color: #555; font-family: 'DM Mono', monospace; font-size: 11px; cursor: pointer; letter-spacing: 1px; }
  .ptab.active { background: #39FF14; color: #000; border-color: #39FF14; }
  .btn { width: 100%; background: #39FF14; color: #000; border: none; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; padding: 14px; border-radius: 4px; cursor: pointer; margin-bottom: 16px; }
  .btn:disabled { background: #1a1a1a; color: #333; cursor: not-allowed; }
  .output { background: #0e0e0e; border: 1px solid #1f1f1f; border-radius: 4px; padding: 16px; font-size: 12px; line-height: 1.7; color: #ccc; white-space: pre-wrap; word-break: break-word; margin-bottom: 12px; min-height: 100px; }
  .copy { width: 100%; background: #111; border: 1px solid #222; color: #39FF14; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 11px; border-radius: 4px; cursor: pointer; }
  .note { font-size: 9px; color: #333; letter-spacing: 1px; margin-top: -8px; margin-bottom: 16px; }
  .empty { color: #2a2a2a; font-size: 11px; text-align: center; padding: 30px 0; }
`;

function App() {
  const [tab, setTab] = React.useState("calc");
  const [buyPrice, setBuyPrice] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [model, setModel] = React.useState("");
  const [size, setSize] = React.useState("");
  const [condition, setCondition] = React.useState("Nuovo");
  const [listPrice, setListPrice] = React.useState("");
  const [extra, setExtra] = React.useState("");
  const [listPlatform, setListPlatform] = React.useState("vinted");
  const [generated, setGenerated] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    const tmpl = LISTING_TEMPLATES[listPlatform];
    setGenerated(tmpl(model, size, condition, listPrice, extra));
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buy = parseFloat(buyPrice) || 0;
  const sell = parseFloat(sellPrice) || 0;

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="header">
        <div className="logo">Sneak<span>Flip</span></div>
        <div className="tagline">Reseller toolkit · Italia</div>
      </div>
      <div className="tabs">
        <button className={`tab ${tab === "calc" ? "active" : ""}`} onClick={() => setTab("calc")}>📊 Margine</button>
        <button className={`tab ${tab === "listing" ? "active" : ""}`} onClick={() => setTab("listing")}>📝 Annuncio</button>
      </div>
      <div className="body">
        {tab === "calc" && (
