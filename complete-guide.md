# Git & GitHub — Complete Reference Guide

> A practical guide covering everything from basics to advanced Git workflows.

---

## Table of Contents

1. [Initial Setup](#1-initial-setup)
2. [Creating a Repository](#2-creating-a-repository)
3. [Basic Workflow](#3-basic-workflow)
4. [Checking Status & History](#4-checking-status--history)
5. [Branching](#5-branching)
6. [Merging](#6-merging)
7. [Remote Repositories (GitHub)](#7-remote-repositories-github)
8. [Pushing & Pulling](#8-pushing--pulling)
9. [Undoing Changes](#9-undoing-changes)
10. [Stashing](#10-stashing)
11. [Tags & Releases](#11-tags--releases)
12. [.gitignore](#12-gitignore)
13. [Collaboration Workflow](#13-collaboration-workflow)
14. [Resolving Merge Conflicts](#14-resolving-merge-conflicts)
15. [Git Log & Searching](#15-git-log--searching)
16. [Rebase](#16-rebase)
17. [Cherry Pick](#17-cherry-pick)
18. [Common Scenarios & Fixes](#18-common-scenarios--fixes)
19. [GitHub-Specific Features](#19-github-specific-features)
20. [Quick Reference Cheat Sheet](#20-quick-reference-cheat-sheet)

---

## 1. Initial Setup

Run these once after installing Git:

```bash
# Set your name and email (used in every commit)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your config
git config --list

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Set default editor (optional)
git config --global core.editor "code --wait"   # VS Code
```

---

## 2. Creating a Repository

### Start a new project
```bash
mkdir my-project
cd my-project
git init
```

### Clone an existing project from GitHub
```bash
git clone https://github.com/username/repo-name.git

# Clone into a specific folder
git clone https://github.com/username/repo-name.git my-folder
```

---

## 3. Basic Workflow

The core Git cycle: **Edit → Stage → Commit**

```
Working Directory  →  Staging Area  →  Repository
   (your files)       (git add)        (git commit)
```

### Stage files (prepare for commit)
```bash
# Stage a specific file
git add filename.txt

# Stage multiple files
git add file1.txt file2.txt

# Stage all changed files
git add .

# Stage all files (including deletions)
git add -A
# or
git add --all
```

### Commit (save a snapshot)
```bash
# Commit with a message
git commit -m "Your commit message"

# Stage all tracked files AND commit in one step
git commit -am "Your commit message"

# Commit with a detailed message (opens editor)
git commit
```

### Good commit message examples
```
feat: add login page with BCrypt authentication
fix: resolve duplicate JSTL taglib declaration
docs: update README with setup instructions
refactor: extract password hashing to PasswordUtil
style: format CSS for mobile responsiveness
```

---

## 4. Checking Status & History

```bash
# See what files are modified/staged/untracked
git status

# Short status (compact view)
git status -s

# See commit history
git log

# Compact one-line history
git log --oneline

# History with graph (shows branches visually)
git log --oneline --graph --all

# See last 5 commits
git log -5

# See what changed in each commit
git log -p

# See changes not yet staged
git diff

# See changes that are staged (ready to commit)
git diff --staged

# See changes in a specific file
git diff filename.txt
```

---

## 5. Branching

Branches let you work on features without affecting the main code.

```
main ─────●─────●─────●─────●───── (stable code)
                 \           /
feature    ───────●────●────  (your work)
```

```bash
# List all branches (* = current branch)
git branch

# List all branches including remote
git branch -a

# Create a new branch
git branch feature-login

# Switch to a branch
git checkout feature-login
# or (modern way)
git switch feature-login

# Create AND switch to a new branch (shortcut)
git checkout -b feature-login
# or
git switch -c feature-login

# Rename current branch
git branch -m new-name

# Rename a specific branch
git branch -m old-name new-name

# Delete a branch (only if merged)
git branch -d feature-login

# Force delete a branch (even if not merged)
git branch -D feature-login
```

---

## 6. Merging

Combine changes from one branch into another.

```bash
# Step 1: Switch to the branch you want to merge INTO
git checkout main

# Step 2: Merge the feature branch into main
git merge feature-login

# Merge with a commit message
git merge feature-login -m "Merge login feature"

# Cancel a merge (if there are conflicts and you want to abort)
git merge --abort
```

---

## 7. Remote Repositories (GitHub)

A "remote" is a copy of your repo on GitHub (or GitLab, Bitbucket, etc.)

```bash
# See your remotes
git remote -v

# Add a remote (usually done once after git init)
git remote add origin https://github.com/username/repo-name.git

# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git

# Remove a remote
git remote remove origin

# See detailed info about a remote
git remote show origin
```

### Connecting a local project to GitHub (first time)
```bash
# 1. Create repo on GitHub (DO NOT add README/gitignore)
# 2. In your local project:
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

---

## 8. Pushing & Pulling

### Push (upload local commits to GitHub)
```bash
# Push to remote
git push origin main

# Push and set upstream (first time for a branch)
git push -u origin main
# After -u is set, you can just do:
git push

# Push all branches
git push --all

# Push tags
git push --tags

# Force push (CAUTION: overwrites remote history)
git push --force
# Safer force push:
git push --force-with-lease
```

### Pull (download remote changes to local)
```bash
# Pull = Fetch + Merge
git pull origin main
# If upstream is set:
git pull

# Fetch only (download but don't merge)
git fetch origin

# See what changed on remote without merging
git fetch origin
git log origin/main --oneline
```

---

## 9. Undoing Changes

### Unstage a file (undo git add)
```bash
git restore --staged filename.txt
# or (older way)
git reset HEAD filename.txt
```

### Discard changes in a file (go back to last commit)
```bash
git restore filename.txt
# or (older way)
git checkout -- filename.txt
```

### Undo the last commit (keep changes staged)
```bash
git reset --soft HEAD~1
```

### Undo the last commit (keep changes unstaged)
```bash
git reset HEAD~1
# or
git reset --mixed HEAD~1
```

### Undo the last commit (DELETE changes completely)
```bash
git reset --hard HEAD~1
# ⚠️ DANGEROUS: Changes are gone forever
```

### Undo a specific commit (create a new reverse commit)
```bash
git revert <commit-hash>
# This is SAFE — it doesn't delete history
```

### Amend the last commit (fix message or add files)
```bash
# Change last commit message
git commit --amend -m "New message"

# Add forgotten files to last commit
git add forgotten-file.txt
git commit --amend --no-edit
```

### Reset summary
```
--soft   → undo commit, keep staged
--mixed  → undo commit, keep unstaged (default)
--hard   → undo commit, DELETE everything ⚠️
```

---

## 10. Stashing

Save uncommitted work temporarily (like a clipboard).

```bash
# Stash your current changes
git stash

# Stash with a message
git stash save "work in progress on login"

# See all stashes
git stash list

# Apply most recent stash (keeps it in stash list)
git stash apply

# Apply AND remove from stash list
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Delete a specific stash
git stash drop stash@{0}

# Delete all stashes
git stash clear

# See what's in a stash
git stash show stash@{0} -p
```

### When to use stash?
- You need to switch branches but have uncommitted work
- You want to pull but have local changes
- You want to temporarily set aside work

---

## 11. Tags & Releases

Tags mark specific points in history (like version numbers).

```bash
# Create a lightweight tag
git tag v1.0

# Create an annotated tag (recommended)
git tag -a v1.0 -m "Version 1.0 release"

# Tag a specific commit
git tag -a v1.0 <commit-hash> -m "Version 1.0"

# List all tags
git tag

# See tag details
git show v1.0

# Push a tag to GitHub
git push origin v1.0

# Push all tags
git push origin --tags

# Delete a local tag
git tag -d v1.0

# Delete a remote tag
git push origin --delete v1.0
```

---

## 12. .gitignore

Tell Git which files/folders to ignore.

Create a `.gitignore` file in your project root:

```gitignore
# Compiled files
*.class
*.jar
*.war
target/

# IDE files
.idea/
.vscode/
*.iml

# OS files
.DS_Store
Thumbs.db

# Environment/secrets
.env
*.config

# Logs
*.log

# Node modules
node_modules/

# Database files
*.sql.bak
```

```bash
# If you already committed a file and want to ignore it now:
git rm --cached filename.txt
# Then add it to .gitignore and commit

# Remove a folder from tracking
git rm -r --cached folder-name/
```

---

## 13. Collaboration Workflow

### Fork & Pull Request Workflow (contributing to others' repos)

```bash
# 1. Fork the repo on GitHub (click Fork button)

# 2. Clone YOUR fork
git clone https://github.com/YOUR-USERNAME/repo.git

# 3. Add original repo as "upstream"
git remote add upstream https://github.com/ORIGINAL-OWNER/repo.git

# 4. Create a feature branch
git checkout -b my-feature

# 5. Make changes, commit
git add .
git commit -m "Add my feature"

# 6. Push to YOUR fork
git push origin my-feature

# 7. Go to GitHub → Create Pull Request

# 8. Keep your fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Team Workflow (shared repo)
```bash
# 1. Clone the shared repo
git clone https://github.com/team/project.git

# 2. Create a feature branch
git checkout -b feature/login-page

# 3. Work, commit regularly
git add .
git commit -m "Add login form UI"

# 4. Push your branch
git push -u origin feature/login-page

# 5. Create Pull Request on GitHub

# 6. After PR is merged, update local main
git checkout main
git pull origin main

# 7. Delete your feature branch
git branch -d feature/login-page
```

---

## 14. Resolving Merge Conflicts

Conflicts happen when two branches changed the same line.

### What a conflict looks like:
```
<<<<<<< HEAD
Your changes (current branch)
=======
Their changes (incoming branch)
>>>>>>> feature-branch
```

### How to resolve:
```bash
# 1. Git tells you which files have conflicts
git status

# 2. Open the conflicted file and choose what to keep:
#    - Keep yours
#    - Keep theirs
#    - Keep both
#    - Write something new
#    Remove the <<<<<<<, =======, >>>>>>> markers

# 3. Stage the resolved file
git add resolved-file.txt

# 4. Complete the merge
git commit -m "Resolve merge conflict"

# To abort and go back:
git merge --abort
```

---

## 15. Git Log & Searching

```bash
# Pretty log
git log --oneline --graph --all --decorate

# Search commits by message
git log --grep="login"

# Search commits by author
git log --author="Priya"

# See commits that changed a specific file
git log -- filename.txt

# See who changed each line of a file
git blame filename.txt

# Search for a string in all files
git grep "TODO"

# See what changed between two commits
git diff commit1..commit2

# See what changed between two branches
git diff main..feature-branch
```

---

## 16. Rebase

Rebase replays your commits on top of another branch (cleaner history than merge).

```bash
# You're on feature branch, rebase onto main
git checkout feature
git rebase main

# Interactive rebase (squash, reorder, edit commits)
git rebase -i HEAD~3
# Opens editor where you can:
#   pick   = keep commit
#   squash = merge into previous commit
#   reword = change commit message
#   drop   = delete commit

# Abort a rebase
git rebase --abort

# Continue after resolving conflicts
git rebase --continue
```

### Merge vs Rebase
```
MERGE (preserves history):
main:    A─B─C───────F
              \      /
feature:       D──E─

REBASE (linear history):
main:    A─B─C─D'─E'
```

> **Rule:** Never rebase commits that have been pushed and shared with others.

---

## 17. Cherry Pick

Apply a specific commit from another branch.

```bash
# Apply one commit
git cherry-pick <commit-hash>

# Apply multiple commits
git cherry-pick <hash1> <hash2>

# Cherry pick without committing (just stage)
git cherry-pick <hash> --no-commit
```

---

## 18. Common Scenarios & Fixes

### "I committed to the wrong branch"
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Switch to correct branch
git checkout correct-branch

# Commit there
git commit -m "My changes"
```

### "I need to update my branch with latest main"
```bash
git checkout my-branch
git merge main
# or
git rebase main
```

### "I want to see an old version of a file"
```bash
git show HEAD~3:path/to/file.txt
```

### "I accidentally deleted a file"
```bash
git restore deleted-file.txt
```

### "I want to undo everything and go back to last commit"
```bash
git checkout -- .
# or
git restore .
```

### "I pushed sensitive data (password, API key)"
```bash
# Change the password/key immediately!
# Then remove from history:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" HEAD
git push --force
```

### "I want to rename master to main"
```bash
git branch -m master main
git push -u origin main
# On GitHub: Settings → Branches → Change default to main
git push origin --delete master
```

### "I cloned a repo and want to push to my own GitHub"
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/your-repo.git
git push -u origin main
```

---

## 19. GitHub-Specific Features

### SSH Authentication (avoid typing password)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy the public key
cat ~/.ssh/id_ed25519.pub
# Add it on GitHub: Settings → SSH Keys → New SSH Key

# Use SSH URL instead of HTTPS
git remote set-url origin git@github.com:username/repo.git
```

### GitHub CLI (gh)
```bash
# Install: https://cli.github.com/

# Login
gh auth login

# Create a repo
gh repo create my-project --public

# Create a Pull Request
gh pr create --title "Add login" --body "Login page with BCrypt"

# List PRs
gh pr list

# View PR
gh pr view 1
```

### GitHub Pages (free hosting)
```bash
# Push your site to a gh-pages branch
git checkout -b gh-pages
git push origin gh-pages
# Enable in: GitHub → Settings → Pages
# URL: https://username.github.io/repo-name/
```

---

## 20. Quick Reference Cheat Sheet

| Action | Command |
|--------|---------|
| **Initialize** | `git init` |
| **Clone** | `git clone <url>` |
| **Status** | `git status` |
| **Stage all** | `git add -A` |
| **Commit** | `git commit -m "message"` |
| **Push** | `git push origin main` |
| **Pull** | `git pull origin main` |
| **New branch** | `git checkout -b branch-name` |
| **Switch branch** | `git checkout branch-name` |
| **Merge** | `git merge branch-name` |
| **Log** | `git log --oneline` |
| **Diff** | `git diff` |
| **Stash** | `git stash` |
| **Unstash** | `git stash pop` |
| **Undo add** | `git restore --staged file` |
| **Undo changes** | `git restore file` |
| **Undo commit** | `git reset --soft HEAD~1` |
| **Amend commit** | `git commit --amend` |
| **Revert commit** | `git revert <hash>` |
| **Tag** | `git tag -a v1.0 -m "msg"` |
| **Delete branch** | `git branch -d name` |
| **Rename branch** | `git branch -m old new` |
| **Remote add** | `git remote add origin <url>` |
| **Fetch** | `git fetch origin` |
| **Blame** | `git blame file` |
| **Cherry pick** | `git cherry-pick <hash>` |

---

*Created for quick reference. Keep this in your repo and come back whenever you need a Git command!*
