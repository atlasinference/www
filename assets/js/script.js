// Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Theme toggle (light <-> dark)
    const key = "atlasinference_theme";
    const root = document.documentElement;
    const btn = document.getElementById("themeBtn");

    function setTheme(t){
      if (t === "dark") root.setAttribute("data-theme","dark");
      else root.removeAttribute("data-theme");
      localStorage.setItem(key, t);
    }

    const saved = localStorage.getItem(key);
    if (saved) setTheme(saved);

    if (btn) btn.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      });
    });

    // Rail nav active state
    const railLinks = Array.from(document.querySelectorAll(".rail-nav a"));
    const sections = railLinks
      .map(l => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const id = "#" + visible.target.id;
      railLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === id));
    }, { threshold: [0.22, 0.36, 0.55] });

    sections.forEach(s => io.observe(s));

    // Interactive "System map"
    const nodes = Array.from(document.querySelectorAll(".node"));
    const diagram = document.getElementById("diagram");

    function clearActive(){
      nodes.forEach(n => n.classList.remove("active"));
      if (diagram) diagram.style.borderColor = "var(--line2)";
    }

    function activate(node){
      clearActive();
      node.classList.add("active");

      const key = node.dataset.focus;
      const color = ({
        inference: "var(--accent)",
        evaluation: "var(--accent2)",
        registry: "var(--accent3)",
        deployment: "color-mix(in srgb, var(--accent) 55%, var(--accent2))"
      })[key] || "var(--accent)";

      if (diagram) diagram.style.borderColor = `color-mix(in srgb, ${color} 55%, var(--line2))`;

      // subtle site-wide emphasis shift via CSS vars (optional)
      document.documentElement.style.setProperty("--accent", getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
    }

    nodes.forEach(n => n.addEventListener("click", () => activate(n)));

    // Start with one active node for personality
    if (nodes.length) activate(nodes[0]);