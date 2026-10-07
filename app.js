/**
 * Palazzo Pizzaria - Core Application & Interactive Logic
 * WhatsApp: 5581995440632
 */

(function () {
  'use strict';

  // --- Store Configuration ---
  const LOJA = {
    nome: "Palazzo Pizzaria",
    whatsapp: "5581995440632",
    telefone: "(81) 99544-0632",
    endereco: "Rua Capitão Valdemar Lima, Centro",
    cidade: "Vertentes - PE",
    tempoEntrega: "cerca de 30 min",
    tempoRetirada: "cerca de 30 min",
    horarios: {
      0: [["14:30", "23:00"]], // Domingo
      1: [],                   // Segunda (fechado)
      2: [["15:00", "23:00"]], // Terça
      3: [["11:00", "23:00"]], // Quarta
      4: [["17:00", "23:00"]], // Quinta
      5: [["15:00", "23:59"]], // Sexta
      6: [["17:00", "23:20"]]  // Sábado
    }
  };

  // --- Sabores Database ---
  const SABORES = [
    { id: "mussarela", nome: "Mussarela", categoria: "tradicional", desc: "Molho, mussarela, tomate, orégano e azeitona.", g: 50, meia: 25, p: 26, img: "./img/cardapio/mussarela.webp", tag: "Promoção" },
    { id: "calabresa", nome: "Calabresa", categoria: "tradicional", desc: "Molho, mussarela, calabresa, cebola, orégano e azeitona.", g: 50, meia: 25, p: 27, img: "./img/cardapio/calabresa.webp", tag: "Promoção" },
    { id: "frango", nome: "Frango", categoria: "tradicional", desc: "Molho, mussarela, frango, orégano e azeitona.", g: 50, meia: 25, p: 30, img: "./img/cardapio/frango.webp", tag: "Mais Vendida" },
    { id: "bacon", nome: "Bacon", categoria: "tradicional", desc: "Molho, mussarela, bacon, orégano e azeitona.", g: 50, meia: 25, p: 28, img: "./img/cardapio/bacon.webp" },
    { id: "calabresa-catupiry", nome: "Calabresa com Catupiry Original", categoria: "tradicional", desc: "Molho, mussarela, calabresa, Catupiry original, cebola, orégano e azeitona.", g: 53, meia: 27, p: 30, img: "./img/cardapio/calabresa-catupiry.webp", tag: "Mais Vendida" },
    { id: "frango-catupiry", nome: "Frango com Catupiry Original", categoria: "tradicional", desc: "Molho, mussarela, frango, Catupiry original, orégano e azeitona.", g: 53, meia: 27, p: 30, img: "./img/cardapio/frango-catupiry.webp", tag: "Favorita" },
    { id: "cupim", nome: "Cupim", categoria: "tradicional", desc: "Molho, mussarela, cupim bovino desfiado, cream cheese, orégano e azeitona.", g: 55, meia: 28, p: 33, img: "./img/cardapio/cupim.webp", tag: "Novidade" },
    { id: "portuguesa", nome: "Portuguesa", categoria: "tradicional", desc: "Molho, presunto, ovos, milho, ervilha, cebola, mussarela, orégano e azeitona.", g: 49, meia: 25, p: 31, img: "./img/cardapio/portuguesa.webp" },
    { id: "tres-queijos", nome: "Três Queijos do Reino", categoria: "tradicional", desc: "Molho, mussarela, queijo do reino, cream cheese, orégano e azeitona.", g: 55, meia: 26, p: 27, img: "./img/cardapio/tres-queijos.webp" },
    { id: "moda-da-casa", nome: "À Moda da Casa", categoria: "tradicional", desc: "Molho, mussarela, frango, calabresa, cebola, orégano e azeitona.", g: 53, meia: 27, p: 31, img: "./img/cardapio/moda-da-casa.webp" },
    { id: "peperoni", nome: "Peperoni", categoria: "tradicional", desc: "Molho, mussarela, peperoni, orégano e pimenta biquinho.", g: 56, meia: 28, p: 32, img: "./img/cardapio/peperoni.webp" },

    // Especiais
    { id: "nordestina", nome: "Nordestina", categoria: "especial", desc: "Molho, mussarela, charque desfiada, requeijão cremoso, orégano e azeitona.", g: 55, meia: 27.5, p: 32, img: "./img/cardapio/nordestina.webp", tag: "Mais Vendida" },
    { id: "sertaneja", nome: "Sertaneja", categoria: "especial", desc: "Molho, mussarela, carne de sol desfiada, requeijão cremoso, orégano e azeitona.", g: 55, meia: 27.5, p: 32, img: "./img/cardapio/sertaneja.webp", tag: "Especial" },
    { id: "costela", nome: "Costela Desfiada", categoria: "especial", desc: "Molho, mussarela, costela bovina, requeijão cremoso, orégano e azeitona.", g: 55, meia: 27.5, p: 33, img: "./img/cardapio/costela.webp", tag: "Destaque" },
    { id: "camarao", nome: "Camarão ao Alho", categoria: "especial", desc: "Molho, mussarela, camarão selecionado, alho dourado e orégano.", g: 57, meia: 28.5, p: 34, img: "./img/cardapio/camarao.webp" },

    // Premium
    { id: "premium-nordestina", nome: "Premium Nordestina", categoria: "premium", desc: "Charque nobre desfiada, queijo do reino ralado, Catupiry original e crocante de cebola.", g: 62, meia: 31, p: 36, img: "./img/cardapio/premium-nordestina.webp", tag: "Exclusiva" },
    { id: "premium-costela", nome: "Premium Costela", categoria: "premium", desc: "Costela bovina desfiada no bafo, queijo do reino artesanal, cream cheese e toque de ervas.", g: 62, meia: 31, p: 36, img: "./img/cardapio/premium-costela.webp", tag: "Chef" },
    { id: "camarao-reino", nome: "Camarão com Queijo do Reino", categoria: "premium", desc: "Camarões flambados, queijo do reino, Catupiry original e azeitonas pretas.", g: 64, meia: 32, p: 38, img: "./img/cardapio/camarao-reino.webp" },

    // Doces
    { id: "chocolate-mms", nome: "Chocolate com M&Ms", categoria: "doce", desc: "Creme de chocolate ao leite cremoso coberto com confeitos crocantes M&M's.", g: 46, meia: 23, p: 26, img: "./img/cardapio/chocolate-mms.webp" },
    { id: "banana-nevada", nome: "Banana Nevada", categoria: "doce", desc: "Fatias de banana fresca, canela em pó, leite condensado e raspas de chocolate branco.", g: 46, meia: 23, p: 26, img: "./img/cardapio/banana-nevada.webp" },

    // Doces Premium
    { id: "ninho-morango", nome: "Ninho com Morango", categoria: "doce-premium", desc: "Brigadeiro de leite Ninho cremoso, fatias de morangos frescos e raspas de chocolate.", g: 56, meia: 28, p: 32, img: "./img/cardapio/ninho-morango.webp", tag: "Irresistível" },
    { id: "nutella-morango", nome: "Nutella com Morango", categoria: "doce-premium", desc: "Nutella pura aveludada, fatias generosas de morango fresco e castanhas picadas.", g: 59, meia: 29.5, p: 34, img: "./img/cardapio/nutella-morango.webp", tag: "Top 1" },

    // Bebidas
    { id: "coca-lata", nome: "Coca-Cola Lata 350ml", categoria: "bebida", desc: "Refrigerante lata geladíssimo.", preco: 6, img: "./img/combo-calabresa-guarana.webp" },
    { id: "coca-zero-lata", nome: "Coca-Cola Zero Lata 350ml", categoria: "bebida", desc: "Sem açúcar, sabor original geladíssimo.", preco: 6, img: "./img/combo-calabresa-guarana.webp" },
    { id: "guarana-1l", nome: "Guaraná Antarctica 1 Litro", categoria: "bebida", desc: "Garrafa de 1 litro bem gelada.", preco: 10, img: "./img/combo-calabresa-guarana.webp" },
    { id: "coca-1l", nome: "Coca-Cola 1 Litro", categoria: "bebida", desc: "Garrafa de 1 litro bem gelada.", preco: 10, img: "./img/combo-calabresa-guarana.webp" },
    { id: "agua-gas", nome: "Água Mineral com Gás 500ml", categoria: "bebida", desc: "Água fresca e gaseificada.", preco: 5, img: "./img/combo-calabresa-guarana.webp" },
    { id: "agua", nome: "Água Mineral Natural 500ml", categoria: "bebida", desc: "Água pura mineral gelada.", preco: 4, img: "./img/combo-calabresa-guarana.webp" }
  ];

  // --- Cart State (localStorage sync) ---
  const CART_KEY = "palazzo:carrinho:v2";
  let cart = [];

  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      cart = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(cart)) cart = [];
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
    renderCart();
  }

  function formatBRL(val) {
    return Number(val || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function findSaborByTitle(title) {
    const slug = slugify(title);
    return SABORES.find(s => slugify(s.nome) === slug || slug.includes(slugify(s.nome)) || slugify(s.nome).includes(slug));
  }

  // --- Store Hours Calculator ---
  function getStoreStatus() {
    const now = new Date();
    const day = now.getDay();
    const curMin = now.getHours() * 60 + now.getMinutes();

    const todaySlots = LOJA.horarios[day] || [];
    for (const [start, end] of todaySlots) {
      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);
      const sMin = sh * 60 + sm;
      const eMin = eh * 60 + em;
      if (curMin >= sMin && curMin < eMin) {
        return { open: true, text: `Aberto agora · Fecha às ${end}` };
      }
    }

    for (const [start] of todaySlots) {
      const [sh, sm] = start.split(":").map(Number);
      if (curMin < sh * 60 + sm) {
        return { open: false, text: `Fechado · Abre hoje às ${start}` };
      }
    }

    return { open: false, text: "Fechado · Abre amanhã às 15:00" };
  }

  function updateStatusBadges() {
    const status = getStoreStatus();
    const heroBadge = document.getElementById("hero-status-text");
    const headerBadge = document.getElementById("header-status-text");

    if (heroBadge) heroBadge.textContent = status.text;
    if (headerBadge) headerBadge.textContent = status.open ? "Aberto agora" : "Fechado agora";
  }

  // --- Toast Notice ---
  function showToast(msg) {
    let toast = document.getElementById("palazzo-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "palazzo-toast";
      toast.className = "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-basilico-noite px-6 py-3 font-semibold text-farinha shadow-2xl transition-all duration-300 opacity-0 pointer-events-none";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 0)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 20px)";
    }, 2500);
  }

  // --- Cart Drawer Render & Management ---
  function renderCart() {
    const countEl = document.getElementById("cart-count-badge");
    const floatingCountEl = document.getElementById("floating-cart-count");
    const floatingTotalEl = document.getElementById("floating-cart-total");
    const floatingBtn = document.getElementById("floating-cart-btn");
    const listEl = document.getElementById("cart-drawer-items");
    const subtotalEl = document.getElementById("cart-drawer-subtotal");
    const totalEl = document.getElementById("cart-drawer-total");
    const deliveryEl = document.getElementById("cart-drawer-delivery");

    const totalItems = cart.reduce((acc, it) => acc + (it.qty || 1), 0);
    const subtotal = cart.reduce((acc, it) => acc + (it.price * (it.qty || 1)), 0);

    if (countEl) {
      countEl.textContent = totalItems;
      countEl.style.display = totalItems > 0 ? "grid" : "none";
    }

    if (floatingBtn) {
      floatingBtn.style.display = totalItems > 0 ? "flex" : "none";
      if (floatingCountEl) floatingCountEl.textContent = `${totalItems} item${totalItems > 1 ? "s" : ""}`;
      if (floatingTotalEl) floatingTotalEl.textContent = formatBRL(subtotal);
    }

    if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);

    const deliveryMode = document.querySelector('input[name="modo-entrega"]:checked')?.value || "entrega";
    const taxaEntrega = deliveryMode === "entrega" ? 5.00 : 0.00;

    if (deliveryEl) deliveryEl.textContent = deliveryMode === "entrega" ? formatBRL(taxaEntrega) : "Grátis (Balcão)";
    if (totalEl) totalEl.textContent = formatBRL(subtotal + taxaEntrega);

    if (listEl) {
      if (cart.length === 0) {
        listEl.innerHTML = `
          <div class="py-16 text-center text-torra/70">
            <span class="text-4xl">🍕</span>
            <p class="mt-3 font-display text-lg font-semibold text-basilico">Seu pedido está vazio</p>
            <p class="mt-1 text-sm text-cinza">Escolha suas pizzas favoritas no cardápio e adicione aqui!</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = cart.map((it, idx) => `
        <div class="flex items-center gap-3 border-b border-linha/70 py-3.5">
          <div class="relative size-16 shrink-0 overflow-hidden rounded-xl bg-trigo-claro">
            <img src="${it.img || './img/cardapio/mussarela.webp'}" alt="${it.title}" class="size-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-display font-semibold text-basilico leading-tight truncate">${it.title}</h4>
            <p class="text-xs text-cinza truncate">${it.detail || ''}</p>
            <p class="text-xs font-semibold text-torra mt-1">${formatBRL(it.price * (it.qty || 1))}</p>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" class="btn-qty-minus size-7 grid place-items-center rounded-full bg-trigo hover:bg-linha text-torra font-bold" data-idx="${idx}">-</button>
            <span class="w-5 text-center text-sm font-semibold text-torra tabular-nums">${it.qty || 1}</span>
            <button type="button" class="btn-qty-plus size-7 grid place-items-center rounded-full bg-trigo hover:bg-linha text-torra font-bold" data-idx="${idx}">+</button>
            <button type="button" class="btn-item-remove ml-1 text-red-500 hover:text-red-700 p-1 font-bold" data-idx="${idx}" title="Remover">✕</button>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.btn-qty-minus').forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.dataset.idx, 10);
          if (cart[idx].qty > 1) {
            cart[idx].qty--;
          } else {
            cart.splice(idx, 1);
          }
          saveCart();
        });
      });

      listEl.querySelectorAll('.btn-qty-plus').forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.dataset.idx, 10);
          cart[idx].qty = (cart[idx].qty || 1) + 1;
          saveCart();
        });
      });

      listEl.querySelectorAll('.btn-item-remove').forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.dataset.idx, 10);
          cart.splice(idx, 1);
          saveCart();
        });
      });
    }
  }

  function openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (!drawer) return;
    drawer.classList.remove("translate-x-full");
    if (backdrop) backdrop.classList.remove("opacity-0", "pointer-events-none");
    renderCart();
  }

  function closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (!drawer) return;
    drawer.classList.add("translate-x-full");
    if (backdrop) backdrop.classList.add("opacity-0", "pointer-events-none");
  }

  // --- Pizza Builder Modal (Montador Meio a Meio) ---
  let activeBuilderSabor = null;

  function openPizzaModal(saborId) {
    const modal = document.getElementById("pizza-builder-modal");
    if (!modal) return;
    activeBuilderSabor = SABORES.find(s => s.id === saborId) || SABORES[0];

    const s1Select = document.getElementById("modal-sabor-1");
    const s2Select = document.getElementById("modal-sabor-2");
    const previewImg = document.getElementById("modal-pizza-img");

    if (s1Select) {
      s1Select.innerHTML = SABORES.filter(s => s.g).map(s => `
        <option value="${s.id}" ${s.id === activeBuilderSabor.id ? 'selected' : ''}>${s.nome} (Metade: ${formatBRL(s.meia)})</option>
      `).join('');
    }

    if (s2Select) {
      s2Select.innerHTML = `
        <option value="">Nenhum (Pizza Inteira de 1 sabor)</option>
        ${SABORES.filter(s => s.g).map(s => `
          <option value="${s.id}">${s.nome} (Metade: ${formatBRL(s.meia)})</option>
        `).join('')}
      `;
    }

    if (previewImg) previewImg.src = activeBuilderSabor.img;

    updateBuilderPrice();
    modal.classList.remove("hidden");
  }

  function closePizzaModal() {
    const modal = document.getElementById("pizza-builder-modal");
    if (modal) modal.classList.add("hidden");
  }

  function updateBuilderPrice() {
    const tamanho = document.querySelector('input[name="modal-tamanho"]:checked')?.value || "g";
    const s1Id = document.getElementById("modal-sabor-1")?.value;
    const s2Id = document.getElementById("modal-sabor-2")?.value;
    const borda = document.getElementById("modal-borda")?.value || "nenhuma";
    const priceEl = document.getElementById("modal-calculated-price");
    const s2Container = document.getElementById("modal-sabor-2-container");

    const s1 = SABORES.find(s => s.id === s1Id) || activeBuilderSabor;
    const s2 = s2Id ? SABORES.find(s => s.id === s2Id) : null;

    if (s2Container) {
      s2Container.style.display = tamanho === "g" ? "block" : "none";
    }

    let total = 0;
    if (tamanho === "p") {
      total = s1.p || 28;
    } else {
      if (s2) {
        total = (s1.meia || 25) + (s2.meia || 25);
      } else {
        total = s1.g || 50;
      }
    }

    if (borda === "catupiry") total += 8;
    if (borda === "cheddar") total += 8;
    if (borda === "vulcao") total += 12;

    if (priceEl) priceEl.textContent = formatBRL(total);
    return total;
  }

  function confirmPizzaAdd() {
    const tamanho = document.querySelector('input[name="modal-tamanho"]:checked')?.value || "g";
    const s1Id = document.getElementById("modal-sabor-1")?.value;
    const s2Id = document.getElementById("modal-sabor-2")?.value;
    const bordaVal = document.getElementById("modal-borda")?.value || "nenhuma";
    const obs = document.getElementById("modal-obs")?.value || "";

    const s1 = SABORES.find(s => s.id === s1Id) || activeBuilderSabor;
    const s2 = (tamanho === "g" && s2Id) ? SABORES.find(s => s.id === s2Id) : null;

    let title = "";
    let detail = tamanho === "g" ? "Pizza Grande" : "Pizza Pequena (4 fatias)";

    if (s2) {
      title = `1/2 ${s1.nome} + 1/2 ${s2.nome}`;
    } else {
      title = `Pizza ${s1.nome}`;
    }

    const bordaText = {
      nenhuma: "Sem borda recheada",
      catupiry: "Borda Catupiry (+R$ 8,00)",
      cheddar: "Borda Cheddar (+R$ 8,00)",
      vulcao: "Borda Vulcão (+R$ 12,00)"
    }[bordaVal];

    if (bordaVal !== "nenhuma") detail += ` · ${bordaText}`;
    if (obs.trim()) detail += ` · Obs: ${obs.trim()}`;

    const price = updateBuilderPrice();

    cart.push({
      id: `pizza-${Date.now()}`,
      title,
      detail,
      price,
      qty: 1,
      img: s1.img
    });

    saveCart();
    closePizzaModal();
    openCartDrawer();
    showToast(`✓ ${title} adicionada ao pedido!`);
  }

  // --- Send WhatsApp Order ---
  function sendWhatsAppOrder() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio. Adicione pelo menos um item.");
      return;
    }

    const nome = document.getElementById("input-nome")?.value.trim() || "";
    const tel = document.getElementById("input-tel")?.value.trim() || "";
    const modo = document.querySelector('input[name="modo-entrega"]:checked')?.value || "entrega";
    const rua = document.getElementById("input-rua")?.value.trim() || "";
    const num = document.getElementById("input-num")?.value.trim() || "";
    const bairro = document.getElementById("input-bairro")?.value.trim() || "";
    const comp = document.getElementById("input-comp")?.value.trim() || "";
    const pagto = document.getElementById("select-pagto")?.value || "Pix";
    const troco = document.getElementById("input-troco")?.value.trim() || "";
    const obsGeral = document.getElementById("input-obs-geral")?.value.trim() || "";

    if (!nome) {
      alert("Por favor, digite o seu nome para o pedido.");
      document.getElementById("input-nome")?.focus();
      return;
    }

    if (modo === "entrega" && (!rua || !num || !bairro)) {
      alert("Por favor, preencha o seu endereço de entrega (Rua, Número e Bairro).");
      return;
    }

    const subtotal = cart.reduce((acc, it) => acc + (it.price * (it.qty || 1)), 0);
    const taxa = modo === "entrega" ? 5.00 : 0.00;
    const total = subtotal + taxa;

    let msg = `*🍕 NOVO PEDIDO - ${LOJA.nome.toUpperCase()}*\n`;
    msg += `------------------------------------\n`;
    msg += `*Cliente:* ${nome}\n`;
    if (tel) msg += `*WhatsApp:* ${tel}\n`;
    msg += `*Modalidade:* ${modo === "entrega" ? "🛵 Entrega em domicílio" : "🛍️ Retirada no balcão"}\n`;

    if (modo === "entrega") {
      msg += `*Endereço:* ${rua}, nº ${num} - ${bairro}\n`;
      if (comp) msg += `*Complemento:* ${comp}\n`;
    }

    msg += `\n*📋 ITENS DO PEDIDO:*\n`;
    cart.forEach((it, i) => {
      msg += `${i + 1}. *${it.qty || 1}x ${it.title}* - ${formatBRL(it.price * (it.qty || 1))}\n`;
      if (it.detail) msg += `   ↳ _${it.detail}_\n`;
    });

    msg += `\n------------------------------------\n`;
    msg += `*Subtotal:* ${formatBRL(subtotal)}\n`;
    msg += `*Taxa de entrega:* ${modo === "entrega" ? formatBRL(taxa) : "Grátis"}\n`;
    msg += `*TOTAL A PAGAR:* *${formatBRL(total)}*\n`;
    msg += `------------------------------------\n`;
    msg += `*Forma de pagamento:* ${pagto}`;
    if (pagto === "Dinheiro" && troco) msg += ` (Troco para ${troco})`;
    msg += `\n`;

    if (obsGeral) msg += `*Observações do pedido:* ${obsGeral}\n`;

    msg += `\n_Aguardando confirmação do pedido pela pizzaria._`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${LOJA.whatsapp}?text=${encoded}`;
    window.open(waUrl, "_blank");
  }

  // --- Category Tabs Switching ---
  function initCategoryTabs() {
    const tabBtns = document.querySelectorAll('[role="tablist"] button[role="tab"]');
    const items = document.querySelectorAll('#cardapio li');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.setAttribute('aria-selected', 'false');
          b.className = 'rounded-full px-5 py-2.5 font-semibold whitespace-nowrap transition-colors text-torra/75 hover:bg-trigo hover:text-basilico';
        });

        btn.setAttribute('aria-selected', 'true');
        btn.className = 'rounded-full px-5 py-2.5 font-semibold whitespace-nowrap transition-colors bg-basilico text-farinha';

        const cat = btn.textContent.trim().toLowerCase();
        items.forEach(li => {
          const title = li.querySelector('h3')?.textContent?.trim() || '';
          const sabor = findSaborByTitle(title);
          const itemCat = sabor?.categoria?.toLowerCase() || 'tradicional';

          if (cat.includes("tradicionais") && itemCat === "tradicional") {
            li.style.display = "";
          } else if (cat.includes("especiais") && itemCat === "especial") {
            li.style.display = "";
          } else if (cat.includes("doces premium") && itemCat === "doce-premium") {
            li.style.display = "";
          } else if (cat === "doces" && itemCat === "doce") {
            li.style.display = "";
          } else if (cat.includes("premium") && !cat.includes("doces") && itemCat === "premium") {
            li.style.display = "";
          } else if (cat.includes("bebidas") && itemCat === "bebida") {
            li.style.display = "";
          } else {
            // Check if card matches category
            li.style.display = "none";
          }
        });
      });
    });
  }

  // --- Wire Card Clicks ---
  function initCardClicks() {
    document.querySelectorAll('#cardapio article').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const sabor = findSaborByTitle(title);

      // Buttons inside card
      card.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (sabor) {
            openPizzaModal(sabor.id);
          } else {
            // Generic product
            cart.push({
              id: `prod-${Date.now()}`,
              title: title || 'Pizza Artesanal',
              detail: 'Pizza Grande',
              price: 50,
              qty: 1,
              img: card.querySelector('img')?.src || './img/cardapio/mussarela.webp'
            });
            saveCart();
            openCartDrawer();
            showToast(`✓ ${title} adicionada ao pedido!`);
          }
        });
      });
    });
  }

  // --- Global Initializer ---
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateStatusBadges();
    setInterval(updateStatusBadges, 60000);

    // Cart open/close triggers
    document.querySelectorAll('.btn-open-cart, [aria-label="Ver pedido"]').forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
      });
    });

    document.getElementById('cart-drawer-close')?.addEventListener('click', closeCartDrawer);
    document.getElementById('cart-backdrop')?.addEventListener('click', closeCartDrawer);

    // Builder modal
    document.getElementById('modal-close-btn')?.addEventListener('click', closePizzaModal);
    document.getElementById('modal-cancel-btn')?.addEventListener('click', closePizzaModal);
    document.getElementById('modal-confirm-add-btn')?.addEventListener('click', confirmPizzaAdd);
    document.getElementById('modal-sabor-1')?.addEventListener('change', updateBuilderPrice);
    document.getElementById('modal-sabor-2')?.addEventListener('change', updateBuilderPrice);
    document.getElementById('modal-borda')?.addEventListener('change', updateBuilderPrice);
    document.querySelectorAll('input[name="modal-tamanho"]').forEach(r => {
      r.addEventListener('change', updateBuilderPrice);
    });

    // Mobile nav toggle
    const mobileMenuBtn = document.querySelector('button[aria-controls="menu-celular"]');
    const mobileNav = document.getElementById('menu-celular');
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileNav.classList.contains('hidden');
        if (isHidden) {
          mobileNav.classList.remove('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
          mobileNav.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Checkout button
    document.getElementById('btn-finalizar-pedido')?.addEventListener('click', sendWhatsAppOrder);

    // Delivery mode radio change
    document.querySelectorAll('input[name="modo-entrega"]').forEach(r => {
      r.addEventListener('change', () => {
        const fields = document.getElementById('endereco-fields');
        if (fields) {
          fields.style.display = r.value === 'entrega' ? 'block' : 'none';
        }
        renderCart();
      });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="/#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const hash = a.getAttribute('href').replace('/#', '#');
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          if (mobileNav) mobileNav.classList.add('hidden');
        }
      });
    });

    initCategoryTabs();
    initCardClicks();
    renderCart();
  });

  // Export functions to window for direct HTML onclick hooks
  window.openPizzaModal = openPizzaModal;
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.sendWhatsAppOrder = sendWhatsAppOrder;

})();
