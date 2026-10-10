(function () {
  "use strict";
  var D = window.PORTFOLIO;

  var UI = {
    it: {
      skip: "Vai al contenuto",
      navLabel: "Sezioni", langLabel: "Lingua",
      navProjects: "Progetti", navDegree: "Laurea", navContact: "Contatti",
      routeTitle: "Percorso professionale",
      strengthsTitle: "Cosa porto in un team",
      pipelineTitle: "Come funziona",
      resultsTitle: "Risultati sullo stesso set di validazione",
      colModel: "Modello", colAccuracy: "Accuratezza", colF1: "Macro F1", colLatency: "Latenza media",
      errorsTitle: "Dove sbaglia",
      whyTitle: "Perché conta",
      otherProjects: "Altri progetti",
      degreeTitle: "Percorso di laurea",
      nextTitle: "Terzo anno, da sostenere",
      contactTitle: "Contatti",
      code: "Codice", cv: "CV (PDF)",
      credits: function (d, t, pct) { return "<strong>" + d + " crediti su " + t + "</strong> completati (" + pct + "%)"; },
      average: function (m) { return "Media ponderata <strong>" + m + "/100</strong>"; },
      fiberLabel: function (d, t) { return d + " crediti ECTS conseguiti su " + t; },
      remaining: "Da sostenere",
      ects: "ECTS", grade: "voto",
      compulsory: "obbligatorio",
      exam: { progetto: "Progetto e colloquio", scritto: "Prova scritta", scrittoColloquio: "Scritto e colloquio", test: "Test a risposta multipla" },
      programLabel: "Programma",
      updated: function (d) { return "Aggiornato il " + d; },
      locale: "it-IT"
    },
    en: {
      skip: "Skip to content",
      navLabel: "Sections", langLabel: "Language",
      navProjects: "Projects", navDegree: "Degree", navContact: "Contact",
      routeTitle: "Career path",
      strengthsTitle: "What I bring to a team",
      pipelineTitle: "How it works",
      resultsTitle: "Results on the same validation set",
      colModel: "Model", colAccuracy: "Accuracy", colF1: "Macro F1", colLatency: "Avg latency",
      errorsTitle: "Where it fails",
      whyTitle: "Why it matters",
      otherProjects: "Other projects",
      degreeTitle: "Degree",
      nextTitle: "Year three, still to take",
      contactTitle: "Contact",
      code: "Code", cv: "CV (PDF, Italian)",
      credits: function (d, t, pct) { return "<strong>" + d + " of " + t + " credits</strong> completed (" + pct + "%)"; },
      average: function (m) { return "Weighted average <strong>" + m + "/100</strong>"; },
      fiberLabel: function (d, t) { return d + " of " + t + " ECTS credits earned"; },
      remaining: "Still to take",
      ects: "ECTS", grade: "grade",
      compulsory: "compulsory",
      exam: { progetto: "Project and interview", scritto: "Written exam", scrittoColloquio: "Written exam and interview", test: "Multiple-choice test" },
      programLabel: "Syllabus",
      updated: function (d) { return "Last updated " + d; },
      locale: "en-GB"
    }
  };

  var lang = pickLanguage();

  function pickLanguage() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "it" || fromUrl === "en") return fromUrl;
    try {
      var saved = window.localStorage.getItem("portfolio-lang");
      if (saved === "it" || saved === "en") return saved;
    } catch (e) { /* storage not available */ }
    return "it";
  }

  function t(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] != null ? value[lang] : value.it;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function num(n, digits) {
    return n.toLocaleString(UI[lang].locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function $(id) { return document.getElementById(id); }

  function linkRow() {
    var c = D.contatti, u = UI[lang];
    return [
      '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>",
      '<a href="' + esc(c.linkedin) + '" rel="noopener">LinkedIn</a>',
      '<a href="' + esc(c.github) + '" rel="noopener">GitHub</a>',
      '<a href="' + esc(c.cv) + '" download>' + u.cv + "</a>"
    ].join("");
  }

  function render() {
    var u = UI[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-t]").forEach(function (el) {
      el.textContent = u[el.getAttribute("data-t")];
    });
    document.querySelectorAll("[data-t-aria]").forEach(function (el) {
      el.setAttribute("aria-label", u[el.getAttribute("data-t-aria")]);
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    $("ruolo").textContent = t(D.ruolo);
    $("presentazione").textContent = t(D.presentazione);
    $("link-hero").innerHTML = linkRow();
    $("link-footer").innerHTML = linkRow();

    $("percorso").innerHTML = D.percorso.map(function (p, i) {
      var last = i === D.percorso.length - 1;
      var current = !p.futuro && (last || D.percorso[i + 1].futuro);
      var cls = "route__stop" + (p.futuro ? " is-future" : "") + (current ? " is-current" : "");
      return '<li class="' + cls + '"' + (current ? ' aria-current="step"' : "") + ">" +
        '<span class="route__node" aria-hidden="true"></span>' +
        '<span class="route__year">' + esc(p.anno) + "</span>" +
        '<span class="route__title">' + esc(t(p.titolo)) + "</span>" +
        '<span class="route__desc">' + esc(t(p)) + "</span></li>";
    }).join("");

    $("punti-forza").innerHTML = D.puntiForza.map(function (p) {
      return "<div><dt>" + esc(t(p.titolo)) + "</dt><dd>" + esc(t(p)) + "</dd></div>";
    }).join("");

    var P = D.progettoPrincipale;
    $("progetto-titolo").textContent = t(P.titolo);
    $("progetto-intro").textContent = t(P.intro);
    $("pipeline").innerHTML = P.passi.map(function (s) {
      return "<li><span class=\"pipeline__name\">" + esc(t(s)) + "</span><span class=\"pipeline__det\">" + esc(s.det) + "</span></li>";
    }).join("");
    $("risultati").innerHTML = P.risultati.map(function (r) {
      return "<tr" + (r.migliore ? ' class="is-best"' : "") + '><th scope="row">' + esc(t(r.modello)) + "</th>" +
        '<td class="num" data-label="' + u.colAccuracy + '">' + localNumber(r.accuratezza) + '</td><td class="num" data-label="' + u.colF1 + '">' + localNumber(r.f1) +
        '</td><td class="num" data-label="' + u.colLatency + '">' + esc(t(r.latenza)) + "</td></tr>";
    }).join("");
    $("dataset").textContent = t(P.dataset);
    $("errori").innerHTML = P.errori.map(function (e) { return "<li>" + esc(t(e)) + "</li>"; }).join("");
    $("perche").textContent = t(P.perche);
    $("progetto-link").innerHTML = '<span class="repo-links__label">' + u.code + ":</span> " + P.link.map(function (l) {
      return '<a href="' + esc(l.url) + '" rel="noopener">' + esc(t(l)) + "</a>";
    }).join("");

    $("altri-progetti").innerHTML = D.altriProgetti.map(function (p) {
      return '<article class="other"><h4><a href="' + esc(p.url) + '" rel="noopener">' + esc(t(p.titolo)) + "</a></h4><p>" + esc(t(p.testo)) + "</p></article>";
    }).join("");

    renderDegree(u);

    var d = new Date(D.aggiornato + "T12:00:00");
    $("aggiornato").textContent = u.updated(d.toLocaleDateString(u.locale, { day: "numeric", month: "long", year: "numeric" }));
  }

  // Data values are written Italian-style ("78,9%"); English swaps the decimal comma.
  function localNumber(s) {
    return esc(lang === "en" ? s.replace(",", ".") : s);
  }

  function renderDegree(u) {
    var L = D.laurea, total = L.creditiTotali;
    var done = 0, weighted = 0, byArea = {};
    D.esami.forEach(function (e) {
      done += e.ects;
      weighted += e.ects * e.voto;
      byArea[e.area] = (byArea[e.area] || 0) + e.ects;
    });
    var avg = done ? weighted / done : 0;
    var pct = Math.round((done / total) * 1000) / 10;

    $("laurea-nome").innerHTML = esc(t(L.nome)) + "<br><span class=\"muted\">" + esc(L.ateneo) + " · " + esc(t(L.dettaglio)) + "</span>";
    $("crediti-sintesi").innerHTML = "<span>" + u.credits(done, total, num(pct, pct % 1 ? 1 : 0)) + "</span>" +
      (D.mostraVoti ? "<span>" + u.average(num(avg, 1)) + "</span>" : "");

    var order = Object.keys(D.aree);
    var sorted = D.esami.slice().sort(function (a, b) {
      return order.indexOf(a.area) - order.indexOf(b.area) || b.voto - a.voto;
    });

    var fiber = $("fibra");
    fiber.setAttribute("aria-label", u.fiberLabel(done, total));
    fiber.innerHTML = sorted.map(function (e) {
      return '<span style="flex-grow:' + e.ects + ";background:" + D.aree[e.area].colore + '" title="' + esc(e.nome) + " · " + e.ects + ' ECTS"></span>';
    }).join("") + '<span class="fiber__rest" style="flex-grow:' + (total - done) + '" title="' + esc(u.remaining) + '"></span>';

    $("legenda").innerHTML = order.map(function (k) {
      return '<li><span class="dot" style="background:' + D.aree[k].colore + '"></span>' + esc(t(D.aree[k])) + ' <span class="muted">' + (byArea[k] || 0) + " ECTS</span></li>";
    }).join("") + '<li><span class="dot dot--rest"></span>' + esc(u.remaining) + ' <span class="muted">' + (total - done) + " ECTS</span></li>";

    $("aree").innerHTML = order.map(function (k) {
      var list = sorted.filter(function (e) { return e.area === k; });
      if (!list.length) return "";
      return '<section class="area" style="--area:' + D.aree[k].colore + '"><h3><span class="dot"></span>' + esc(t(D.aree[k])) + "</h3>" +
        '<ul class="courses">' + list.map(function (e) {
          return "<li><details><summary>" +
            '<span class="course__name">' + esc(e.nome) + "</span>" +
            '<span class="course__meta">' + e.ects + " ECTS" +
            (D.mostraVoti ? '<span class="course__grade" aria-label="' + u.grade + " " + e.voto + '/100">' + e.voto + "</span>" : "") +
            "</span></summary>" +
            '<div class="course__body"><p class="muted">' + esc(u.exam[e.prova] || "") + "</p>" +
            "<p><span class=\"visually-hidden\">" + u.programLabel + ": </span>" + e.programma.map(esc).join(" · ") + "</p></div>" +
            "</details></li>";
        }).join("") + "</ul></section>";
    }).join("");

    $("da-sostenere").innerHTML = D.daSostenere.map(function (e) {
      return "<li><span>" + esc(t(e.nome)) + (e.obbligatorio ? ' <span class="muted">(' + u.compulsory + ")</span>" : "") + "</span><span class=\"muted\">" + e.ects + " ECTS</span></li>";
    }).join("");
  }

  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      try { window.localStorage.setItem("portfolio-lang", lang); } catch (e) { /* ignore */ }
      render();
    });
  });

  render();
})();
