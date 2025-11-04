const S={ore:0,perClick:1,upgradeCost:10,planet:1,multiplier:1,prestigeNeed:100}
const $=s=>document.querySelector(s)
const fmt=n=>Math.floor(n).toLocaleString()
const toast=msg=>{const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1000)}

function save(){localStorage.setItem('dwarf-save',JSON.stringify(S))}
function load(){
 let raw=localStorage.getItem('dwarf-save')
 if(!raw){save();return}
 Object.assign(S,JSON.parse(raw));update()
}
function mine(){S.ore+=S.perClick*S.multiplier;update();save()}
function canBuy(c){return S.ore>=c}
function buy(){
 if(!canBuy(S.upgradeCost))return
 S.ore-=S.upgradeCost
 S.perClick+=1
 S.upgradeCost=Math.ceil(S.upgradeCost*1.6)
 update();save();toast('Upgrade bought')
}
function canPrestige(){return S.ore>=S.prestigeNeed}
function prestige(){
 S.ore=0;S.planet++;S.multiplier=+(S.multiplier*1.25).toFixed(2)
 S.prestigeNeed=Math.ceil(S.prestigeNeed*1.75)
 update();save();toast('Prestiged!')
}
function resetAll(){
 localStorage.removeItem('dwarf-save')
 Object.assign(S,{ore:0,perClick:1,upgradeCost:10,planet:1,multiplier:1,prestigeNeed:100})
 update();save();toast('Reset')
}
function update(){
 $('#ore').textContent=fmt(S.ore)
 $('#perClick').textContent=fmt(S.perClick*S.multiplier)
 $('#planet').textContent=S.planet
 $('#mineDelta').textContent=fmt(S.perClick*S.multiplier)
 $('#upgradeCost').textContent=fmt(S.upgradeCost)
 $('#prestigeNeed').textContent=fmt(S.prestigeNeed)
 $('#multiplierPreview').textContent=(S.multiplier*1.25).toFixed(2)
 $('#buyUpgrade').disabled=!canBuy(S.upgradeCost)
 $('#prestigeBtn').disabled=!canPrestige()
 document.title=`Ore ${fmt(S.ore)}`
}
$('#mineBtn').onclick=mine
$('#buyUpgrade').onclick=buy
$('#prestigeBtn').onclick=()=>canPrestige()?$('#confirmModal').classList.add('show'):toast('Need more ore')
$('#confirmPrestige').onclick=()=>{ $('#confirmModal').classList.remove('show'); prestige() }
$('#cancelPrestige').onclick=()=>$('#confirmModal').classList.remove('show')
$('#resetBtn').onclick=resetAll
window.onkeydown=e=>{if(e.key==='Enter'){mine()}}
update();load()
