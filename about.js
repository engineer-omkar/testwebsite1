const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.18
});

revealItems.forEach(item=>{
  revealObserver.observe(item);
});