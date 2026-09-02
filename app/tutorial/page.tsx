import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/console/button";
import {
  LetterBody,
  LetterHeading,
  LetterKicker,
  LetterSection,
  LetterTitle,
  Showcase,
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

function Screenshot({
  src,
  width,
  height,
  caption,
}: {
  src: string;
  width: number;
  height: number;
  caption: string;
}) {
  return (
    <figure className="m-0 mt-3">
      <Image
        src={src}
        alt={caption}
        width={width}
        height={height}
        sizes="(min-width: 768px) 640px, 100vw"
        className="block h-auto w-full border border-ui-line-strong"
      />
      <figcaption className="mt-[7px] block font-red-hat-mono text-[10px] tracking-[0.14em] uppercase text-ui-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

const steps: { label: string; body: ReactNode }[] = [
  {
    label: "Clone & run",
    body: (
      <Showcase
        image="/tutorial/use-this-template.png"
        width={598}
        height={374}
        caption='The "Use this template" button, top right'
      >
        <LetterBody>
          Click the &quot;Use this template&quot; button on GitHub to get your
          own copy of this repo, then:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`git clone <your-repo-url>
cd <your-repo-name>
npm install
npm run dev`}
        </pre>
      </Showcase>
    ),
  },
  {
    label: "Git basics",
    body: (
      <>
        <LetterBody>
          After you make a change, save it to your repo&apos;s history and send
          it to GitHub:
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
    label: "Working as a team",
    body: (
      <>
        <LetterBody>
          If a few of you are hacking on the same repo, don&apos;t all push to{" "}
          <code className={CODE_CHIP}>main</code> directly. Each person works on
          their own branch, then opens a pull request to merge it in:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`git branch feature/your-feature
git checkout feature/your-feature
# ...make changes...
git add .
git commit -m "describe your change"
git push -u origin feature/your-feature`}
        </pre>
        <LetterBody>
          Push a branch and GitHub offers to open a pull request for it:
        </LetterBody>
        <Screenshot
          src="/tutorial/compare-pull-request.png"
          width={2912}
          height={654}
          caption="GitHub prompts you to open a PR after a push"
        />
        <LetterBody>
          Click through and hit &quot;Create pull request&quot; to open it
          against <code className={CODE_CHIP}>main</code> (or run{" "}
          <code className={CODE_CHIP}>gh pr create</code> instead):
        </LetterBody>
        <Screenshot
          src="/tutorial/create-pull-request.png"
          width={2942}
          height={958}
          caption="Comparing your branch against main"
        />
        <LetterBody>
          Have a teammate glance over it, then merge — this keeps
          everyone&apos;s changes from colliding, and gives you a chance to
          catch bugs before they land. After merging, everyone else should run{" "}
          <code className={CODE_CHIP}>
            git checkout main &amp;&amp; git pull
          </code>{" "}
          before starting new work.
        </LetterBody>
        <Screenshot
          src="/tutorial/merge-pull-request.png"
          width={2960}
          height={1302}
          caption="Ready to merge once reviewed"
        />
      </>
    ),
  },
  {
    label: "Deploying to Vercel",
    body: (
      <>
        <LetterBody>
          Once your repo is on GitHub, go to{" "}
          <code className={CODE_CHIP}>vercel.com</code> → New Project → import
          the repo. Vercel detects Next.js automatically, so no config is
          needed.
        </LetterBody>
        <LetterBody>
          Every push to <code className={CODE_CHIP}>main</code> deploys to
          production, and every pull request gets its own preview URL — handy
          for letting teammates click-test a change before merging it.
          Don&apos;t forget to add any{" "}
          <code className={CODE_CHIP}>.env.local</code> values (like your
          Supabase keys) under Project → Settings → Environment Variables, since
          Vercel doesn&apos;t read your local{" "}
          <code className={CODE_CHIP}>.env.local</code> file.
        </LetterBody>
      </>
    ),
  },
  {
    label: "Environment variables",
    body: (
      <>
        <LetterBody>
          This project reads secrets from a{" "}
          <code className={CODE_CHIP}>.env.local</code> file. It&apos;s listed
          in <code className={CODE_CHIP}>.gitignore</code>, so git ignores it
          and it&apos;s never committed — your real keys stay off GitHub. Copy
          the example file to get started:
        </LetterBody>
        <pre className={CODE_BLOCK}>{`cp .env.example .env.local`}</pre>
      </>
    ),
  },
  {
    label: "Supabase setup (for the Scoreboard breakout)",
    body: (
      <>
        <LetterBody>
          The game doesn&apos;t track scores yet — that&apos;s the Scoreboard
          breakout below, and it&apos;s built on Supabase. Set up a project
          now so it&apos;s ready when you get there:
        </LetterBody>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-[1.66] text-ui-ink">
          <li>Create a free project at supabase.com.</li>
          <li>
            In the SQL editor, run:
            <pre className={CODE_BLOCK}>
              {`-- one row per player, keyed by the random id they're given
create table scores (
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
            Restart <code className={CODE_CHIP}>npm run dev</code> so the new
            env vars are picked up.
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
          There&apos;s no score tracking yet — this breakout is about
          building it from scratch on Supabase (see the Supabase setup step
          above). <code className={CODE_CHIP}>@supabase/supabase-js</code> is
          already installed, so you just need a client and two queries.
          Create <code className={CODE_CHIP}>lib/scoreStore.ts</code>:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`import { createClient } from "@supabase/supabase-js";

// Connects to your Supabase project using the keys from .env.local.
// The "!" tells TypeScript these are always set — they will be, once
// you've followed the Supabase setup step above.
const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const PLAYER_ID_KEY = "tic-tac-toe-player-id";

// Gives this browser a random ID, saved in localStorage, so each
// player's stats live in their own row of the "scores" table.
function getPlayerId(): string {
  let id = window.localStorage.getItem(PLAYER_ID_KEY);

  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(PLAYER_ID_KEY, id);
  }

  return id;
}

// Reads this player's row back from Supabase.
// If they don't have one yet, default to all zeros.
export async function getStats() {
  const { data } = await client
    .from("scores")
    .select("wins, losses, ties")
    .eq("player_id", getPlayerId())
    .maybeSingle();

  return data ?? { wins: 0, losses: 0, ties: 0 };
}

// Adds one win, loss, or tie to this player's row.
// "upsert" creates the row on the first call and updates it after that.
export async function recordResult(result: "win" | "loss" | "tie") {
  const current = await getStats();

  await client.from("scores").upsert({
    player_id: getPlayerId(),
    wins: current.wins + (result === "win" ? 1 : 0),
    losses: current.losses + (result === "loss" ? 1 : 0),
    ties: current.ties + (result === "tie" ? 1 : 0),
  });
}`}
        </pre>
        <LetterBody>
          Then wire it into <code className={CODE_CHIP}>app/page.tsx</code>:
          call <code className={CODE_CHIP}>recordResult(...)</code> from{" "}
          <code className={CODE_CHIP}>handleCellClick</code> and the
          computer&apos;s move effect, right where each one already detects a
          winner or a draw. Track the stats in state, refresh them with{" "}
          <code className={CODE_CHIP}>getStats()</code> after each call, and
          render{" "}
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
          <code className={CODE_CHIP}>lib/gameLogic.ts</code> — that&apos;s the
          whole bot for now, with no difficulty behind it yet. This breakout is
          about layering tiers on top of that single function.
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`export function randomMove(board: Board): number {
  // Collect the index of every empty cell on the board...
  const empty = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((i): i is number => i !== null);

  // ...then pick one of those indexes at random.
  return empty[Math.floor(Math.random() * empty.length)];
}`}
        </pre>
        <LetterBody>
          Add a <code className={CODE_CHIP}>difficulty</code> state next to{" "}
          <code className={CODE_CHIP}>mode</code> in{" "}
          <code className={CODE_CHIP}>app/page.tsx</code>, and a matching
          selector alongside the mode buttons. Then write one function per tier
          in <code className={CODE_CHIP}>lib/gameLogic.ts</code>: keep{" "}
          <code className={CODE_CHIP}>randomMove</code> as easy, add a function
          that takes a winning or blocking move when one exists for medium, and
          a full minimax search over{" "}
          <code className={CODE_CHIP}>checkWinner</code>/
          <code className={CODE_CHIP}>isDraw</code> for hard — tic-tac-toe is
          small enough to search completely. The computer&apos;s move effect
          only needs one change: call whichever function{" "}
          <code className={CODE_CHIP}>difficulty</code> currently points at
          instead of always calling{" "}
          <code className={CODE_CHIP}>randomMove</code>.
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
          {`/* each variable below becomes a Tailwind color, e.g. bg-moss-900 */
--color-moss-900: #1d2412;
--color-parchment: #f5f1de;
--color-cream: #efe9d4;
--color-sun: #e8d35a;`}
        </pre>
        <LetterBody>
          Change a hex value there and every{" "}
          <code className={CODE_CHIP}>bg-moss-900</code>,{" "}
          <code className={CODE_CHIP}>text-cream</code>, etc. class across the
          app picks it up automatically — you only need to touch individual
          components if you want to add a brand-new color name.
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
          <code className={CODE_CHIP}>public/sounds/</code>, then play them from
          a small helper:
        </LetterBody>
        <pre className={CODE_BLOCK}>
          {`function playSound(name: string) {
  // e.g. playSound("win") loads and plays "/sounds/win.mp3"
  new Audio(\`/sounds/\${name}.mp3\`).play();
}`}
        </pre>
        <LetterBody>
          Call <code className={CODE_CHIP}>playSound(&quot;move&quot;)</code>{" "}
          right after <code className={CODE_CHIP}>setBoard(nextBoard)</code> in{" "}
          <code className={CODE_CHIP}>handleCellClick</code>, and{" "}
          <code className={CODE_CHIP}>playSound(&quot;win&quot;)</code> /{" "}
          <code className={CODE_CHIP}>playSound(&quot;tie&quot;)</code>{" "}
          alongside the existing{" "}
          <code className={CODE_CHIP}>recordResult(...)</code> calls — the game
          already knows exactly when each of those happens.
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
            This game is a starter template. Fork the repo, run it locally, and
            customize it — here&apos;s everything you need to get set up.
          </LetterBody>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ButtonLink href="/" variant="primary" external={false}>
              Back to the board
            </ButtonLink>
          </div>
        </LetterSection>

        {steps.map((step, index) => (
          <LetterSection
            key={step.label}
            tone={index % 2 === 0 ? "well" : "paper"}
          >
            <LetterHeading>
              {index + 1}. {step.label}
            </LetterHeading>
            {step.body}
          </LetterSection>
        ))}

        <LetterSection tone={steps.length % 2 === 0 ? "well" : "paper"}>
          <LetterKicker>Workshop breakouts</LetterKicker>
          <LetterBody>
            Once you&apos;re set up, join a small-group session with a mentor to
            add one of these to your game. Each one points at exactly where in
            the code it hooks in:
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
