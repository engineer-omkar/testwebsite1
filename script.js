const isMobile = window.innerWidth <= 768;
const frames = document.querySelectorAll(".hero-frame");
const hero = document.querySelector(".hero-scroll");

function updateHeroFrames(){
  const progress =
    (window.scrollY - hero.offsetTop) /
    (hero.offsetHeight - window.innerHeight);

  const p = Math.max(0, Math.min(1, progress));

  frames.forEach(frame => frame.classList.remove("active"));

  if(p < 0.16) frames[0].classList.add("active");
  else if(p < 0.32) frames[1].classList.add("active");
  else if(p < 0.48) frames[2].classList.add("active");
  else if(p < 0.64) frames[3].classList.add("active");
  else if(p < 0.80) frames[4].classList.add("active");
  else frames[5].classList.add("active");

  const contentOne = document.querySelector(".content-one");
  const scrollDown = document.querySelector(".scroll-down");

  if(contentOne){
    if(p < 0.08){
      contentOne.style.opacity = 1;
      contentOne.style.transform = "translateY(-50%)";
    }else if(p < 0.16){
      const fade = 1 - ((p - 0.08) / 0.08);
      contentOne.style.opacity = fade;
      contentOne.style.transform =
        `translateY(calc(-50% - ${(p - 0.08) * 300}px))`;
    }else{
      contentOne.style.opacity = 0;
      contentOne.style.transform = "translateY(calc(-50% - 40px))";
    }
  }

  if(scrollDown){
    scrollDown.style.opacity = p > 0.75 ? 0 : 1;
  }
}

if(!isMobile){
  window.addEventListener("scroll", updateHeroFrames);
  window.addEventListener("load", updateHeroFrames);
}

const services = {
  web:{
    badge:"01",
    title:"Web Development",
    text:"We build fast, secure and scalable websites that deliver seamless digital experiences.",
    features:["Custom Websites","Responsive Design","E-commerce Solutions","Performance Optimized"],
    icon:"</>"
  },
  deploy:{
    badge:"02",
    title:"Deployment",
    text:"We deploy websites securely with optimized production setup.",
    features:["Cloud Deploy","SSL Setup","CI/CD Setup","Launch Support"],
    icon:"⇧"
  },
  hosting:{
    badge:"03",
    title:"Hosting",
    text:"Reliable hosting setup with speed, uptime, security and monitoring.",
    features:["Fast Hosting","Server Setup","Backup System","Uptime Monitor"],
    icon:"▤"
  },
  support:{
    badge:"04",
    title:"Support",
    text:"Ongoing technical support, updates and website maintenance.",
    features:["Bug Fixing","Updates","Security Checks","Maintenance"],
    icon:"☏"
  },
  data:{
    badge:"05",
    title:"Data Management",
    text:"We manage and visualize business data with clean dashboards.",
    features:["Dashboards","Reports","Data Cleaning","Business Insights"],
    icon:"◔"
  },
  seo:{
    badge:"06",
    title:"SEO",
    text:"We improve search visibility, ranking and organic traffic.",
    features:["Keyword Research","On Page SEO","Technical SEO","Analytics Setup"],
    icon:"⌕"
  }
};

const nodes = document.querySelectorAll(".service-node");
const card = document.getElementById("serviceCard");

function openService(id){
  const item = services[id];

  nodes.forEach(node => node.classList.remove("active"));
  document.querySelector(`[data-id="${id}"]`).classList.add("active");

  card.classList.remove("open");

  setTimeout(()=>{
    document.getElementById("badge").textContent = item.badge;
    document.getElementById("cardTitle").textContent = item.title;
    document.getElementById("cardText").textContent = item.text;
    document.getElementById("features").innerHTML =
      item.features.map(f => `<span>✓ ${f}</span>`).join("");

    document.getElementById("previewIcon").innerHTML = item.icon;

    card.classList.add("open");
  },180);
}

nodes.forEach(node=>{
  node.addEventListener("mouseenter",()=>openService(node.dataset.id));
  node.addEventListener("click",()=>openService(node.dataset.id));
});

document.querySelector(".close").addEventListener("click",()=>{
  card.classList.remove("open");
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.25
});

revealItems.forEach(item=>{
  revealObserver.observe(item);
});