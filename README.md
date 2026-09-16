# SecureAuth – Forget Password System (Frontend)

Modern React frontend for complete authentication system with:
- Sign Up
- Email Verification (OTP)
- Login
- Forgot Password (OTP → New Password)

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router
- Axios
- Lucide Icons

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Edit .env and put your Render backend URL
# VITE_API_URL=https://your-app.onrender.com

# 4. Run
npm run dev
```

App will open at http://localhost:3000

## Backend Endpoints Used

| Method | Endpoint            | Purpose                    |
|--------|---------------------|----------------------------|
| POST   | /user/create        | Sign Up                    |
| POST   | /user/login         | Login                      |
| POST   | /otp/send           | Send email verification OTP|
| POST   | /otp/verify         | Verify email OTP           |
| POST   | /password/forgot    | Send password reset OTP    |
| POST   | /password/verify    | Verify password reset OTP  |
| POST   | /password/reset     | Set new password           |

## Backend .env (Render)

```env
DATABASE_URL=your_render_postgres_url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM=your_email@gmail.com
PORT=5050
```

> Gmail ke liye App Password generate karo (Google Account → Security → 2-Step → App passwords)
