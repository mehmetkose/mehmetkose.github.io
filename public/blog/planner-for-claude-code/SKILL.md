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
