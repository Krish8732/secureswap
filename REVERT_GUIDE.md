# Git Revert Guide

This guide explains how to revert your codebase to a previous state using Git.

## Before Making Major Changes

1. **Save your current state**: Always commit your current changes before starting major features:
   ```bash
   git add .
   git commit -m "chore: save current changes before [feature name]"
   ```

2. **Note the commit hash**: After committing, note the commit hash (e.g., `b3a53b5`) for easy reversion.

## Reverting Changes

### Method 1: Hard Reset (Discards all changes after the target commit)
```bash
git reset --hard <commit-hash>
```
- This completely removes all commits and changes after the specified commit
- Use this when you want to completely undo a feature and go back to a clean state
- **Warning**: This permanently deletes all work after that commit

### Example command to revert to a specific commit (replace with your commit hash):
```bash
git reset --hard b3a53b5
```

### Method 2: Soft Reset (Keeps changes as uncommitted)
```bash
git reset --soft <commit-hash>
```
- This keeps the changes in your working directory but uncommitted
- Useful if you want to recommit the changes differently

### Method 3: Create a Revert Commit (Safer for shared repositories)
```bash
git revert <commit-hash>
```
- Creates a new commit that undoes the changes from the specified commit
- Safer for shared repositories as it maintains history

## Finding Commit Hashes

### View recent commits:
```bash
git log --oneline -10
```

### Find commits by message:
```bash
git log --grep="save current changes"
```

## Example Workflow

1. **Before starting a feature:**
   ```bash
   git add .
   git commit -m "chore: save current changes before adding currency feature"
   # Note: commit hash is b3a53b5
   ```

2. **After implementing the feature:**
   ```bash
   git add .
   git commit -m "feat: add currency feature"
   ```

3. **If you need to revert the feature:**
   ```bash
   git reset --hard b3a53b5
   ```

## Best Practices

- Always commit before major changes
- Use descriptive commit messages for save points
- Consider using branches for experimental features
- Test your application after reverting to ensure everything works

## Emergency Recovery

If you accidentally reset and lost important changes:
```bash
git reflog
git reset --hard <reflog-hash>
```

The reflog shows all recent HEAD movements and can help recover lost commits.
