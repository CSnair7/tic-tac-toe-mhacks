import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/console/button";
import {
  LetterBody,
  LetterHeading,
  LetterKicker,
  LetterSection,
  LetterTitle,
  Signoff,
} from "@/components/console/letter";
import { PanelBar } from "@/components/console/panel";
import { ConsoleShell } from "@/components/console/shell";

export const metadata: Metadata = {
  title: "Tutorial · MHacks Tic-Tac-Toe",
};

const CODE_CHIP = "rounded bg-ui-selected px-1 font-mono text-xs text-ui-ink";
const CODE_BLOCK =
  "mt-3 overflow-x-auto rounded-lg bg-ui-ink p-3 font-mono text-xs text-ui-surface";

const steps: { label: string; body: ReactNode }[] = [
  {
    label: "Clone & run",
    body: (
      <>
        <LetterBody>
          Use the &quot;Use this template&quot; button on GitHub to get your
          own copy of this repo, then:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`git clone <your-repo-url>
cd <your-repo-name>
npm install
npm run dev`}
        </pre>
      </>
    ),
  },
  {
    label: "Git basics",
    body: (
      <>
        <LetterBody>
          After you make a change, save it to your repo&apos;s history and
          send it to GitHub:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`git add .
git commit -m "describe your change"
git push`}
        </pre>
      </>
    ),
  },
  {
    label: "Environment variables",
    body: (
      <>
        <LetterBody>
          This project reads secrets from a{" "}
          <code className={CODE_CHIP}>.env.local</code> file, which is never
          committed to git. Copy the example file to get started:
        </LetterBody>
        <pre className={CODE_BLOCK}>{`cp .env.example .env.local`}</pre>
      </>
    ),
  },
  {
    label: "Supabase setup (optional)",
    body: (
      <>
        <LetterBody>
          By default, scores save to your browser only. To back them with a
          real database instead:
        </LetterBody>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-[1.66] text-ui-ink">
          <li>Create a free project at supabase.com.</li>
          <li>
            In the SQL editor, run:
            <pre className={CODE_BLOCK}>
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
            <code className={CODE_CHIP}>anon</code> key into{" "}
            <code className={CODE_CHIP}>.env.local</code>.
          </li>
          <li>
            Restart <code className={CODE_CHIP}>npm run dev</code> — no code
            changes needed.
          </li>
        </ol>
      </>
    ),
  },
];

