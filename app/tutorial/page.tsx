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

const breakouts = [
  {
    label: "Scoreboard",
    body: "Track wins, losses, and ties across games instead of resetting on every reload.",
  },
  {
    label: "Difficulty settings",
    body: "Give the opponent an easy, medium, or hard mode instead of one fixed strategy.",
  },
  {
    label: "Color changes",
    body: "Swap the theme's palette in globals.css to make the board and pieces your own.",
  },
  {
    label: "Sound effects",
    body: "Play a sound on move, win, or tie to make the game feel more alive.",
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
          <LetterHeading>Workshop breakouts</LetterHeading>
          <LetterBody>
            Once you&apos;re set up, join a small-group session with a mentor
            to add a new feature to your game:
          </LetterBody>
          <ul className="mt-1 list-disc space-y-3 pl-5 text-[15px] leading-[1.66] text-ui-ink">
            {breakouts.map((breakout) => (
              <li key={breakout.label}>
                <span className="font-bold text-ui-ink">
                  {breakout.label}:
                </span>{" "}
                {breakout.body}
              </li>
            ))}
          </ul>
        </LetterSection>

        <LetterSection tone={(steps.length + 1) % 2 === 0 ? "well" : "paper"}>
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
