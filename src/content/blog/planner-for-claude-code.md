---
title: 'A planner for Claude Code'
description: 'How I keep agent work as markdown plans in git, with one Claude Code skill that captures, writes, dispatches and syncs them. The full skill is included, so an agent can set it up in any project.'
pubDate: 2026-10-20T17:57:00Z
---

Most of my code is written by Claude Code agents now. Starting an agent is easy. The hard part is everything around it: remembering what I wanted done, writing a brief good enough that the agent doesn't need me, and knowing afterwards what actually landed.

What fixed this for me is a `planner/` folder. I took the idea from the first part of Fatih Arslan's post [How I manage my agents](https://arslan.io/2026/09/11/how-i-manage-my-agents/). His setup runs in Cursor, with pull requests and long-running coordinator agents. Mine is one person, one repository and Claude Code, so I rebuilt it as a single Claude Code skill. I started on 12 September 2026, and in the five weeks since, 103 plans have gone through to done on one project.

This post explains how it works and includes the whole skill, so you, or your agent, can set it up in any project.

> **If you're an agent** asked to set this up, go to [Set it up](#set-it-up) and download the files with `curl` as shown there. Don't copy them from this rendered page. Tools that summarise web pages change the text.

## One file per piece of work

Every piece of work is one markdown file in `planner/`. The folder it sits in is its state:

| Folder | Means |
| --- | --- |
| `drafts/` | Captured, not thought through. One line is fine. |
| `next/` | Written up and ready to hand to an agent. |
| `open/` | An agent is on it, or a branch exists. |
| `done/` | Merged and verified. |
| `discarded/` | Decided against. The reason stays in the file. |

A plan moves `drafts/` → `next/` → `open/` → `done/`, or into `discarded/` if I decide against it. `planner/README.md` is the index: what's next, what's open, and the list of area prefixes.

Files are named `<area>-<slug>.md`, for example `api-retry-webhooks.md` or `auth-google-sign-in.md`. The prefix is the part of the codebase the change touches, so `ls planner/next` groups related work.

It's all plain files in git. Any agent can read the whole queue without asking me, and so can I six weeks later. When a plan gets a second attempt, the file's history shows the first one.

## The moves

The skill is called `planner`, so in Claude Code it's the `/planner` command. It isn't called `plans` because that sits too close to Claude Code's own `/plan` command, which turns on plan mode. The word after it picks the move:

- `/planner add <idea>` captures an idea into `drafts/`. No research and no questions, it just replies with the path. It's for when I notice something mid-task and don't want to lose it.
- `/planner save` turns the conversation I'm in into a plan. More on this below.
- `/planner write [file]` researches a draft into a full plan. It reads the code, the git history and the project's rules, names the cause, and moves the file to `next/`. This is where the thinking happens, so the agent that implements the plan can be cheap and mechanical.
- `/planner dispatch [file]` moves a `next/` plan to `open/` and hands it to a subagent.
- `/planner sync` checks what landed, runs each plan's own verification, moves finished plans to `done/` and rewrites the index.
- `/planner status` is a read-only report: what's waiting, what's open, what's gone stale.
- `/planner init` creates the folders and the README in a new project.

### Save is the one I use most

Most of my plans don't start as a one-line idea. They start as a long conversation. I ask about a bug, Claude reads the code, we find the cause and argue about the fix. At the end I say "save this as a plan". No slash command needed: the skill's description makes Claude Code pick it up from that phrase.

Save reads the conversation back and writes a full plan. It lands in `next/` when the discussion settled a cause, an approach and a check that can fail. Otherwise it lands in `drafts/`, with a note on what's still open. The skill puts it as "length is not resolution": a long chat that never pinned down a cause is still a draft.

Reading a transcript back is harder than it looks, so the skill is strict about it:

- Write down where the discussion landed, not the path it took. A claim that was corrected halfway through must not end up in the plan as fact.
- Give each dead end one line, marked as rejected, with the reason. A fresh agent can't work that out by itself, and it's the most expensive part to rediscover.
- Anything load-bearing that was said but never checked gets checked now.
- No "as discussed", no "the file above". Paths in full, line numbers pinned to a commit. The reader has never seen the conversation.

## Why it fits Claude Code

