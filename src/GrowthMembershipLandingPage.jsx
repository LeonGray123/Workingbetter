import { useState } from "react";
import { Menu, X, ArrowRight, CheckCircle2, Play, Star, BarChart3, Briefcase, Layers3, MessageSquare, ShieldCheck, ChevronDown } from "lucide-react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function GrowthMembershipLandingPage() {
  const stripe = useStripe();
  const elements = useElements();

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
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

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

  const handleCheckoutInput = (field, value) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "WORKINGBETTER") {
      setCouponDiscount(50);
      alert("Coupon applied! $50 off");
    } else if (couponCode === "") {
      setCouponDiscount(0);
      alert("Enter a coupon code");
    } else {
      alert("Invalid coupon code. Try: WORKINGBETTER");
    }
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      alert("Stripe is not ready yet");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const finalAmount = (cartSubtotal || 150) - couponDiscount;

    try {
      const { token } = await stripe.createToken(cardElement);
      
      if (token) {
        alert(`✅ Payment of $${finalAmount.toFixed(2)} processed successfully!\n\nOrder confirmed for:\n${checkoutData.email}\n\nThank you for your purchase!`);
        setCurrentPage("home");
        setCartItems([]);
        setCouponDiscount(0);
        setCouponCode("");
      }
    } catch (error) {
      alert("Payment failed: " + error.message);
    }
  };

  const handleStripeCheckoutRedirect = () => {
    // replace URL with your actual Stripe Checkout URL as needed
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
      name: "Steve",
      role: "Coach & consultant",
      result: "WorkingBetter helped me simplify my offer, fix my messaging, and finally build a funnel that actually converts.",
    },
    {
      name: "Martin",
      role: "Agency founder",
      result: "We doubled monthly revenue in 90 days after tightening our operations and clarifying our value proposition.",
    },
    {
      name: "Ashley",
      role: "Personal brand creator",
      result: "The brand and systems work gave me structure, confidence, and an extra €5K–€10K per month.",
    },
    {
      name: "Henrique",
      role: "Online business owner",
      result: "Within the first month I had a clearer roadmap, better offers, and far more confidence in what I was selling.",
    },
    {
      name: "Cooper",
      role: "Service business operator",
      result: "My business became easier to manage. Better delivery, better communication, and way less chaos week to week.",
    },
    {
      name: "Raunit",
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

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Play className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Quick intro walkthrough</div>
                    <div className="text-sm text-white/50">Perfect spot for a future founder video or sales intro.</div>
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



          <div>
            <h2 className="text-2xl font-semibold">Payment</h2>
            <div className="mt-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <CardElement 
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#ffffff',
                        '::placeholder': {
                          color: '#ffffff88',
                        },
                      },
                    },
                  }}
                />
              </div>
              <p className="mt-3 text-sm text-white/50">No cardholder name needed for Stripe Checkout tokens.</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Coupon Code</h2>
            <div className="mt-4 flex gap-3">
              <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code" className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35" />
              <button onClick={applyCoupon} className="rounded-2xl border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-400/20">
                Apply
              </button>
            </div>
            <p className="mt-3 text-sm text-white/50">💡 Try: <span className="font-semibold text-white">WORKINGBETTER</span> for $50 off</p>
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
            {couponDiscount > 0 && (
              <div className="rounded-lg border border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-500/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-green-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A11.010 11.010 0 001.57 10m18.86 0a13.010 13.010 0 01-3.858 9.01m-9.652 1.859c4.296 4.296 11.26 4.296 15.556 0A11.010 11.010 0 0018.43 10" clipRule="evenodd" />
                    </svg>
                    Discount
                  </span>
                  <span className="font-semibold text-green-400">-${couponDiscount.toFixed(2)}</span>
                </div>
              </div>
            )}
            <div className="border-t border-white/10 pt-3">
              <div className="flex items-center justify-between text-xl font-semibold text-white">
                <span>Total</span>
                <span>${((cartSubtotal || 150) - couponDiscount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button onClick={handleStripePayment} disabled={!stripe} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 px-6 py-3.5 text-base font-semibold text-black shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
            Complete purchase
          </button>
          <button onClick={handleStripeCheckoutRedirect} className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/20">
            Pay with Stripe Checkout
          </button>
          <p className="mt-4 text-center text-sm text-white/45">Secure payment powered by Stripe</p>
        </div>
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

      <main id="top">{currentPage === "cart" ? renderCart() : currentPage === "checkout" ? renderCheckout() : renderHome()}</main>

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
                <div><a href="#" className="hover:text-white">Privacy Policy</a></div>
                <div><a href="#" className="hover:text-white">Terms & Conditions</a></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
