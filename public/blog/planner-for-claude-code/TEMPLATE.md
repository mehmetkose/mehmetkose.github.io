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