- **A skill is a slash command.** `.claude/skills/planner/SKILL.md` gives you `/planner`. Only the skill's description sits in context; the full instructions load when the skill is used.
- **Save triggers on plain language** through that description, so "turn this into a plan" works in the middle of a conversation.
- **Plan mode and `planner/` work together.** Claude Code's plan mode writes its plan to `~/.claude/plans/`, outside the repository, under a generated name. When I like a plan-mode plan but don't want to run it now, "save this as a plan" puts it in the repo, next to the code it's about.
- **Dispatch uses a subagent.** The whole plan goes into the prompt, not a link to it. The subagent starts with a fresh context, so the plan has to stand on its own, and that's the test of a good plan. If the plan turns out to be wrong, the agent stops and reports instead of improvising.
- **Your git rules win.** Dispatch reads `CLAUDE.md` and `AGENTS.md` first. In my main project agents may not commit or create branches, so dispatched work lands in my working tree and I review the diff. In a project without such rules, dispatch creates a `planner/<area>-<slug>` branch, and parallel dispatches each get their own git worktree.
- **Done means verified.** Sync doesn't move a plan to `done/` because something merged. It runs the plan's own verification first.

## What makes a plan good

The template has these sections: Status, Problem, Cause, Change, Non-goals, Risk, Verification, Open questions and Log. A few rules do most of the work:

- **The Cause section is the value.** An agent could work out everything else again. "The cache key leaves out the locale" is a cause. "The cache is broken" is not.
- **Every plan ends with a check that can fail.** "Looks better" isn't a check. "The test that failed before now passes" is.
- **A plan that needs more than a page is two plans.** Write the first one and put the rest back in `drafts/`.
- **Line numbers are pinned to a commit**, so a reader can tell whether they still apply.
- **Be honest about size.** If it's a day of work, the plan says a day.

## Set it up

Open Claude Code in your project and paste:

```text
Read https://mehmetkose.github.io/blog/planner-for-claude-code/ and set up the planner workflow in this project.
```

### Steps for the agent

1. If `.claude/skills/planner/` or `planner/` already exists, stop and ask before changing anything.
2. Download the three skill files with `curl`, so they arrive exactly as written:

```sh
base=https://mehmetkose.github.io/blog/planner-for-claude-code
mkdir -p .claude/skills/planner
for f in SKILL.md TEMPLATE.md STARTER-README.md; do
  curl -fsSL "$base/$f" -o ".claude/skills/planner/$f"
done
```

3. Read `.claude/skills/planner/SKILL.md` and do its **Init** move: create the five folders, each with a `.gitkeep`, and write `planner/README.md` from `STARTER-README.md` with area prefixes that fit this project.
4. Don't edit the downloaded files and don't commit. Report the tree you created and the prefixes you chose.

The result:

```text
.claude/skills/planner/
  SKILL.md
  TEMPLATE.md
  STARTER-README.md
planner/
  README.md
  drafts/  next/  open/  done/  discarded/
```

To have `/planner` in every project, put the three files in `~/.claude/skills/planner/` instead, and run `/planner init` in each new project.

## The files

These are the same files the `curl` commands download.

### SKILL.md

````markdown
---
name: planner
description: Manage the planner/ work queue — capture an idea, save the current conversation as a plan, research a draft into a real plan, hand it to an agent, and verify it landed. Invoked as /planner add, /planner save, /planner write, /planner dispatch, /planner sync, /planner status, /planner init. Also triggers on natural language for the save move: "save this as a plan", "turn this into a plan", "write this up as a plan", "add this to the planner", "plan this for later", or any request to record what we have been discussing as work to do later.
---

# Planner

A queue skill. `planner/` holds one markdown file per piece of work; the folder it
sits in is its state. This skill moves files between those folders and writes
their contents. It does not decide what the project should do next — that's the
user's call — and it does not do the implementation work itself except when
dispatching to a subagent.

```
planner/
  README.md      the index: what is next, what is open
  drafts/        captured, not thought through
  next/          written up, ready to dispatch
  open/          an agent is on it
  done/          merged and verified
  discarded/     decided against, reason kept
```

Naming is `<area>-<slug>.md`. Area prefixes are listed in `planner/README.md` — read
it before naming a new file and use an existing prefix if one fits. If none fits,
add a prefix to the README's list in the same move and say so.

## Routing

Read the argument after `/planner` and run exactly that move. No argument, or an
unrecognised one: run **status**.

