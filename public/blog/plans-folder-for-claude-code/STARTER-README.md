# Plans

The work queue. One markdown file per piece of work, moving through folders as its
state changes. Plain files in git, so any agent — and I, six weeks from now — can
read the whole queue without asking anyone.

Run `/plans` to work the queue. It has six moves: `add`, `save`, `write`,
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

Kept current by `/plans sync`. Not synced yet.

### Next

Nothing queued.

### Open

Nothing open.
