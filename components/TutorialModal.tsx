"use client";

import { useEffect } from "react";

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

export function TutorialModal({ open, onClose }: TutorialModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-moss-900/70 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card bg-parchment p-6 text-moss-900 shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-display font-bold text-2xl">Tutorial</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close tutorial"
            className="rounded-full bg-cream px-3 py-1 font-mono text-xs uppercase tracking-widest text-moss-900 transition hover:bg-leaf"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-6 text-sm leading-relaxed">
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-moss-700">
              1. Clone &amp; run
            </h3>
            <p className="pt-1">
              Use the &quot;Use this template&quot; button on GitHub to get
              your own copy of this repo, then:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-moss-900 p-3 font-mono text-xs text-cream">
              {`git clone <your-repo-url>
cd <your-repo-name>
npm install
npm run dev`}
            </pre>
          </section>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-moss-700">
              2. Git basics
            </h3>
            <p className="pt-1">
              After you make a change, save it to your repo&apos;s history and
              send it to GitHub:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-moss-900 p-3 font-mono text-xs text-cream">
              {`git add .
git commit -m "describe your change"
git push`}
            </pre>
          </section>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-moss-700">
              3. Environment variables
            </h3>
            <p className="pt-1">
              This project reads secrets from a{" "}
              <code className="rounded bg-cream px-1 font-mono text-xs">
                .env.local
              </code>{" "}
              file, which is never committed to git. Copy the example file to
              get started:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-moss-900 p-3 font-mono text-xs text-cream">
              {`cp .env.example .env.local`}
            </pre>
          </section>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-moss-700">
              4. Supabase setup (optional)
            </h3>
            <p className="pt-1">
              By default, scores save to your browser only. To back them with
              a real database instead:
            </p>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Create a free project at supabase.com.</li>
              <li>
                In the SQL editor, run:
                <pre className="mt-1 overflow-x-auto rounded-lg bg-moss-900 p-3 font-mono text-xs text-cream">
                  {`create table scores (
  player_id text primary key,
  wins integer not null default 0,
  losses integer not null default 0,
  ties integer not null default 0
);`}
                </pre>
              </li>
              <li>
                In Settings → API, copy your Project URL and{" "}
                <code className="rounded bg-cream px-1 font-mono text-xs">
                  anon
                </code>{" "}
                key into{" "}
                <code className="rounded bg-cream px-1 font-mono text-xs">
                  .env.local
                </code>
                .
              </li>
              <li>
                Restart{" "}
                <code className="rounded bg-cream px-1 font-mono text-xs">
                  npm run dev
                </code>{" "}
                — no code changes needed.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