| Invocation | Move |
| --- | --- |
| `/planner add <anything>` | [Add](#add) |
| `/planner save`, or "save this as a plan" | [Save](#save) |
| `/planner write [file]` | [Write](#write) |
| `/planner dispatch [file]` | [Dispatch](#dispatch) |
| `/planner sync` | [Sync](#sync) |
| `/planner status`, `/planner` | [Status](#status) |
| `/planner init` | [Init](#init) |

**Add or Save?** Both capture. The difference is where the substance lives. If the
user hands you a sentence you have not worked on — "retry failed webhooks with
backoff" — that's **Add**. If the substance is in the conversation you are
already in, that's **Save**, and it usually skips `drafts/` because the research
step has effectively already happened. When genuinely unclear, ask in one line.

Save is the only move that fires on natural language. Everything else needs its
explicit `/planner` invocation — do not silently dispatch, sync, or move files
because a conversation drifted near the subject.

---

## Add

Cheap capture. The user saw something and does not want to lose it. Speed is the
whole point: **do not investigate, do not read files, do not ask questions.**

1. Pick an area prefix and a slug from what they said.
2. Write `planner/drafts/<area>-<slug>.md`:

```markdown
# <one-line restatement of the idea>

Captured YYYY-MM-DD.

<their words, verbatim, plus any context already visible in this conversation —
a file path, an error string, a URL, a screenshot path. Nothing you had to
go looking for.>
```

3. Reply with one line: the path, nothing else.

Date every plan absolutely with today's date (`2026-09-12`), never "today" or
"last week".

If the idea plainly belongs to an existing draft, append to that file instead of
making a second one, and say which file you appended to.

---

## Save

Turn the conversation you are in into a plan. Triggered by "save this as a plan",
"turn this into a plan", "plan this for later", or `/planner save`.

A long discussion has usually already done the Write step's work — the cause got
found, the files got read, an approach got argued out. So this move writes a real
plan, not a one-line capture, and usually lands in `next/`.

If the conversation ran in plan mode, the approved plan file under
`~/.claude/plans/` is a good source. It lives outside the repository, though, so
the file in `planner/` has to stand on its own: copy the substance, never link to it.

### Where it lands

Read the conversation back before deciding. Land it in:

- **`next/`** — the discussion established a cause, an approach, and something
  checkable. Write it with [TEMPLATE.md](TEMPLATE.md), same standard as Write.
- **`drafts/`** — it was exploratory, or the cause is still a guess, or the scope
  is still moving. Write down where the thinking got to and what the next
  question is. Say in your reply that `/planner write` will finish it.

Do not inflate a musing into a `next/` plan because the transcript is long.
Length is not resolution. If you cannot fill Verification from the conversation,
it is a draft.

### Reading the conversation back

The transcript is a worse source than it looks, in specific ways:

- **Capture where it landed, not the path.** Conversations contain retracted
  claims, measurements that were corrected, and approaches tried and dropped. The
  plan states the final position only. A superseded finding written down as fact
  is how a plan sends an agent to redo a dead end.
- **The dead ends are worth a line each**, though — under Non-goals or Log, marked
  as already-rejected and why. That is the part of a discussion that is
  genuinely expensive to reconstruct, and no fresh agent can infer it.
- **Verify what was asserted but never checked.** Things get said mid-discussion
  with confidence and no tool call behind them. Anything load-bearing that was
  never actually looked at, look at now. This is the one place Save does fresh
  research.
- **Strip the context.** No "as discussed", no "the file above", no "that page",
  no bare pronouns, no reference to what is on screen. Every path written out in
  full, line numbers pinned to a commit hash. The reader has not seen this
  conversation — write as if the transcript will be gone, because it will be.
- **Separate done from to-do.** If some of the work already happened in this
  session, the plan covers only what is left. Note what already landed under
  Status, with the commit if there is one. Never write a plan whose first step is
  something you already did.

### Then

1. Pick `<area>-<slug>.md` from `planner/README.md`'s prefixes. Check `next/`,
   `open/`, and `drafts/` for a file on the same subject — append to it rather
   than opening a rival plan, and say which you appended to.
2. Write the file.
3. Reply with the path, the destination folder, and a three-line summary: cause,
   approach, verification. If it went to `drafts/`, say what is missing instead.

Never commit, branch, or dispatch as part of Save. It writes one file and stops.

---

## Write

Turn a draft into something an agent can execute without asking follow-ups. This
is the move that deserves real thinking — the reasoning happens here so the
dispatched agent can be cheap and mechanical.

Target: the named file, else the only draft, else list `drafts/` and ask which.

**Research before writing.** A plan built from assumptions is worse than no plan.

- Read the actual code the change touches. Name files and line numbers.
- `git log -S<symbol>` and `git log -p -- <path>` for why the current shape exists.
- Read the root `CLAUDE.md` and `AGENTS.md`, any nested ones in the folders the
  change touches, and the docs they point to, for the rules the change has to
  respect.
- Check `planner/done/` and `planner/discarded/` for an earlier attempt at the same
  thing.
- For anything visual, check it in a real browser before claiming what it looks
  like.
- Search `planner/next/` and `planner/open/` for overlap. If two plans would touch the
  same lines, say so in the plan.

A draft written by [Save](#save) may already carry Non-goals and Log entries
recording approaches that were tried and rejected. Keep them. Do not re-propose
something the draft already records as ruled out without saying why it is back.

Then write the plan over the draft using [TEMPLATE.md](TEMPLATE.md) and move it
to `planner/next/`.

Hold these standards:

- **Root cause, not symptom.** If the draft describes a symptom, the plan names
  the cause. If you could not find it, say so under Open questions rather than
  guessing.
- **Verifiable.** Every plan ends with a check that can fail. "Looks better" is
  not a check; "the export test that failed before now passes" is.
- **Scoped.** One plan is one reviewable change. If it splits, write the first
  one and drop the rest back into `drafts/` as separate files.
- **Honest about size.** If the work is a day, say a day.

Reply with the path and a three-line summary: cause, approach, verification.

---

## Dispatch

Hand a `next/` plan to an agent.

1. Target: the named file, else show `next/` and ask which. Never pick for them.
2. Decide where the work happens. The project's `CLAUDE.md` and `AGENTS.md` come
   first:
   - If they forbid branches or say to work in the working tree, work on the
     current branch, in the working tree, and do not create a branch.
   - If they say nothing, create a branch `planner/<area>-<slug>` from the default
     branch and work there. Never work directly on the default branch.
3. Move the plan to `planner/open/` and add to the file:

```markdown
## Dispatch

Dispatched YYYY-MM-DD on branch `planner/<area>-<slug>`.
```

   or, when the project's rules keep the work in the working tree:

```markdown
## Dispatch

Dispatched YYYY-MM-DD in the working tree on `<current branch>`, per AGENTS.md.
```

4. Launch one subagent (the Agent tool) with the **full text of the plan** in the
   prompt — the plan is the brief, not a pointer to one. The subagent has not
   seen this conversation. Tell it to implement, run the project's checks, follow
   the project's git rules, and report what it changed and what it could not do.
   Add: if the plan turns out to be wrong, stop and report rather than improvise.
5. When it reports, append its outcome to the plan's `## Log` and tell the user
   what landed. Do not commit or push unless they ask.

One plan per dispatch. Parallel dispatches are fine only if their file sets do not
overlap — check before launching a second. Two branches cannot share one
checkout, so on the branch path give each parallel agent its own worktree (the
Agent tool's `isolation: "worktree"`). If the project forbids worktrees, dispatch
one at a time.

---

## Sync

Reconcile the queue with reality. Run it after merging something, or when the
queue has gone stale.

For each file in `open/`:

1. Did the change land? For a branch dispatch: does the branch exist, and is it
   merged into the default branch? For a working-tree dispatch: is the change in
   the working tree or in a commit since the dispatch date?
2. `git log --oneline <default branch> -20` and `git diff` — confirm the change is
   actually there, not just that a branch was merged.
3. Run the plan's own Verification. Merged is not the same as done.

Then:

- Landed and verified → append `Completed YYYY-MM-DD.` and move it to `done/`.
- Landed but the check fails → leave it in `open/`, add what is still wrong to the
  Log, and report it. Do not quietly close it.
- Abandoned → move it to `discarded/` with a `## Discarded` section giving the
  date and the reason. The reason is the point of keeping the file.
- Branch merged but no plan → mention it; offer to backfill a `done/` entry.

Finally rewrite the **Index** section of `planner/README.md`: one line per file in
`next/` and `open/`, `- [title](next/file.md) — one-clause hook`, and for open
files the branch (or "working tree"). Leave the rest of the README alone.

Report as a short table: moved, still open, needs attention.

---

## Status

Read-only. Count each folder, then list `next/` and `open/` with titles — from the
files, not the README, since the README can be stale. Flag anything in `open/`
whose dispatch date is over a week old, and any branch dispatch whose branch is
gone. If `planner/` does not exist, say so and offer `/planner init`.

No file writes in this move.

---

## Init

Set up `planner/` in a project that does not have it. If `planner/` already exists,
say so and stop.

1. Create `planner/drafts/`, `planner/next/`, `planner/open/`, `planner/done/` and
   `planner/discarded/`, each with an empty `.gitkeep` so git keeps the empty
   folders.
2. Write `planner/README.md` from [STARTER-README.md](STARTER-README.md). Replace
   the whole area list under Naming, examples included, with prefixes for this
   project: one per top-level area of the repository (look at the top-level
   folders and the docs), each with a one-clause description of what it covers.
   Keep the list short; four to ten prefixes is typical. Keep `docs-` and
   `build-` if the project has docs or tooling. Change nothing else in the file.
3. Reply with the tree you created and the prefix list. Do not commit.

---

## Rules across every move

- Move plans with `git mv` when the file is tracked, so the file's history is how
  a plan's second attempt finds its first. Use plain `mv` only when the file is
  not tracked yet (`git mv` refuses untracked files). Never copy-then-delete.
- One state per file. A plan in two folders is a bug; fix it and say so.
- Absolute dates.
- Plans are prose for a reader who has not seen this conversation. No "as
  discussed", no bare pronouns, no references to what is on screen right now.
- Never edit a `done/` plan to make it look cleaner. It is a record.
- Never commit, push, or open a pull request in any move unless the user asks in
  that message. The project's `CLAUDE.md` and `AGENTS.md` git rules always win.
- The user works alone: no assignees, no reviewers, no status-for-standup
  padding. Write for one person and their agents.
````

### TEMPLATE.md

````markdown
# Plan template

The shape a `next/` plan takes. Drop any section that would be empty rather than
writing "N/A" under it — except Verification, which is never optional.

```markdown
# <Title: the change, not the symptom>

## Status

Drafted YYYY-MM-DD against `<commit>`. Ready to dispatch. About <honest size> of work.
Source: <where this came from — a draft capture, a conversation on YYYY-MM-DD,
a bug report, a review note.>

## Problem

What is wrong, in terms someone could check for themselves. Cite files and lines
at a named commit: `src/server/routes.ts:41` at `ffecce8`. If the problem is
measurable, give the measurement, not the impression.

## Cause

Why it is wrong. The mechanism, not the location. "The cache key leaves out the
locale, so the second language reads the first one's entry" — not "the cache is
broken". If the cause is not pinned down, say that plainly here and put what is
still unknown under Open questions.

## Change

The work, as steps a fresh agent can follow in order. Name every file it touches.
Show the before and after for anything non-obvious.

1. …
2. …

## Non-goals

What this plan deliberately leaves alone, so the agent does not widen it. Point at
the plan or draft that covers the rest, if there is one. Approaches already tried
and rejected go here too, one line each with the reason.

## Risk

What this could break, and how it would show. Which callers, pages or users are in
the blast radius. Shared code reaches everything that imports it; say which
callers you checked.

## Verification

The check that can fail. Concretely:

- The project's own checks pass (the test, lint and type-check commands its
  `CLAUDE.md` or `AGENTS.md` names).
- The command, request or test that showed the problem fails before the change
  and passes after it.
- What must not change, and how you know it did not: an unchanged snapshot, a
  byte-identical output, a test that already covered it.

## Open questions

Only things that would change the approach. An agent should be able to start
without an answer to any of these; if it cannot, the plan is not ready.

## Log

Appended as work happens. Dispatch dates, agent outcomes, what did not work.
```

## Notes

**Sizing.** A plan that cannot be described in a page is two plans.

**Line numbers go stale.** Always pin them to a commit hash so a reader can tell
whether they still apply.

**The Cause section is the value.** Everything else an agent could rederive. If
you find yourself writing a plan with a thin Cause section, the research step
is not finished.
````

### STARTER-README.md

This becomes `planner/README.md`. Init replaces the placeholder prefix with ones for your project.

````markdown
# Planner

The work queue. One markdown file per piece of work, moving through folders as its
state changes. Plain files in git, so any agent — and I, six weeks from now — can
read the whole queue without asking anyone.

Run `/planner` to work the queue. It has six moves: `add`, `save`, `write`,
`dispatch`, `sync`, and `status`. A seventh, `init`, created this folder.

`add` captures a one-line idea into `drafts/`. `save` writes up the conversation
you are already in — saying "save this as a plan" is enough, no slash command —
and lands in `next/` when the discussion settled a cause and a check, `drafts/`
when it did not. `write` researches a draft into a ready plan. `dispatch` hands
one to an agent. `sync` verifies what landed and refreshes the index below.
`status` just reports.

## Folders

| Folder | Means |
| --- | --- |
| `drafts/` | Captured, not thought through. One line is fine. |
| `next/` | Written up and ready to hand to an agent. |
| `open/` | An agent is on it, or a branch exists. |
| `done/` | Merged and verified. |
| `discarded/` | Decided against. The reason stays in the file. |

## Naming

`<area>-<slug>.md`, lowercase, hyphens. The area prefix is what the change
touches, so `ls` groups related work:

- `<area>-` — <what it covers: a folder, a service, a part of the product>
- `docs-` — docs, `CLAUDE.md`, `AGENTS.md`
- `build-` — build, tooling, CI, scripts

## Index

Kept current by `/planner sync`. Not synced yet.

### Next

Nothing queued.

### Open

Nothing open.
````
