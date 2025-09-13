// script.js

// Sections
function showSection(sectionId){
  document.querySelectorAll('.section').forEach(s => s.style.display='none');
  document.getElementById(sectionId).style.display='block';
}

// Dados iniciais
let products = JSON.parse(localStorage.getItem('products') || '[]');
let promotions = JSON.parse(localStorage.getItem('promotions') || '[]');
let coupons = JSON.parse(localStorage.getItem('coupons') || '[]');
let scriptsData = JSON.parse(localStorage.getItem('scriptsData') || '{}');
let paymentConfig = JSON.parse(localStorage.getItem('paymentConfig') || '{}');

// Funções Produtos
function renderProducts(){
  const container = document.getElementById('productsList');
  container.innerHTML = '';
  products.forEach((p,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `
      <b>${p.title}</b> - R$${p.price} 
      <button onclick="editProduct(${i})">Editar</button>
      <button onclick="deleteProduct(${i})">Remover</button>
    `;
    container.appendChild(div);
  });
}
function showAddProduct(){
  const title = prompt('Nome do produto:');
  if(!title) return;
  const price = prompt('Preço:');
  products.push({title, price});
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}
function editProduct(i){
  const title = prompt('Editar nome:', products[i].title);
  const price = prompt('Editar preço:', products[i].price);
  products[i].title = title;
  products[i].price = price;
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}
function deleteProduct(i){
  if(confirm('Remover produto?')){
    products.splice(i,1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

// Funções Promoções
function renderPromos(){
  const container = document.getElementById('promosList');
  container.innerHTML = '';
  promotions.forEach((p,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `${p.title} - Desconto: ${p.discount}% 
      <button onclick="editPromo(${i})">Editar</button>
      <button onclick="deletePromo(${i})">Remover</button>`;
    container.appendChild(div);
  });
}
function showAddPromo(){
  const title = prompt('Título Promoção:');
  const discount = prompt('Desconto %:');
  promotions.push({title, discount});
  localStorage.setItem('promotions', JSON.stringify(promotions));
  renderPromos();
}
function editPromo(i){
  const title = prompt('Editar título:', promotions[i].title);
  const discount = prompt('Editar desconto:', promotions[i].discount);
  promotions[i].title = title;
  promotions[i].discount = discount;
  localStorage.setItem('promotions', JSON.stringify(promotions));
  renderPromos();
}
function deletePromo(i){
  promotions.splice(i,1);
  localStorage.setItem('promotions', JSON.stringify(promotions));
  renderPromos();
}

// Cupons
function renderCoupons(){
  const container = document.getElementById('couponsList');
  container.innerHTML = '';
  coupons.forEach((c,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `${c.code} - ${c.discount}% 
      <button onclick="deleteCoupon(${i})">Remover</button>`;
    container.appendChild(div);
  });
}
function showAddCoupon(){
  const code = 'CUPOM'+Math.floor(Math.random()*10000);
  const discount = prompt('Desconto %:');
  coupons.push({code, discount});
  localStorage.setItem('coupons', JSON.stringify(coupons));
  renderCoupons();
}
function deleteCoupon(i){
  coupons.splice(i,1);
  localStorage.setItem('coupons', JSON.stringify(coupons));
  renderCoupons();
}

// Scripts
function saveScripts(){
  scriptsData.meta = document.getElementById('metaPixel').value;
  scriptsData.gtm = document.getElementById('gtm').value;
  scriptsData.tiktok = document.getElementById('tiktokPixel').value;
  localStorage.setItem('scriptsData', JSON.stringify(scriptsData));
  alert('Scripts salvos!');
}

// Gate de pagamento
function savePaymentConfig(){
  paymentConfig.gateway = document.getElementById('paymentGateway').value;
  paymentConfig.currency = document.getElementById('currency').value;
  localStorage.setItem('paymentConfig', JSON.stringify(paymentConfig));
  alert('Configuração de pagamento salva!');
}

// Configurações gerais
function saveSettings(){
  const config = {
    logo: document.getElementById('siteLogo').value,
    primaryColor: document.getElementById('primaryColor').value,
    whatsapp: document.getElementById('whatsappLink').value,
    instagram: document.getElementById('instagramLink').value
  };
  localStorage.setItem('siteConfig', JSON.stringify(config));
  alert('Configurações salvas!');
}

// Chart vendas (demo aleatório)
function renderSalesChart(){
  const ctx = document.getElementById('salesChart').getContext('2d');
  const labels = ['01','02','03','04','05','06','07'];
  const data = {
    labels,
    datasets: [{
      label:'Vendas do dia',
      backgroundColor:'#1e1e2f',
      data: labels.map(()=>Math.floor(Math.random()*20)+5)
    }]
  };
  new Chart(ctx, {type:'bar', data});
}

// Analytics Chart
function renderAnalyticsChart(){
  const ctx = document.getElementById('analyticsChart').getContext('2d');
  const labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul'];
  const data = {
    labels,
    datasets:[{
      label:'Vendas Mensais',
      borderColor:'#1e1e2f',
      backgroundColor:'rgba(30,30,47,0.2)',
      data: labels.map(()=>Math.floor(Math.random()*100)+20)
    }]
  };
  new Chart(ctx, {type:'line', data});
}

// Inicialização
renderProducts();
renderPromos();
renderCoupons();
renderSalesChart();
renderAnalyticsChart();
