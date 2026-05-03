const DATA={
 fr:{title:"L'Art de l'Instant",subtitle:"Chroniques d'un Pompier-Photographe Belge",front:"assets/cover-front-fr.jpg",wrap:"assets/cover-wrap-fr.jpg",asin:"B0FHVGN67M"},
 nl:{title:"De Kunst van het Ogenblik",subtitle:"Kronieken van een Belgische Brandweerman-Fotograaf",front:"assets/cover-front-nl.jpg",wrap:"assets/cover-wrap-nl.jpg",asin:"B0FPQDSKDW"},
 en:{title:"The Art of the Instant",subtitle:"Chronicles of a Belgian Firefighter-Photographer",front:"assets/cover-front-en.jpg",wrap:"assets/cover-wrap-en.jpg",asin:"B0FNCCRLSD"}
};
const countries=["us","uk","de","fr","es","it","nl","pl","se","be","ie"];
let currentLang="fr";
function amazonLink(){const c=document.querySelector('#country').value;return `https://kdp.amazon.com/amazon-dp-action/${c}/dualbookshelf.marketplacelink/${DATA[currentLang].asin}`}
function setLang(lang){currentLang=lang;document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));document.querySelector('#bookTitle').textContent=DATA[lang].title;document.querySelector('#bookSubtitle').textContent=DATA[lang].subtitle;document.querySelector('#frontCover').src=DATA[lang].front;document.querySelector('#wrapCover').src=DATA[lang].wrap;document.querySelector('#showcaseCover').src=DATA[lang].front;document.querySelector('#buyLink').href=amazonLink();}
document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));document.querySelector('#country').addEventListener('change',()=>document.querySelector('#buyLink').href=amazonLink());
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')})},{threshold:.28});document.querySelectorAll('.chapter').forEach(s=>io.observe(s));
window.addEventListener('scroll',()=>{const y=window.scrollY;const book=document.querySelector('.book3d');if(book){const rot=-22+(y*.035);const lift=Math.min(y*.04,80);book.style.transform=`rotateY(${rot}deg) rotateX(3deg) translateY(${-lift}px)`}});
function shareProject(title){const url='https://thelookfavor.github.io/lookfavor/';const text=`Découvre ${title}, un projet éditorial Lookfavor.`;if(navigator.share){navigator.share({title,text,url})}else{navigator.clipboard.writeText(`${text} ${url}`);alert('Lien copié.')}}