const breakouts: { label: string; body: ReactNode }[] = [
  {
    label: "Scoreboard",
    body: (
      <>
        <LetterBody>
          The storage already exists — <code className={CODE_CHIP}>
            lib/scoreStore.ts
          </code>{" "}
          tracks wins, losses, and ties (in the browser, or in Supabase if
          you did that setup step), and{" "}
          <code className={CODE_CHIP}>app/page.tsx</code> already calls{" "}
          <code className={CODE_CHIP}>recordResult()</code> after every game.
          This breakout is about reading that data back and putting it on
          screen, not building storage.
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`const [stats, setStats] = useState<ScoreStats | null>(null);

async function refreshStats() {
  const store = await getScoreStore();
  setStats(await store.getStats());
}

useEffect(() => {
  refreshStats();
}, []);`}
        </pre>
        <LetterBody>
          Call <code className={CODE_CHIP}>refreshStats()</code> again after
          each <code className={CODE_CHIP}>recordResult(...)</code> call so
          the board updates immediately, then render{" "}
          <code className={CODE_CHIP}>
            {"`${stats.wins}W – ${stats.losses}L – ${stats.ties}T`"}
          </code>{" "}
          wherever you&apos;d like it to show, e.g. inside{" "}
          <code className={CODE_CHIP}>components/Header.tsx</code>.
        </LetterBody>
      </>
    ),
  },
  {
    label: "Difficulty settings",
    body: (
      <>
        <LetterBody>
          The 2 Player / vs Computer toggle already ships in{" "}
          <code className={CODE_CHIP}>app/page.tsx</code>, and the computer
          currently plays every move with{" "}
          <code className={CODE_CHIP}>randomMove</code> from{" "}
          <code className={CODE_CHIP}>lib/gameLogic.ts</code> — that&apos;s
          the whole bot for now, with no difficulty behind it yet. This
          breakout is about layering tiers on top of that single function.
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`export function randomMove(board: Board): number {
  const empty = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((i): i is number => i !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}`}
        </pre>
        <LetterBody>
          Add a <code className={CODE_CHIP}>difficulty</code> state next to{" "}
          <code className={CODE_CHIP}>mode</code> in{" "}
          <code className={CODE_CHIP}>app/page.tsx</code>, and a matching
          selector alongside the mode buttons. Then write one function per
          tier in <code className={CODE_CHIP}>lib/gameLogic.ts</code>: keep{" "}
          <code className={CODE_CHIP}>randomMove</code> as easy, add a
          function that takes a winning or blocking move when one exists for
          medium, and a full minimax search over{" "}
          <code className={CODE_CHIP}>checkWinner</code>/
          <code className={CODE_CHIP}>isDraw</code> for hard — tic-tac-toe is
          small enough to search completely. The computer&apos;s move effect
          only needs one change: call whichever function{" "}
          <code className={CODE_CHIP}>difficulty</code> currently points at
          instead of always calling <code className={CODE_CHIP}>randomMove</code>.
        </LetterBody>
      </>
    ),
  },
  {
    label: "Color changes",
    body: (
      <>
        <LetterBody>
          The whole palette lives in one place: the{" "}
          <code className={CODE_CHIP}>@theme</code> block in{" "}
          <code className={CODE_CHIP}>app/globals.css</code>.
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`--color-moss-900: #1d2412;
--color-parchment: #f5f1de;
--color-cream: #efe9d4;
--color-sun: #e8d35a;`}
        </pre>
        <LetterBody>
          Change a hex value there and every{" "}
          <code className={CODE_CHIP}>bg-moss-900</code>,{" "}
          <code className={CODE_CHIP}>text-cream</code>, etc. class across
          the app picks it up automatically — you only need to touch
          individual components if you want to add a brand-new color name.
        </LetterBody>
      </>
    ),
  },
  {
    label: "Sound effects",
    body: (
      <>
        <LetterBody>
          There&apos;s no audio yet, so start by dropping a couple of short
          clips (e.g. <code className={CODE_CHIP}>move.mp3</code>,{" "}
          <code className={CODE_CHIP}>win.mp3</code>,{" "}
          <code className={CODE_CHIP}>tie.mp3</code>) into{" "}
          <code className={CODE_CHIP}>public/sounds/</code>, then play them
          from a small helper:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`function playSound(name: string) {
  new Audio(\`/sounds/\${name}.mp3\`).play();
}`}
        </pre>
        <LetterBody>
          Call <code className={CODE_CHIP}>playSound(&quot;move&quot;)</code>{" "}
          right after <code className={CODE_CHIP}>setBoard(nextBoard)</code>{" "}
          in <code className={CODE_CHIP}>handleCellClick</code>, and{" "}
          <code className={CODE_CHIP}>playSound(&quot;win&quot;)</code> /{" "}
          <code className={CODE_CHIP}>playSound(&quot;tie&quot;)</code>{" "}
          alongside the existing{" "}
          <code className={CODE_CHIP}>recordResult(...)</code> calls — the
          game already knows exactly when each of those happens.
        </LetterBody>
      </>
    ),
  },
];

export default function TutorialPage() {
  return (
    <ConsoleShell width="letter" field={false}>
      <article>
        <PanelBar eyebrow="MHACKS TIC-TAC-TOE" status="Tutorial" />

        <LetterSection>
          <LetterKicker>Getting Started</LetterKicker>
          <LetterTitle>Make it your own.</LetterTitle>
          <LetterBody>
            This game is a starter template. Fork the repo, run it locally,
            and customize it — here&apos;s everything you need to get set up.
          </LetterBody>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ButtonLink href="/" variant="primary" external={false}>
              Back to the board
            </ButtonLink>
          </div>
        </LetterSection>

        {steps.map((step, index) => (
          <LetterSection key={step.label} tone={index % 2 === 0 ? "well" : "paper"}>
            <LetterHeading>
              {index + 1}. {step.label}
            </LetterHeading>
            {step.body}
          </LetterSection>
        ))}

        <LetterSection tone={steps.length % 2 === 0 ? "well" : "paper"}>
          <LetterKicker>Workshop breakouts</LetterKicker>
          <LetterBody>
            Once you&apos;re set up, join a small-group session with a mentor
            to add one of these to your game. Each one points at exactly
            where in the code it hooks in:
          </LetterBody>
        </LetterSection>

        {breakouts.map((breakout, index) => (
          <LetterSection
            key={breakout.label}
            tone={(steps.length + 1 + index) % 2 === 0 ? "well" : "paper"}
          >
            <LetterHeading>{breakout.label}</LetterHeading>
            {breakout.body}
          </LetterSection>
        ))}

        <LetterSection
          tone={
            (steps.length + 1 + breakouts.length) % 2 === 0 ? "well" : "paper"
          }
        >
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/" variant="outline" external={false}>
              Back to the board
            </ButtonLink>
          </div>
          <Signoff>— The MHacks Team</Signoff>
        </LetterSection>
      </article>
    </ConsoleShell>
  );
}
