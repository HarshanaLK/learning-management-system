# Privacy policy null/empty content fix

## Problem

Both the public `/privacy-policy` Inertia page and the admin `/privacy-policy/edit` page accessed `privacyPolicy.content` directly. When the `privacy_policies` table has no row, the controller returned `null`, causing a React/SSR exception.

## Changes

- The controller always returns `{ content: '' }` when no policy exists, using the existing privacy-policy repository.
- The public and admin React pages also handle null or missing props defensively.
- Empty strings, whitespace-only text, and Quill's blank markup (`<p><br></p>`) display a friendly message instead of blank content or an exception.
- The visitor acceptance controls are not shown until there is policy text to read.
- The admin editor remains accessible so an administrator can create the first policy.
- Feature tests cover no row, empty string, saved content, and the admin empty state.

No database migration or seeded privacy-policy text is required. The database column is already present. The fix intentionally does not invent privacy-policy/legal text.

## Local verification

```bash
php artisan test tests/Feature/PrivacyPolicyTest.php
npm ci
npm run build
```

`php artisan test` requires project dependencies and a configured *testing* database. Do not run tests against production data.

## Update AWS EC2 through GitHub CI/CD

Copy the changed files into your GitHub checkout, commit, and push them. Your deployment script fetches `main` and uses `git reset --hard origin/main`, so editing tracked files directly on EC2 will not persist.

After the workflow succeeds, visit `https://YOUR_LMS_HOSTNAME/privacy-policy` and sign in as an admin to visit `/privacy-policy/edit`.

If the editor already has legitimate HTML from ReactQuill, it will display as before. Content in the database is rendered as HTML, so limit editing to trusted administrators and consider HTML sanitization separately.
