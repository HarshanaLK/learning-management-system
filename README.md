<div align="center">

# LMS — Learning Management System

An open-source learning management platform built with **Laravel 11**, **Inertia.js**, **React**, **TypeScript**, **Tailwind CSS**, and **MySQL**.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.2%2B-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## About the Project

LMS is a full-stack web application for publishing, purchasing, managing, and completing online courses. It provides separate experiences for administrators and learners, including course management, lessons and modules, enrollment, payment processing, progress tracking, user profiles, and PDF certificate generation.

The application uses Laravel for the backend and API/business logic while Inertia.js connects the backend to a React + TypeScript frontend without requiring a separate REST API for the main web experience.

## Features

### Learners

- User registration and login
- Google OAuth authentication
- Password reset and email-verification flows
- Browse the public course catalog
- View detailed course information
- Enroll in and purchase courses
- Stripe Checkout payment flow
- Access purchased courses
- Navigate course modules and lessons
- Track lesson progress from 0–100%
- View ongoing and completed courses
- Generate and download PDF course certificates
- Manage personal profile information
- Manage education history and work experience

### Administrators

- Protected admin dashboard
- Create, edit, preview, and delete courses
- Manage course modules and lessons
- Manage course images, instructor images, and course videos
- Manage students
- Search, filter, sort, and paginate management data
- View course purchase-related information
- Manage application settings
- Manage privacy-policy content

### Platform

- Responsive React UI with Tailwind CSS
- Vimeo integration for video-related functionality
- Stripe integration for course payments
- SMTP email support
- Contact form and newsletter subscriptions
- Repository-pattern backend architecture
- Database-backed sessions, cache, and queues
- Laravel Sanctum support
- PDF generation with Dompdf

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 11, PHP 8.2+ |
| Frontend | React 18, TypeScript |
| App bridge | Inertia.js |
| Styling | Tailwind CSS |
| Build tool | Vite |
| Database | MySQL |
| Authentication | Laravel Breeze, Socialite, Google OAuth |
| Payments | Stripe / Laravel Cashier |
| Video | Vimeo API / Vimeo Player |
| PDF certificates | Dompdf |
| Testing | Pest / PHPUnit |
| Package managers | Composer, npm |

## Project Structure

```text
app/
├── Enums/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Requests/
│   └── Resources/
├── Models/
├── Notifications/
├── Providers/
└── Repositories/

database/
├── factories/
├── migrations/
└── seeders/

resources/
├── js/
│   ├── Components/
│   ├── Layouts/
│   ├── Pages/
│   └── types/
└── views/

routes/
├── auth.php
├── console.php
└── web.php
```

## Requirements

Make sure the following are installed before running the project:

- PHP **8.2 or newer**
- Composer **2.x**
- Node.js **18+**
- npm
- MySQL / MariaDB
- Git

You will also need the PHP extensions normally required by Laravel and the packages used by this project, such as OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, and Fileinfo.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Create the environment file

The repository should contain a **sanitized** `.env.example` with no real credentials.

Linux/macOS/Git Bash:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate a new Laravel application key:

```bash
php artisan key:generate
```

> Never commit your real `.env` file, API keys, passwords, OAuth secrets, Stripe secrets, Vimeo tokens, or SMTP credentials.

### 5. Create the database

Create a MySQL database, for example:

```sql
CREATE DATABASE lms;
```

Then update your local `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lms
DB_USERNAME=root
DB_PASSWORD=your_local_database_password
```

### 6. Run database migrations

```bash
php artisan migrate
```

### 7. Create the public storage link

```bash
php artisan storage:link
```

### 8. Start the application

Start Laravel:

```bash
php artisan serve
```

In another terminal, start Vite:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:8000
```

## Environment Configuration

Only configure the integrations you want to use locally. Keep all real values in `.env` and never commit them.

### Application

```env
APP_NAME=LMS
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_TIMEZONE=Asia/Colombo
```

### Database

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lms
DB_USERNAME=root
DB_PASSWORD=
```

### Mail

```env
MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

Mailtrap or another SMTP provider can be used during development.

### Google OAuth

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

Add the same callback URL to your Google OAuth application's authorized redirect URIs.

### Stripe

```env
STRIPE_KEY=
STRIPE_SECRET=
```

Use Stripe **test-mode** credentials while developing locally.

### Vimeo

```env
VIMEO_CLIENT_ID=
VIMEO_CLIENT_SECRET=
VIMEO_ACCESS_TOKEN=
```

### Admin email

```env
ADMIN_EMAIL=admin@example.com
```

## Creating an Admin User

New users are created with the normal `user` role by default. For local development, register an account and then change its role using Laravel Tinker:

```bash
php artisan tinker
```

Then run:

```php
$user = App\Models\User::where('email', 'admin@example.com')->first();
$user->role = 'admin';
$user->save();
```

Exit Tinker and sign in again to access the admin area.

## Background Queue

The project is configured to support a database-backed queue. If queued jobs are used in your environment, start a worker with:

```bash
php artisan queue:work
```

## Building for Production

Build the frontend assets with:

```bash
npm run build
```

For a production Laravel deployment, remember to disable debug mode and optimize the application:

```env
APP_ENV=production
APP_DEBUG=false
```

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Testing

Run the Laravel/Pest test suite:

```bash
php artisan test
```

Run frontend linting:

```bash
npm run lint
```

Verify that the frontend can build successfully:

```bash
npm run build
```

## Useful Commands

```bash
# Clear Laravel caches
php artisan optimize:clear

# Run migrations
php artisan migrate

# Roll back the latest migration batch
php artisan migrate:rollback

# Create the storage symlink
php artisan storage:link

# Start the Laravel server
php artisan serve

# Start the Vite development server
npm run dev

# Build production assets
npm run build

# Run tests
php artisan test
```

## Security

Please **do not publish security vulnerabilities as public GitHub issues**. If GitHub Private Vulnerability Reporting is enabled for the repository, use it to report security issues privately to the maintainers.

Before making this repository public:

- Remove all real credentials from tracked files.
- Keep `.env` ignored by Git.
- Commit only a sanitized `.env.example`.
- Rotate any secret that has previously been committed or shared.
- Use test credentials for development services.
- Review the Git history for accidentally committed secrets.

If a secret was already committed, deleting it from the latest version of the file does **not** make that secret safe. Revoke or rotate it.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes.
4. Run tests and linting.
5. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

6. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request with a clear description of the change.

For bug fixes, include reproduction steps and explain how the change resolves the issue.

## Code Style

PHP formatting can be checked/fixed with Laravel Pint:

```bash
./vendor/bin/pint
```

Frontend code uses ESLint and Prettier conventions defined by the repository configuration.

## License

This project is open-source software licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

## Acknowledgements

This project uses several excellent open-source technologies, including:

- [Laravel](https://laravel.com/)
- [Inertia.js](https://inertiajs.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Stripe](https://stripe.com/)
- [Vimeo](https://vimeo.com/)
- [Dompdf](https://github.com/dompdf/dompdf)

---

If you find this project useful, consider giving the repository a ⭐ and contributing improvements.
