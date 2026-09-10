'use client'

import { useMemo, useState } from 'react'
import { Search, ShieldCheck, Activity, Droplets, Users, Code2, AlertTriangle, CheckCircle2, Eye, TrendingUp } from 'lucide-react'

const demo = {
  name: 'HoodLens Demo Token',
  symbol: 'HLDT',
  address: '0x7fA3...A91C',
  network: 'Robinhood Chain',
  source: 'Pons V2',
  age: '3h 42m',
  price: '$0.00428',
  marketCap: '$428K',
  liquidity: '$86.4K',
  holders: '1,842',
  volume: '$142.8K',
  score: 82,
  risk: 'LOW RISK'
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [scanned, setScanned] = useState(false)

  const scoreClass = useMemo(() => demo.score >= 75 ? 'good' : demo.score >= 50 ? 'warn' : 'bad', [])

  return (
    <main>
      <header className="nav container">
        <div className="brand"><div className="brandmark">H</div><span>HOOD<span className="accent">LENS</span></span></div>
        <nav>
          <a href="#scanner">Scanner</a><a href="#features">Features</a><a href="#about">About</a>
        </nav>
        <button className="ghost">Launch App</button>
      </header>

      <section className="hero container">
        <div className="eyebrow"><span className="dot"/> TOKEN INTELLIGENCE FOR ROBINHOOD CHAIN</div>
        <h1>See the chain<br/><span className="accent">clearly.</span></h1>
        <p>Scan tokens, uncover on-chain risks, inspect liquidity and holders, and understand what matters before you make a decision.</p>
        <div className="heroActions"><a className="primary" href="#scanner">Scan a token</a><a className="secondary" href="#features">Explore features</a></div>
        <div className="miniStats"><span><b>0–100</b> Risk Score</span><span><b>Pons</b> Launch Detection</span><span><b>EVM</b> Contract Analysis</span></div>
      </section>

      <section className="scannerWrap" id="scanner">
        <div className="container">
          <div className="sectionHead"><div><span className="kicker">HOODLENS SCANNER</span><h2>Analyze any token contract</h2></div><span className="live"><span className="dot"/> Robinhood Chain</span></div>
          <div className="searchbox">
            <Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Paste token contract address: 0x..."/>
            <button onClick={()=>setScanned(true)}>Scan token</button>
          </div>
          <p className="hint">Demo mode: enter any address to preview the HoodLens report UI.</p>

          {scanned && <div className="report">
            <div className="summary card">
              <div>
                <div className="tokenIcon">H</div>
                <div><h3>{demo.name} <span>${demo.symbol}</span></h3><p>{query || demo.address}</p></div>
              </div>
              <div className="badges"><span>{demo.network}</span><span>{demo.source}</span><span>Age {demo.age}</span></div>
            </div>

            <div className="grid topgrid">
              <div className="card scoreCard">
                <div className="cardTitle"><ShieldCheck size={18}/> HOODLENS SCORE</div>
                <div className={`score ${scoreClass}`}>{demo.score}<small>/100</small></div>
                <div className={`risk ${scoreClass}`}>{demo.risk}</div>
                <p>Low on-chain risk detected. Review the signals below before making any decision.</p>
              </div>
              <div className="card metrics">
                <Metric icon={<TrendingUp size={18}/>} label="Market Cap" value={demo.marketCap}/>
                <Metric icon={<Droplets size={18}/>} label="Liquidity" value={demo.liquidity}/>
                <Metric icon={<Users size={18}/>} label="Holders" value={demo.holders}/>
                <Metric icon={<Activity size={18}/>} label="24h Volume" value={demo.volume}/>
              </div>
            </div>

            <div className="grid detailgrid">
              <div className="card"><div className="cardTitle"><Eye size={18}/> RISK SIGNALS</div>
                <Signal good text="Liquidity appears secured"/><Signal good text="No mint capability detected"/><Signal good text="Healthy holder distribution"/><Signal good text="Low creator allocation"/><Signal text="Token is less than 24 hours old"/><Signal text="One wallet holds 7.8% of circulating supply"/>
              </div>
              <div className="card"><div className="cardTitle"><Users size={18}/> HOLDER ANALYSIS</div>
                <Bar label="Largest wallet" value="7.8%" width={39}/><Bar label="Top 5 holders" value="16.2%" width={48}/><Bar label="Top 10 holders" value="24.6%" width={62}/><Bar label="Creator" value="1.8%" width={18}/>
              </div>
              <div className="card"><div className="cardTitle"><Code2 size={18}/> CONTRACT</div>
                <Row label="Verified" value="Yes" good/><Row label="Proxy" value="No" good/><Row label="Mint" value="Not detected" good/><Row label="Blacklist" value="Not detected" good/><Row label="Upgradeable" value="Review"/>
              </div>
            </div>
          </div>}
        </div>
      </section>

      <section className="features container" id="features">
        <span className="kicker">BUILT FOR ON-CHAIN CLARITY</span><h2>One lens. Multiple signals.</h2>
        <div className="featureGrid">
          <Feature icon={<ShieldCheck/>} title="Risk Engine" text="Deterministic 0–100 scoring based on contract, liquidity, holder and creator signals."/>
          <Feature icon={<Users/>} title="Holder Intelligence" text="See concentration, creator holdings and system addresses without confusing pools for whales."/>
          <Feature icon={<Droplets/>} title="Liquidity Analysis" text="Understand pool status, launch phase, liquidity conditions and Pons-specific mechanics."/>
          <Feature icon={<Activity/>} title="Whale Activity" text="Track large wallets and suspicious movements as HoodLens grows beyond the MVP."/>
        </div>
      </section>

      <section className="about container" id="about">
        <div><span className="kicker">OUR MISSION</span><h2>Scan. Analyze. Decide.</h2></div>
        <p>HoodLens is designed as an independent token-intelligence layer for Robinhood Chain. The score is informational, not a guarantee of safety or investment performance.</p>
      </section>

      <footer className="container"><div className="brand"><div className="brandmark">H</div><span>HOOD<span className="accent">LENS</span></span></div><span>See the Chain Clearly.</span></footer>
    </main>
  )
}

function Metric({icon,label,value}:{icon:React.ReactNode,label:string,value:string}){return <div className="metric"><div>{icon}<span>{label}</span></div><b>{value}</b></div>}
function Signal({good,text}:{good?:boolean,text:string}){return <div className="signal">{good?<CheckCircle2 className="ok" size={18}/>:<AlertTriangle className="warning" size={18}/>}<span>{text}</span></div>}
function Row({label,value,good}:{label:string,value:string,good?:boolean}){return <div className="row"><span>{label}</span><b className={good?'okText':''}>{value}</b></div>}
function Bar({label,value,width}:{label:string,value:string,width:number}){return <div className="bar"><div><span>{label}</span><b>{value}</b></div><div className="track"><i style={{width:`${width}%`}}/></div></div>}
function Feature({icon,title,text}:{icon:React.ReactNode,title:string,text:string}){return <div className="feature card"><div className="featureIcon">{icon}</div><h3>{title}</h3><p>{text}</p></div>}
