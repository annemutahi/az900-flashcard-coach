const D=["Cloud concepts","Azure architecture & services","Management & governance"];
// [domain, front, back, optional everyday analogy]
const C=[
[0,"What does the shared responsibility model say?","The cloud provider secures the underlying infrastructure. You always stay responsible for your data, identities and access. Responsibility for OS and apps shifts depending on IaaS, PaaS or SaaS.","Like renting a flat: the landlord secures the building, you lock your own door."],
[0,"Public vs private vs hybrid cloud?","Public: shared infrastructure owned by a provider. Private: dedicated to one organisation. Hybrid: a mix of both, connected and used together."],
[0,"CapEx vs OpEx?","CapEx is upfront spending on physical assets (e.g. buying servers). OpEx is paying for services as you use them. The cloud shifts spending toward OpEx."],
[0,"What is the consumption-based pricing model?","You pay only for the resources you actually use, with no upfront cost and no long-term commitment required.","Like buying airtime only when you need it."],
[0,"Scalability vs elasticity?","Scalability is the ability to add capacity to handle more load. Elasticity is adding and removing capacity automatically as demand rises and falls."],
[0,"What is high availability?","Designing a service to keep running with minimal downtime, usually through redundancy. Backed by a service level agreement (SLA)."],
[0,"What is IaaS?","Infrastructure as a Service: the provider supplies virtual machines, storage and networking. You manage the OS and apps. Example: Azure Virtual Machines."],
[0,"What is PaaS?","Platform as a Service: the provider manages the OS and runtime. You deploy your code and data. Example: Azure App Service."],
[0,"What is SaaS?","Software as a Service: ready-made software used over the internet, with the provider managing almost everything. Example: Microsoft 365."],
[0,"What does serverless mean?","You run code without managing servers. It scales automatically and you pay per execution. Example: Azure Functions."],
[0,"Vertical vs horizontal scaling?","Vertical: give one machine more CPU or RAM. Horizontal: add more instances of the machine.","Vertical: a bigger matatu. Horizontal: more matatus on the route."],
[0,"What is reliability in the cloud?","The ability of a system to recover from failures and keep working as expected."],
[1,"Region vs availability zone?","A region is a geographic area containing datacentres. An availability zone is a physically separate datacentre location inside a region, with its own power, cooling and networking."],
[1,"What is a region pair?","Two regions in the same geography, paired for disaster recovery. Updates roll out to one at a time and recovery of one is prioritised if both fail."],
[1,"What is a resource group?","A logical container for related resources that share a lifecycle. Deleting the group deletes everything inside it."],
[1,"What is the Azure resource hierarchy, top to bottom?","Management group, then subscription, then resource group, then resource."],
[1,"What does Azure Resource Manager do?","It is the deployment and management layer. Requests from the portal, CLI, SDKs and templates all go through it, giving consistent management."],
[1,"What are virtual machine scale sets?","A group of identical virtual machines that can automatically scale out and in with demand."],
[1,"What is Azure App Service?","A PaaS offering for hosting web apps and APIs without managing the underlying servers."],
[1,"ExpressRoute vs VPN Gateway?","VPN Gateway sends encrypted traffic over the public internet. ExpressRoute is a private, dedicated connection that does not use the public internet."],
[1,"What is Azure Blob Storage for?","Object storage for large amounts of unstructured data such as images, video, documents and backups."],
[1,"LRS vs ZRS vs GRS?","LRS copies data within one datacentre. ZRS copies across availability zones in one region. GRS replicates to a secondary region far away."],
[1,"What is Microsoft Entra ID?","The cloud identity and access management service. It handles sign-in, single sign-on and multifactor authentication."],
[1,"What is defense in depth?","A layered security approach so that if one layer fails, the others still protect your assets (physical, identity, network, compute, application, data)."],
[2,"What does Azure Policy do?","Enforces rules on resources (such as allowed regions or sizes) and reports how compliant your environment is."],
[2,"What are resource locks for?","They prevent accidental deletion or modification of resources. Two types: CanNotDelete and ReadOnly."],
[2,"What are tags used for?","Name-value pairs attached to resources to organise them and to group costs, for example by project or department."],
[2,"Pricing calculator vs TCO calculator?","Pricing calculator estimates the cost of Azure services you plan to use. TCO calculator compares the cost of on-premises with running on Azure."],
[2,"What does Microsoft Cost Management do?","Lets you monitor and analyse spending, set budgets and receive alerts so costs stay under control."],
[2,"What is Azure Advisor?","A service giving personalised recommendations to improve reliability, security, performance, cost and operational excellence."],
[2,"What is Azure Monitor?","Collects and analyses metrics and logs from resources and apps, and can raise alerts when something is wrong."],
[2,"What is Azure Service Health?","Personalised information on Azure outages and planned maintenance that affect the resources you use."],
[2,"What is Azure Cloud Shell?","A browser-based command line that supports Azure CLI and PowerShell, with no local install needed."],
[2,"What are ARM templates and Bicep?","Infrastructure-as-code tools. You declare the resources you want and deploy them repeatably and consistently."],
[2,"What is Azure Arc?","Extends Azure management and governance to resources outside Azure, such as on-premises servers or other clouds."],
[2,"What is Microsoft Purview?","A set of tools for data governance, risk and compliance across your data estate."]
];
const K="az900fc-v1",$=id=>document.getElementById(id);
let S={};try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const st=i=>S[i]||{ef:2.5,iv:0,n:0,due:0,lapse:0,seen:0};
const DAY=864e5;
let Q=[],cur=null,on=false,rs=[0,0,0,0],missed=new Set(),total=0;
function show(id){["home","study","done"].forEach(s=>$(s).hidden=s!==id)}
function dom(){return $("dom").value}
function pool(){return C.map((c,i)=>i).filter(i=>dom()==="all"||C[i][0]==dom())}
function isDue(i){const s=st(i);return !s.seen||s.due<=Date.now()}
function home(){
  const p=pool();
  $("sDue").textContent=p.filter(isDue).length;
  $("sMas").textContent=p.filter(i=>st(i).iv>=21).length;
  const tr=p.filter(i=>st(i).lapse>0).sort((a,b)=>st(b).lapse-st(a).lapse);
  $("sTr").textContent=tr.length;
  $("tl").innerHTML=tr.length?tr.slice(0,8).map(i=>`<li><span>${C[i][1]}</span><small>missed ${st(i).lapse}x</small></li>`).join(""):"<li style='color:var(--mut)'>None yet. Cards you rate Again will show up here.</li>";
  $("bars").innerHTML=D.map((d,k)=>{const ids=C.map((c,i)=>i).filter(i=>C[i][0]===k);const m=ids.filter(i=>st(i).iv>=21).length;return `<div class="bar"><span>${d}: ${m} of ${ids.length} mastered</span><i><u style="width:${m/ids.length*100}%"></u></i></div>`}).join("");
}
function goHome(){home();show("home")}
function start(mode){
  const p=pool();let q;
  $("note").textContent="";
  if(mode==="weak"){
    const w=p.filter(i=>st(i).lapse>0).sort((a,b)=>st(b).lapse-st(a).lapse||st(a).ef-st(b).ef).slice(0,10);
    if(!w.length){$("note").textContent="No weak spots yet. Study some cards first and the ones you miss will appear here.";return}
    q=w.concat(p.filter(i=>!w.includes(i)&&isDue(i)).slice(0,3));
  }else{
    q=p.filter(isDue).sort(()=>Math.random()-.5).slice(0,20);
    if(!q.length){$("note").textContent="Nothing due right now. Try Fix my weak spots, or come back later.";return}
  }
  Q=q;total=q.length;rs=[0,0,0,0];missed=new Set();show("study");next();
}
function next(){
  if(!Q.length)return finish();
  cur=Q.shift();on=false;$("card").classList.remove("on");
  const c=C[cur];
  $("dn").textContent=D[c[0]];$("q").textContent=c[1];$("a").textContent=c[2];$("x").textContent=c[3]||"";
  $("pg").textContent=`${Q.length+1} left in this session`;
  document.querySelectorAll("#rate button").forEach(b=>b.disabled=true);
}
function flip(){
  on=!on;$("card").classList.toggle("on",on);
  if(on)document.querySelectorAll("#rate button").forEach(b=>b.disabled=false);
}
function rate(r){
  if(!on)return;
  const s={...st(cur)};s.seen=1;rs[r]++;
  if(r===0){s.n=0;s.iv=0;s.lapse++;s.ef=Math.max(1.3,s.ef-.2);s.due=Date.now()+6e5;missed.add(cur);Q.splice(Math.min(3,Q.length),0,cur)}
  else{
    if(r===1){s.iv=Math.max(1,Math.round(s.iv*1.2));s.ef=Math.max(1.3,s.ef-.15)}
    else if(r===2){s.iv=s.n===0?1:s.n===1?3:Math.round(s.iv*s.ef)}
    else{s.iv=s.n===0?3:Math.round(s.iv*s.ef*1.3);s.ef+=.15}
    s.n++;s.due=Date.now()+s.iv*DAY;
  }
  S[cur]=s;save();next();
}
function finish(){
  const good=rs[2]+rs[3],all=rs.reduce((a,b)=>a+b,0);
  const rev=[...missed].map(i=>`<li style="margin:4px 0">${C[i][1]} <small style="color:var(--mut)">(${D[C[i][0]]})</small></li>`).join("");
  $("sum").innerHTML=`<h2 style="margin-top:0">Session complete</h2><p>${all} ratings. ${all?Math.round(good/all*100):0}% were Good or Easy.</p><p>Again ${rs[0]} · Hard ${rs[1]} · Good ${rs[2]} · Easy ${rs[3]}</p>${rev?`<h2>Revisit these</h2><ul>${rev}</ul>`:"<p>No missed cards. Nice work.</p>"}<p><button class="pri" onclick="goHome()">Back to dashboard</button></p>`;
  show("done");
}
function resetAll(){if(confirm("Reset all progress on this device?")){S={};save();goHome()}}
$("dom").innerHTML='<option value="all">All topics</option>'+D.map((d,k)=>`<option value="${k}">${d}</option>`).join("");
$("dom").onchange=home;
document.querySelectorAll("#rate button").forEach(b=>b.onclick=()=>rate(+b.dataset.r));
document.addEventListener("keydown",e=>{
  if($("study").hidden||/^(BUTTON|SELECT)$/.test(e.target.tagName))return;
  if(e.key===" "||e.key==="Enter"){e.preventDefault();flip()}
  else if("1234".includes(e.key)&&on)rate(+e.key-1);
});
home();
