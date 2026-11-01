/* =====================================================
   Meth Suites – Google Analytics 4 with cookie consent
   Used by every page:  <script src="/analytics.js" defer></script>
   - Analytics loads ONLY after the visitor taps "Accept".
   - Booking details (name, phone, email, dates) are NEVER sent to Google.
   - Contact buttons send a clean "generate_lead" event (channel + language only).
   ===================================================== */
(function () {
  var GA_ID = "G-WZZFJMG76Z";
  var KEY = "meth-consent";          // saved choice: "granted" or "denied"
  var loaded = false;

  var TXT = {
    en: { msg: "We use Google Analytics cookies to understand how visitors use our website. Your booking details are never sent to Google.", ok: "Accept", no: "Decline", more: "Privacy policy" },
    si: { msg: "අපගේ වෙබ් අඩවිය අමුත්තන් භාවිත කරන ආකාරය තේරුම් ගැනීමට අපි Google Analytics කුකී භාවිත කරමු. ඔබගේ වෙන්කිරීමේ විස්තර කිසිවිටෙක Google වෙත යවනු නොලැබේ.", ok: "එකඟයි", no: "එපා", more: "රහස්‍යතා ප්‍රතිපත්තිය" },
    ta: { msg: "எங்கள் இணையதளத்தை பார்வையாளர்கள் எவ்வாறு பயன்படுத்துகிறார்கள் என்பதை அறிய Google Analytics குக்கீகளைப் பயன்படுத்துகிறோம். உங்கள் முன்பதிவு விவரங்கள் ஒருபோதும் Google-க்கு அனுப்பப்படாது.", ok: "ஏற்கிறேன்", no: "வேண்டாம்", more: "தனியுரிமைக் கொள்கை" },
    hi: { msg: "हम यह समझने के लिए Google Analytics कुकीज़ का उपयोग करते हैं कि आगंतुक हमारी वेबसाइट का उपयोग कैसे करते हैं। आपकी बुकिंग की जानकारी कभी Google को नहीं भेजी जाती।", ok: "स्वीकार करें", no: "अस्वीकार करें", more: "गोपनीयता नीति" },
    ru: { msg: "Мы используем файлы cookie Google Analytics, чтобы понимать, как посетители пользуются сайтом. Данные вашего бронирования никогда не передаются в Google.", ok: "Принять", no: "Отклонить", more: "Политика конфиденциальности" },
    zh: { msg: "我们使用 Google Analytics Cookie 来了解访客如何使用本网站。您的预订信息绝不会发送给 Google。", ok: "接受", no: "拒绝", more: "隐私政策" }
  };

  function getLang() {
    var l = "";
    try { l = localStorage.getItem("meth-lang") || ""; } catch (e) {}
    if (!TXT[l]) l = (document.documentElement.lang || "en").slice(0, 2);
    return TXT[l] ? l : "en";
  }
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ---------- Google Analytics ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function loadGA() {
    if (loaded) return;
    loaded = true;
    window["ga-disable-" + GA_ID] = false;
    gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    gtag("js", new Date());
    gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function removeGA() {
    window["ga-disable-" + GA_ID] = true;
    var host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        ["", "; domain=" + host, "; domain=." + host].forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }

  /* Called by the page's contact buttons. Sends only the channel and language. */
  window.methTrack = function (channel, type) {
    if (!loaded) return;
    gtag("event", "generate_lead", {
      lead_channel: String(channel || "unknown").slice(0, 60),
      lead_type: type || "quick_contact",
      site_language: getLang(),
      page_type: /blog/.test(location.pathname) ? "blog" : (/privacy/.test(location.pathname) ? "privacy" : "home")
    });
  };

  /* ---------- Banner ---------- */
  var box = null;

  function css() {
    if (document.getElementById("mcCss")) return;
    var st = document.createElement("style");
    st.id = "mcCss";
    st.textContent =
      ".mc-box{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:1000;max-width:560px;margin:0 auto;" +
      "background:var(--card,#fff);color:var(--ink,#1D2A2B);border:1px solid var(--line,#D5DEDA);border-radius:14px;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.18);padding:16px 18px;font:15px/1.5 var(--sans,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif)}" +
      ".mc-box p{margin:0 0 12px}" +
      ".mc-box a{color:var(--lagoon-2,#16656B);text-underline-offset:3px}" +
      ".mc-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px}" +
      ".mc-btn{border:0;border-radius:999px;padding:9px 20px;font:600 15px var(--sans,system-ui,sans-serif);cursor:pointer}" +
      ".mc-ok{background:var(--lagoon,#0E4A4F);color:#fff}" +
      ".mc-no{background:transparent;color:var(--ink,#1D2A2B);border:1px solid var(--line,#D5DEDA)}" +
      ".mc-row a{margin-left:auto;font-size:14px}" +
      "@media (prefers-color-scheme: dark){.mc-ok{background:#3E9096}}";
    document.head.appendChild(st);
  }

  function fill() {
    if (!box) return;
    var t = TXT[getLang()];
    box.querySelector("p").textContent = t.msg;
    box.querySelector(".mc-ok").textContent = t.ok;
    box.querySelector(".mc-no").textContent = t.no;
    box.querySelector("a").textContent = t.more;
  }

  function showBanner() {
    css();
    if (!box) {
      box = document.createElement("div");
      box.className = "mc-box";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-live", "polite");
      box.setAttribute("aria-label", "Cookies");
      box.innerHTML = '<p></p><div class="mc-row"><button type="button" class="mc-btn mc-ok"></button>' +
        '<button type="button" class="mc-btn mc-no"></button><a href="/privacy.html#tools"></a></div>';
      box.querySelector(".mc-ok").addEventListener("click", function () { setChoice("granted"); hide(); loadGA(); });
      box.querySelector(".mc-no").addEventListener("click", function () { setChoice("denied"); hide(); removeGA(); });
      document.body.appendChild(box);
    }
    fill();
    box.hidden = false;
  }
  function hide() { if (box) box.hidden = true; }

  /* The home page calls this when the visitor changes language */
  window.methConsentLang = function () { fill(); };

  /* "Cookie settings" links (any element with data-cookie-settings) */
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-cookie-settings]");
    if (el) { e.preventDefault(); showBanner(); return; }
    var dev = e.target.closest && e.target.closest("a.dev-link");
    if (dev && loaded) gtag("event", "reallanka_click", { page_type: /blog/.test(location.pathname) ? "blog" : "home" });
  });

  /* ---------- Start ---------- */
  function start() {
    var c = getChoice();
    if (c === "granted") loadGA();
    else if (c !== "denied") showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
