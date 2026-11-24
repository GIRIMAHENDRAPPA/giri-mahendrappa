import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResumeButton } from "@/components/site/ResumeButton";
import { SocialLinks } from "@/components/site/SocialLinks";
import { profile } from "@/content/portfolio";

function RotatingTitle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % profile.rotatingTitles.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  const word = profile.rotatingTitles[i] ?? profile.rotatingTitles[0];
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-gradient inline-block whitespace-nowrap"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CodePanel() {
  return (
    <div className="surface-card relative overflow-hidden font-mono text-[0.8rem] leading-relaxed sm:text-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-primary/70" />
        <span className="ml-3 text-xs text-muted-foreground">giri.py</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-muted-foreground">
        <code>
          <span className="text-code-key">class</span> <span className="text-foreground">Giri</span>:{"\n"}
          {"    "}role = <span className="text-code-string">"AI Engineer & Software Developer"</span>{"\n"}
          {"    "}stack = [<span className="text-code-string">"Python"</span>, <span className="text-code-string">"FastAPI"</span>, <span className="text-code-string">"MySQL"</span>]{"\n"}
          {"    "}focus = [<span className="text-code-string">"AI"</span>, <span className="text-code-string">"ML"</span>, <span className="text-code-string">"DSA"</span>, <span className="text-code-string">"Backend"</span>]{"\n"}
          {"\n"}
          {"    "}<span className="text-code-key">def</span> <span className="text-code-fn">build</span>(self, idea):{"\n"}
          {"        "}<span className="text-code-key">return</span> solve(idea, intelligent=<span className="text-code-key">True</span>){"\n"}
          {"\n"}
          {"    "}<span className="text-code-key">def</span> <span className="text-code-fn">learn</span>(self):{"\n"}
          {"        "}<span className="text-code-key">while</span> <span className="text-code-key">True</span>:{"\n"}
          {"            "}self.improve()
          <motion.span
            aria-hidden="true"
            className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="bg-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {profile.title}
          </p>

          <h1 id="hero-title" className="mt-6 text-[2.6rem] leading-[1.05] font-semibold text-foreground sm:text-6xl lg:text-[4.25rem]">
            Hi, I'm {profile.name}.
            <span className="mt-2 block text-[0.62em] font-medium text-muted-foreground">
              <RotatingTitle />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-foreground sm:text-xl">{profile.tagline}</p>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">{profile.summary}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/" hash="projects">
                Explore My Projects
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <ResumeButton size="lg" />
            <Button asChild variant="ghost" size="lg">
              <Link to="/" hash="contact">
                <Mail aria-hidden="true" />
                Contact Me
              </Link>
            </Button>
          </div>

          <SocialLinks className="mt-9" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          <CodePanel />
        </motion.div>
      </div>
    </section>
  );
}
