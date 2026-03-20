import { useState } from "react";
import { Menu, X, ArrowRight, CheckCircle2, Play, Star, BarChart3, Briefcase, Layers3, MessageSquare, ShieldCheck, ChevronDown } from "lucide-react";

export default function GrowthMembershipLandingPage() {

  const lifetimePass = {
    name: "WorkingBetter Lifetime Pass",
    price: 150,
    description: "One payment for lifetime access to the full WorkingBetter experience.",
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [checkoutData, setCheckoutData] = useState({
    email: "",
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === lifetimePass.name);
      if (existing) {
        return prev.map((item) =>
          item.name === lifetimePass.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...lifetimePass, quantity: 1 }];
    });
    setCurrentPage("cart");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateQuantity = (nextQuantity) => {
    if (nextQuantity <= 0) {
      setCartItems([]);
      return;
    }
    setCartItems([{ ...lifetimePass, quantity: nextQuantity }]);
  };

  const goHome = () => {
    setCurrentPage("home");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToCart = () => {
    setCurrentPage("cart");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToCheckout = () => {
    if (cartItems.length === 0) {
      handleAddToCart();
      return;
    }
    setCurrentPage("checkout");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrivacy = () => {
    setCurrentPage("privacy");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToTerms = () => {
    setCurrentPage("terms");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckoutInput = (field, value) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }));
  };



  const handleStripeCheckoutRedirect = () => {
    window.location.href = "https://buy.stripe.com/test_aFadR8gX48kK4LterNf3a00";
  };

  const scrollToSection = (selector) => {
    setCurrentPage("home");
    setMenuOpen(false);
    requestAnimationFrame(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const stats = [
    { value: "1,000+", label: "Clients & members served" },
    { value: "4.9/5", label: "Average satisfaction rating" },
    { value: "$500K+", label: "Revenue influenced" },
    { value: "92%", label: "Clients who renew or refer" },
  ];

  const services = [
    {
      icon: BarChart3,
      title: "Growth Strategy",
      text: "Clear positioning, offer design, pricing, and conversion strategy built to help your business scale with less noise.",
    },
    {
      icon: Layers3,
      title: "Systems & Operations",
      text: "Simplify delivery, automate repetitive work, and build workflows that make your business easier to run every day.",
    },
    {
      icon: Briefcase,
      title: "Brand & Offer Design",
      text: "Sharpen your message, elevate your presentation, and package your services into a premium offer people understand fast.",
    },
    {
      icon: MessageSquare,
      title: "Content & Messaging",
      text: "Create authority-building content and sales messaging that attracts the right people and moves them toward action.",
    },
  ];

  const programs = [
    "Business audit and growth roadmap",
    "Offer positioning and messaging refinement",
    "Operational systems and workflow optimization",
    "Conversion-focused landing page structure",
    "Content and brand clarity guidance",
    "Ongoing implementation support",
  ];

  const testimonials = [
    {
      name: "Sarah",
      role: "Coach & consultant",
      result: "WorkingBetter helped me simplify my offer, fix my messaging, and finally build a funnel that actually converts.",
    },
    {
      name: "Michael",
      role: "Agency founder",
      result: "We doubled monthly revenue in 90 days after tightening our operations and clarifying our value proposition.",
    },
    {
      name: "Alex",
      role: "Personal brand creator",
      result: "The brand and systems work gave me structure, confidence, and an extra €5K–€10K per month.",
    },
    {
      name: "James",
      role: "Online business owner",
      result: "Within the first month I had a clearer roadmap, better offers, and far more confidence in what I was selling.",
    },
    {
      name: "David",
      role: "Service business operator",
      result: "My business became easier to manage. Better delivery, better communication, and way less chaos week to week.",
    },
    {
      name: "Lisa",
      role: "Growth marketer",
      result: "The strategy was practical and direct. We improved positioning fast and saw real movement in sales.",
    },
  ];

  const faqs = [
    {
      q: "What does WorkingBetter actually do?",
      a: "WorkingBetter helps founders, creators, and service businesses improve strategy, systems, messaging, and conversion so the business feels clearer, more premium, and easier to grow.",
    },
    {
      q: "Who is this for?",
      a: "It is ideal for people with an existing business, offer, audience, or service who want better positioning, better operations, and stronger results without adding unnecessary complexity.",
    },
    {
      q: "Is this a course, agency, or consulting brand?",
      a: "This website is structured so you can present WorkingBetter as a premium consulting brand, program, membership, or hybrid service depending on how you want to sell.",
    },
    {
      q: "Can I change all the text and sections later?",
      a: "Yes. Everything is editable. The layout is now set up like a full website, so it is easy to customize service names, testimonials, pricing, pages, and calls to action.",
    },
    {
      q: "Does the site work on mobile?",
      a: "Yes. The full layout is responsive, with a mobile navigation menu, stacked content blocks, large type, and touch-friendly buttons.",
    },
  ];

  const nav = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#process" },
    { label: "Results", href: "#results" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Get Started", href: "#plans" },
  ];

  const renderHome = () => (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),transparent_36%)]" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Premium strategy, systems, and growth support
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              Build a business that looks better, runs better, and grows better.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/70">
              WorkingBetter helps founders and service brands improve positioning, simplify operations, and create a more premium customer journey from first impression to final conversion.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-7 py-3.5 text-base font-semibold text-black shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-indigo-500/30"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#services")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/55">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-400" />Premium positioning</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-400" />Clearer operations</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-400" />Stronger conversions</div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
              <div className="rounded-[1.5rem] border border-white/10 bg-neutral-900 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/45">Featured Offer</p>
                    <h2 className="mt-1 text-3xl font-semibold">WorkingBetter Growth System</h2>
                  </div>
                  <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-cyan-400">
                    Limited spots
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-white/70">
                  {programs.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-white/45">Lifetime Pass</div>
                      <div className="mt-1 text-4xl font-semibold">$150</div>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-5 py-3 text-base font-semibold text-black shadow-lg shadow-indigo-500/20"
                    >
                      Get Started
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-4xl font-semibold">{item.value}</div>
              <div className="mt-2 text-sm text-white/55">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Services</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A full website with real service sections, not just a landing page.</h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            WorkingBetter now has a complete structure you can use as a consulting, service, or hybrid brand website with clear navigation and multiple conversion points.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.05]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-cyan-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{service.text}</p>
                <button onClick={handleAddToCart} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400">
                  Learn more <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section id="process" className="bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">How it works</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Simple process. Better outcomes.</h2>
              <p className="mt-4 text-lg leading-8 text-white/65">
                This gives WorkingBetter the feel of a full professional brand site, with a clear explanation of how a client would move from inquiry to results.
              </p>
            </div>
            <div className="grid gap-5">
              {[
                ["01", "Audit", "Review your business, offer, messaging, and systems to identify the biggest bottlenecks and clearest opportunities."],
                ["02", "Strategy", "Build a stronger roadmap for positioning, delivery, content, operations, and conversion."],
                ["03", "Implementation", "Apply the plan with support, assets, and structured execution so changes actually happen."],
                ["04", "Optimization", "Refine what is working, remove friction, and keep improving how the business looks and performs."],
              ].map(([num, title, text]) => (
                <div key={num} className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6">
                  <div className="flex items-start gap-5">
                    <div className="text-3xl font-semibold text-cyan-400/80">{num}</div>
                    <div>
                      <h3 className="text-2xl font-semibold">{title}</h3>
                      <p className="mt-2 leading-7 text-white/65">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Results</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">What clients say about WorkingBetter</h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            These cards make the site feel complete and credible. You can later swap in real names, images, screenshots, or video proof.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base font-semibold">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-white/50">{item.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-cyan-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="leading-7 text-white/70">{item.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">About</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A premium brand built around clarity, performance, and better business design.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              WorkingBetter is positioned as the partner that helps people improve how their business looks, communicates, operates, and converts. The message is simple: better systems, better brand, better growth.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              This section can become your founder story, mission, company bio, or service philosophy. Right now it gives the site the depth of a full brand website instead of a single sales page.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-8">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8">
              <p className="text-sm text-white/45">Why brands choose WorkingBetter</p>
              <div className="mt-8 space-y-6">
                {[
                  ["Premium feel", "Elevated design and stronger first impressions"],
                  ["Clearer offers", "Messaging that makes services easier to buy"],
                  ["Better systems", "Workflows that reduce friction and save time"],
                  ["Real support", "Strategy that leads to actual implementation"],
                ].map(([title, text]) => (
                  <div key={title}>
                    <div className="text-2xl font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-white/55">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Homepage", "Strong hero, service overview, proof, about, FAQ, and a clear Get Started path."],
            ["Product flow", "Visitors can add the Lifetime Pass and move straight to the cart screen."],
            ["Checkout-ready", "This is now structured more like a product site instead of a contact-based site."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-white/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="border-y border-white/10 bg-black/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Frequently asked questions</h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((item, index) => (
              <div key={item.q} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                <button
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <h3 className="text-xl font-medium">{item.q}</h3>
                  <ChevronDown className={`h-5 w-5 transition ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && <p className="px-6 pb-6 leading-7 text-white/65">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2.25rem] border border-blue-500/20 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.3),rgba(10,10,10,0.92)_38%)] p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-lime-200/80">Get Started</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Start with the Lifetime Pass.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Instead of booking a call, visitors can click Get Started, add the Lifetime Pass to their cart, and move straight into a checkout flow similar to a store.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={handleAddToCart} className="rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-7 py-3 text-base font-semibold text-black shadow-lg shadow-indigo-500/20">
                  Get Started
                </button>
                <button onClick={goToCart} className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-base font-semibold text-white">
                  View Cart
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
              <div className="mb-5 text-2xl font-semibold">Lifetime Pass</div>
              <div className="space-y-4 text-white/70">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-white">WorkingBetter Lifetime Pass</div>
                      <div className="mt-1 text-sm text-white/55">One payment for lifetime access to the full WorkingBetter experience.</div>
                    </div>
                    <div className="text-2xl font-semibold text-cyan-400">$150</div>
                  </div>
                  <button onClick={handleAddToCart} className="mt-4 inline-flex rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-indigo-500/20">
                    Select Lifetime Pass
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderCart = () => (
    <section id="cart" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Cart</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your cart</h1>
        </div>
        <button
          onClick={goHome}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Continue shopping
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {cartItems.length === 0 ? (
            <div className="py-10 text-center">
              <h2 className="text-2xl font-semibold">Your cart is currently empty.</h2>
              <p className="mt-3 text-white/60">Add the Lifetime Pass to continue.</p>
              <button
                onClick={handleAddToCart}
                className="mt-6 inline-flex rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-indigo-500/20"
              >
                Add Lifetime Pass
              </button>
            </div>
          ) : (
            <div>
              <div className="hidden grid-cols-[1.4fr_0.5fr_0.7fr_0.7fr] gap-4 border-b border-white/10 pb-4 text-xs uppercase tracking-[0.2em] text-white/40 md:grid">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>
              {cartItems.map((item) => (
                <div key={item.name} className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                  <div className="grid gap-4 md:grid-cols-[1.4fr_0.5fr_0.7fr_0.7fr] md:items-center">
                    <div>
                      <div className="text-xl font-semibold">{item.name}</div>
                      <div className="mt-2 text-sm text-white/55">{item.description}</div>
                    </div>
                    <div className="text-lg font-semibold text-cyan-400">${item.price}</div>
                    <div>
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                        <button onClick={() => updateQuantity(item.quantity - 1)} className="h-9 w-9 rounded-full text-lg">−</button>
                        <span className="min-w-[2.5rem] text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.quantity + 1)} className="h-9 w-9 rounded-full text-lg">+</button>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">${item.price * item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-blue-500/20 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),rgba(10,10,10,0.94)_42%)] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Order summary</h2>
          <div className="mt-6 space-y-4 text-white/70">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span>Items</span>
              <span>{cartCount}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span>Subtotal</span>
              <span>${cartSubtotal}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span>Discount</span>
              <span>Applied at checkout</span>
            </div>
            <div className="flex items-center justify-between text-xl font-semibold text-white">
              <span>Total</span>
              <span>${cartSubtotal}</span>
            </div>
          </div>

          <button onClick={goToCheckout} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-6 py-3.5 text-base font-semibold text-black shadow-lg shadow-indigo-500/20">
            Proceed to checkout
          </button>
          <p className="mt-4 text-center text-sm text-white/45">Coupon codes can be entered on the payment page.</p>
        </div>
      </div>
    </section>
  );

  const renderCheckout = () => (
    <section id="checkout" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Secure checkout</h1>
        </div>
        <button
          onClick={goToCart}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <div className="mt-4 grid gap-4">
              <input value={checkoutData.email} onChange={(e) => handleCheckoutInput("email", e.target.value)} placeholder="Email address" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35" />
            </div>
          </div>



          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-white/70">Use code <strong>WORKING</strong> at Stripe Checkout for $50 off.</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-blue-500/20 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),rgba(10,10,10,0.94)_42%)] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Order summary</h2>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">WorkingBetter Lifetime Pass</div>
                <div className="mt-1 text-sm text-white/55">Lifetime access</div>
              </div>
              <div className="text-lg font-semibold text-cyan-400">$150</div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-white/70">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${cartSubtotal || 150}</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex items-center justify-between text-xl font-semibold text-white">
                <span>Total</span>
                <span>${(cartSubtotal || 150).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button onClick={handleStripeCheckoutRedirect} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-6 py-3.5 text-base font-semibold text-black shadow-lg shadow-indigo-500/20">
            Pay with Stripe Checkout
          </button>
          <p className="mt-4 text-center text-sm text-white/45">Secure payment powered by Stripe</p>
        </div>
      </div>
    </section>
  );

  const renderPrivacy = () => (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <div className="mb-8">
        <button onClick={goHome} className="mb-4 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
          ← Back to home
        </button>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
      </div>
      <div className="space-y-6 text-white/70">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">1. Introduction</h2>
          <p>WorkingBetter ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
          <ul className="mt-2 ml-4 list-disc space-y-2">
            <li><strong>Personal Data:</strong> Name, email address, and other information provided during checkout or account creation.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
            <li><strong>Device Information:</strong> IP address, browser type, operating system, and other technical information.</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">3. How We Use Your Information</h2>
          <p>We use the information collected for purposes including:</p>
          <ul className="mt-2 ml-4 list-disc space-y-2">
            <li>Processing transactions and sending related confirmations</li>
            <li>Providing customer support and responding to inquiries</li>
            <li>Improving our website and services</li>
            <li>Sending promotional materials (with your consent)</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">4. Data Protection</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us through our website.</p>
        </section>
      </div>
    </section>
  );

  const renderTerms = () => (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <div className="mb-8">
        <button onClick={goHome} className="mb-4 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
          ← Back to home
        </button>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Terms & Conditions</h1>
      </div>
      <div className="space-y-6 text-white/70">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">1. Agreement to Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on WorkingBetter for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="mt-2 ml-4 list-disc space-y-2">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineer any software contained on the site</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">3. Disclaimer</h2>
          <p><strong>Nothing on this site constitutes investment, tax, legal, or financial advice.</strong> All materials on WorkingBetter are provided on an "as-is" basis without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">4. Limitations of Liability</h2>
          <p>In no event shall WorkingBetter or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WorkingBetter, even if we have been notified of the possibility of such damage.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">5. Accuracy of Materials</h2>
          <p>The materials appearing on WorkingBetter could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">6. Links</h2>
          <p>We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">7. Modifications</h2>
          <p>We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">8. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-[Inter]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={goHome} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center">
              <svg viewBox="0 0 48 48" className="h-10 w-10">
                <defs>
                  <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 30 L16 18 L24 30 L32 18 L40 30" />
                  <path d="M10 34 H38" opacity="0.6" />
                </g>
              </svg>
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight">WorkingBetter</div>
              <div className="text-sm text-white/50">Work smarter. Grow better.</div>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-base text-white/70 md:flex">
            {nav.map((item) => (
              <button
                key={item.label}
                onClick={() => (item.label === "Get Started" ? scrollToSection("#plans") : scrollToSection(item.href))}
                className="transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <button onClick={goToCart} className="transition hover:text-white">Cart ({cartCount})</button>
            <button onClick={goToCheckout} className="transition hover:text-white">Checkout</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="hidden rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-indigo-500/30 md:inline-flex"
            >
              Get Started
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-neutral-950 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-6 py-4 text-base text-white/75">
              {nav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => (item.label === "Get Started" ? scrollToSection("#plans") : scrollToSection(item.href))}
                  className="border-b border-white/5 py-3 text-left last:border-b-0"
                >
                  {item.label}
                </button>
              ))}
              <button onClick={goToCart} className="border-b border-white/5 py-3 text-left">Cart ({cartCount})</button>
              <button onClick={goToCheckout} className="border-b border-white/5 py-3 text-left">Checkout</button>
              <button
                onClick={handleAddToCart}
                className="mt-4 inline-flex justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-black"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">{currentPage === "cart" ? renderCart() : currentPage === "checkout" ? renderCheckout() : currentPage === "privacy" ? renderPrivacy() : currentPage === "terms" ? renderTerms() : renderHome()}</main>

      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 text-xl font-semibold">
              <div className="flex h-9 w-9 items-center justify-center">
                <svg viewBox="0 0 48 48" className="h-9 w-9">
                  <defs>
                    <linearGradient id="logoGradientFooter" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#logoGradientFooter)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 30 L16 18 L24 30 L32 18 L40 30" />
                    <path d="M10 34 H38" opacity="0.6" />
                  </g>
                </svg>
              </div>
              WorkingBetter
            </div>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
              Helping ambitious brands build better systems, sharper positioning, and stronger growth with a cleaner, more premium customer journey.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-white">Navigation</div>
              <div className="mt-4 space-y-3 text-sm text-white/55">
                {nav.slice(0, 4).map((item) => (
                  <div key={item.label}>
                    <button onClick={() => scrollToSection(item.href)} className="hover:text-white">{item.label}</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Company</div>
              <div className="mt-4 space-y-3 text-sm text-white/55">
                <div><button onClick={goToCart} className="hover:text-white">Cart</button></div>
                <div><button onClick={goToCheckout} className="hover:text-white">Checkout</button></div>
                <div><button onClick={goToPrivacy} className="hover:text-white">Privacy Policy</button></div>
                <div><button onClick={goToTerms} className="hover:text-white">Terms & Conditions</button></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/70 px-6 py-6 text-center text-xs text-white/60">
          <p className="mb-2">Nothing on this site constitutes investment, tax, or legal advice. Consult a qualified professional before making financial decisions.</p>
          <p>
            <button onClick={goToPrivacy} className="underline hover:text-white">Privacy Policy</button> •
            <button onClick={goToTerms} className="underline hover:text-white"> Terms & Conditions</button>
          </p>
        </div>
      </footer>
    </div>
  );
}
