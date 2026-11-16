# LMS AWS EC2 + RDS + GitHub Actions deployment kit

Tailored to the provided LMS Laravel 11 + Inertia React + Vite SSR + MySQL code.
This kit includes infrastructure configuration samples, not a running AWS deployment.

## Important: do not launch publicly before code/security review

- Laravel 11 security support has ended; the existing Composer lock may have security advisories. The GitHub Actions workflow intentionally fails when `composer audit --locked` fails. Fix advisories before public access.
- Remove and rotate exposed Vimeo credentials and any other leaked API keys.
- Fix the migration rollback for `address`: the original create-users migration owns `address`, so the personal-details migration's `down()` must NOT drop `address`.
- Seed test accounts only into staging/local databases, not production.
- SSR build depends on `npm run build`, which includes `tsc && vite build && vite build --ssr`. Test this before production.
- The app uses storage/app and storage/app/public; keep `/var/www/lms/storage` persistent across deployments.

## Files

- `.github/workflows/deploy.yml`: GitHub-hosted CI + GitHub OIDC -> SSM custom document deploy
- `aws/LMS-Deploy-document.yaml`: constrained SSM document (no arbitrary parameters)
- `aws/github-oidc-trust-policy.json`: trust policy TEMPLATE (replace owner/repo IDs and AWS account ID)
- `aws/github-ssm-permissions.json`: scoped IAM policy TEMPLATE (replace account ID, instance ID and region)
- `server/deploy-lms`: root-owned script; runs application commands as lmsdeploy
- `nginx/lms.conf`: Nginx HTTP config; run Certbot to add HTTPS
- `systemd/lms-queue.service`: long-running Laravel queue worker
- `systemd/lms-ssr.service`: Inertia SSR daemon
- `examples/.env.production.example`: illustrative server .env values; never commit real values

## Deployment outline

1. Clean secrets, fix migrations, run `composer audit --locked` and `npm run build` locally.
2. Create EC2 Ubuntu 24.04 and RDS MySQL in the same VPC; RDS not publicly accessible.
3. Attach AmazonSSMManagedInstanceCore to the EC2 instance role, connect through Session Manager.
4. Install PHP 8.3, Nginx, Composer, Git, Node 22, Certbot and MySQL client on EC2.
5. Create Linux user `lmsdeploy`; clone your repo into `/var/www/lms`; use a read-only deploy key for private repos.
6. Create a private RDS DB and least-privilege `lms_app` DB user; configure server-side `/var/www/lms/.env`.
7. Create HTTPS hostname, install Nginx config, obtain Certbot cert.
8. Copy `systemd` units into `/etc/systemd/system` and run `systemctl daemon-reload`.
9. Copy `server/deploy-lms` to `/usr/local/bin/deploy-lms`, replace `YOUR_HOSTNAME`, then `chmod 755` and `chown root:root` it.
10. Run `/usr/local/bin/deploy-lms` once manually. Check `curl -I https://YOUR_HOSTNAME/up`, queue, SSR, login and uploads.
11. Create IAM GitHub OIDC provider and role. **New GitHub repositories created after July 15, 2026 use immutable owner/repository IDs in the OIDC subject**; use the matching template or update for legacy subjects.
12. Create SSM Command document `LMS-Deploy` from its YAML.
13. Create GitHub Actions variables: `AWS_REGION`, `AWS_ROLE_ARN`, `EC2_INSTANCE_ID`.
14. Copy workflow into the repository at `.github/workflows/deploy.yml`, protect main, push changes, check Actions.

## EC2 commands (Ubuntu 24.04)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git unzip curl ca-certificates gnupg composer mysql-client \
  php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml \
  php8.3-curl php8.3-zip php8.3-bcmath php8.3-gd php8.3-intl

# Install Node.js 22 from the current official NodeSource installation instructions.
# Then verify `node -v` and `npm -v`.

sudo adduser --disabled-password --gecos '' lmsdeploy
sudo usermod -aG www-data lmsdeploy
sudo mkdir -p /var/www/lms
sudo chown -R lmsdeploy:www-data /var/www/lms
sudo -u lmsdeploy git clone https://github.com/GITHUB_OWNER/GITHUB_REPO.git /var/www/lms

sudo cp nginx/lms.conf /etc/nginx/sites-available/lms
# edit `server_name YOUR_HOSTNAME` before enabling
sudo ln -s /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/lms
sudo nginx -t && sudo systemctl reload nginx

sudo cp systemd/*.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable lms-queue lms-ssr

sudo cp server/deploy-lms /usr/local/bin/deploy-lms
sudo chown root:root /usr/local/bin/deploy-lms
sudo chmod 755 /usr/local/bin/deploy-lms
# edit health-check Host header placeholder before running.
```

**Note:** The commands above assume the kit contents have been copied to the EC2 host and that the current working directory is the extracted kit directory. Do not blindly run them from another folder. Read the main ChatGPT walkthrough for the initial database, SSL, and IAM setup.

## Deployment checks

```bash
sudo /usr/local/bin/deploy-lms
sudo systemctl status lms-queue --no-pager
sudo systemctl status lms-ssr --no-pager
sudo nginx -t
curl -I https://YOUR_HOSTNAME/up
```

A single in-place `git reset` deployment is suitable for an initial staging/single-instance site, but is not atomic or zero downtime. Upgrade to release-directory/blue-green deployment before business-critical use. Back up RDS and uploads and test schema migrations before deployment.
