# Development Branch Setup

## Branch Information
- **Branch Name**: `development`
- **Purpose**: Development and testing of new features before merging to main
- **Created**: December 2024

## Vercel Deployment Setup

### Option 1: Automatic Preview Deployments (Recommended)
Vercel automatically creates preview deployments for all branches. Your development branch should be available at:
- Preview URL Pattern: `referral-network-react-[branch-name]-[vercel-account].vercel.app`
- Example: `referral-network-react-development-[your-vercel-account].vercel.app`

### Option 2: Create a Separate Vercel Project
If you want a completely separate environment:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import the same GitHub repository
4. In the configuration:
   - Set the **Production Branch** to `development`
   - Give it a different project name (e.g., `referral-network-react-dev`)
5. Deploy

This will create a separate Vercel project that tracks the development branch.

### Option 3: Configure Branch Deployments in Existing Project
In your current Vercel project settings:
1. Go to Settings → Git
2. Under "Production Branch", you can see `main` is set
3. All other branches (including `development`) will get preview deployments
4. Find your preview URL in the Vercel dashboard under "Preview Deployments"

## Working with the Development Branch

### Switching Between Branches
```bash
# Switch to development branch
git checkout development

# Switch back to main branch
git checkout main
```

### Keeping Development Branch Updated
```bash
# While on development branch, pull latest changes from main
git merge main

# Or rebase on main (cleaner history)
git rebase main
```

### Making Changes in Development
```bash
# Make your changes
git add .
git commit -m "feat: new feature description"
git push origin development
```

### Merging to Main (when ready)
```bash
# First, switch to main
git checkout main

# Merge development into main
git merge development

# Push to main
git push origin main
```

### Creating a Pull Request
Alternatively, create a Pull Request on GitHub:
1. Go to: https://github.com/renzoservera-distillery/-referral-network-react/pull/new/development
2. Review changes
3. Merge when ready

## Current Setup
- **Main Branch**: Production environment at https://referral-network-react-bmx9.vercel.app/
- **Development Branch**: Will have its own preview URL once Vercel processes it

## Environment Variables
If you need different environment variables for development:
1. Go to Vercel Project Settings
2. Navigate to Environment Variables
3. Add variables specific to Preview/Development environment

## Notes
- All commits to `development` branch will trigger automatic deployments
- Preview deployments have a unique URL that doesn't change
- Production (`main` branch) remains unaffected by development branch changes