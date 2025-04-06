// lamp.js

// Funciones de dibujo para la lámpara steampunk

function dibujarFondoSteampunk(canvas, ctx) {
  // const gradiente = ctx.createLinearGradient(0, 0, 0, canvas.height);
  // gradiente.addColorStop(0, '#000');  // Negro
  // gradiente.addColorStop(1, '#222');  // Gris muy oscuro
  // ctx.fillStyle = gradiente;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.strokeStyle = 'rgba(100,100,100,0.1)';  // Gris tenue
  // ctx.lineWidth = 1;
  // for (let i = 0; i < canvas.width; i += 50) {
  //   ctx.beginPath();
  //   ctx.moveTo(i, 0);
  //   ctx.lineTo(i, canvas.height);
  //   ctx.stroke();
  // }
  // for (let j = 0; j < canvas.height; j += 50) {
  //   ctx.beginPath();
  //   ctx.moveTo(0, j);
  //   ctx.lineTo(canvas.width, j);
  //   ctx.stroke();
  // }
}

function dibujarBaseLampara(ctx, x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);

  // Detalles de la base: bordes biselados
  ctx.strokeStyle = '#777';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 5, y);
  ctx.lineTo(x + ancho - 5, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 5, y + alto);
  ctx.lineTo(x + ancho - 5, y + alto);
  ctx.stroke();

  // Líneas verticales para dar más detalle
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;
  for (let i = x + 10; i < x + ancho - 10; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, y);
    ctx.lineTo(i, y + alto);
    ctx.stroke();
  }
}

function dibujarSoporteLampara(ctx, x, y, alto, anchoBase, anchoSuperior, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + anchoBase, y + alto);
  ctx.lineTo(x + anchoBase - (anchoBase - anchoSuperior) / 2, y + alto);
  ctx.lineTo(x + anchoSuperior / 2, y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1.5;
  const numRemaches = 5;
  const espacioRemaches = alto / (numRemaches + 1);

  for (let i = 1; i <= numRemaches; i++) {
    const yRemache = y + i * espacioRemaches;
    ctx.beginPath();
    ctx.arc(x + anchoBase / 4, yRemache, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
  for (let i = 1; i <= numRemaches; i++) {
    const yRemache = y + i * espacioRemaches;
    ctx.beginPath();
    ctx.arc(x + anchoBase / 4 + anchoSuperior / 2, yRemache, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function dibujarBombilla(ctx, x, y, radio, color) {
  const gradiente = ctx.createRadialGradient(x, y, radio * 0.1, x, y, radio);
  gradiente.addColorStop(0, color);
  gradiente.addColorStop(0.7, 'rgba(255,255,255,0.2)');
  gradiente.addColorStop(1, 'rgba(251, 217, 123, 0.54)'); // Borde transparente
  ctx.fillStyle = gradiente;
  ctx.beginPath();
  ctx.arc(x, y, radio, Math.PI, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - radio / 3, y - radio / 4);
  ctx.lineTo(x + radio / 3, y - radio / 4);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - radio / 4, y - radio / 8);
  ctx.lineTo(x + radio / 4, y - radio / 8);
  ctx.stroke();

  const haloGradiente = ctx.createRadialGradient(x, y, radio, x, y, radio * 2);
  haloGradiente.addColorStop(0, 'rgba(255, 223, 0, 0.8)'); // Amarillo
  haloGradiente.addColorStop(1, 'rgba(255, 223, 0, 0)');    // Transparente
  ctx.fillStyle = haloGradiente;
  ctx.beginPath();
  ctx.arc(x, y, radio * 2, 0, 2 * Math.PI);
  ctx.fill();
}

function dibujarDetallesLaterales(ctx, x, y, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 5, alto);
  ctx.fillRect(x + 15, y, 5, alto);

  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  for (let i = y + 5; i < y + alto - 5; i += 10) {
    ctx.beginPath();
    ctx.moveTo(x, i);
    ctx.lineTo(x + 5, i + 5);
    ctx.stroke();
  }
  for (let i = y + 5; i < y + alto - 5; i += 10) {
    ctx.beginPath();
    ctx.moveTo(x + 15, i);
    ctx.lineTo(x + 20, i + 5);
    ctx.stroke();
  }
}

function dibujarLamparaSteampunk() {
  const canvas = document.getElementById('canvas1');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');

  dibujarFondoSteampunk(canvas, ctx);

  const lamparaX = canvas.width / 2 - 50;
  const lamparaY = canvas.height / 4;
  const anchoBase = 100;
  const altoBase = 30;
  const altoSoporte = 150;
  const anchoBaseSoporte = 80;
  const anchoSuperiorSoporte = 30;
  const radioBombilla = 50;

  dibujarBaseLampara(ctx, lamparaX, lamparaY + altoSoporte, anchoBase, altoBase, '#b8860b');
  dibujarSoporteLampara(ctx, lamparaX + (anchoBase - anchoBaseSoporte) / 2, lamparaY, altoSoporte, anchoBaseSoporte, anchoSuperiorSoporte, '#a0522d');
  dibujarBombilla(ctx, lamparaX + anchoBase / 2, lamparaY, radioBombilla, 'rgba(255, 223, 0, 0.8)');
  dibujarDetallesLaterales(ctx, lamparaX - 20, lamparaY + altoSoporte / 3, altoSoporte / 2, '#777');
  dibujarDetallesLaterales(ctx, lamparaX + anchoBase + 15, lamparaY + altoSoporte / 3, altoSoporte / 2, '#777');
}

document.addEventListener('DOMContentLoaded', dibujarLamparaSteampunk);
