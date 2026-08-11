'use strict';

const Render = (() => {
  // Escape HTML special chars to prevent XSS and render text safely.
  const esc = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Escape for embedding inside an HTML attribute that holds JSON or JS strings.
  const attr = esc;

  // Inline SVG icons (Lucide-compatible stroke icons).
  const ICON_PATHS = {
    cloud: 'M17.5 19a4.5 4.5 0 0 0 0-9h-1.8A7 7 0 1 0 4.3 16.8',
    award: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm-1-3 1-2 1 2 2 .5-1.5 1.5.4 2L12 14l-1.9 1 .4-2L9 12.5z',
    terminal: 'M4 17l6-6-6-6m8 12h8',
    bot: 'M12 8V4m0 4a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4zm-4 7H4a1 1 0 0 1 0-2h4m8 2h4a1 1 0 0 0 0-2h-4M8 7H4a1 1 0 0 0 0 2h4m8-2h4a1 1 0 0 1 0 2h-4',
    'check-circle': 'M22 11.1V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
    'check-circle-2': 'M9 12l2 2 4-4m5.6-1.6A9 9 0 1 1 7.6 2.4a9 9 0 0 1 12 0z',
    'bar-chart': 'M12 20V10m-6 10V4m12 16v-7',
    'layout-dashboard': 'M4 3h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm10 0h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM4 13h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm10 0h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5',
    'book-open': 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
    layers: 'm12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    sparkles: 'M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.4l-1.9-5.8L4 10.7l6.1-1.9L12 3zM19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z',
    building: 'M3 21h18M5 21V7l7-4v18m-7-5h7m4-1h4v6h-4M9 9h.01M9 13h.01M13 9h.01M13 13h.01',
    'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
    circle: 'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0',
    copy: 'M8 8h12v12H8zM4 16V4h12',
    check: 'M20 6 9 17l-5-5',
    'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 0v6h6M8 13h8M8 17h6M8 9h2',
    'alert-triangle': 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01',
    'x-circle': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-4-14 8 8m0-8-8 8',
    'help-circle': 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'refresh-cw': 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    rotate: 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l2.5 2.5',
    'chevron-right': 'm9 18 6-6-6-6',
    lock: 'M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm2 0V7a5 5 0 0 1 10 0v4',
    search: 'M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z',
    'user-check': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m8-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm9 3 2 2 4-4',
    'user-plus': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m8-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7-3v6m3-3h-6',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
    trash: 'M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    'plus-circle': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v8m-4-4h8',
    play: 'M5 3l14 9-14 9V3z',
    cpu: 'M9 9h6v6H9zM5 9a2 2 0 0 1-2 2m0 2a2 2 0 0 1 2 2m14-6a2 2 0 0 0 2-2m0-2a2 2 0 0 0-2-2M5 15a2 2 0 0 1-2 2m0 2a2 2 0 0 0 2 2m14-6a2 2 0 0 0 2 2m0 2a2 2 0 0 1-2 2M9 5V3m6 2V3m-6 16v2m6-2v2M9 3h6m0 18h-6',
    container: 'M20 6 12 2 4 6m0 0v12l8 4 8-4V6m0 0-8 4m0 0v12M4 6l8 4',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-10-10h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z',
    zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    code: 'm16 18 6-6-6-6m-8 0L2 12l6 6',
    loader: 'M21 12a9 9 0 1 1-6.219-8.56',
    send: 'm22 2-7 20-4-9-9-4 20-7z',
    x: 'M18 6 6 18M6 6l12 12',
  };

  // Build an inline SVG HTML string (for template rendering).
  const iconStr = (name, size) => {
    const s = size || 20;
    const path = ICON_PATHS[name] || ICON_PATHS['circle'];
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + path + '"/></svg>';
  };

  // Build an inline SVG element string.
  const icon = (name, size) => {
    const s = size || 20;
    const path = ICON_PATHS[name] || ICON_PATHS['circle'];
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', String(s));
    svg.setAttribute('height', String(s));
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', path);
    svg.appendChild(p);
    return svg;
  };

  // Escape a string for use inside double-quoted HTML attribute (JS-escaped).
  const attrQuote = (str) => esc(str).replace(/"/g, '&quot;');

  return {
    esc,
    attr,
    attrQuote,
    icon,
    iconStr,
  };
})();

if (typeof window !== 'undefined') {
  window.Render = Render;
}
