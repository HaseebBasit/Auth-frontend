import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    // Password length

    if (form.password.length < 8) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }

    // Confirm password

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const email =
        form.email.trim().toLowerCase();

      // Create user

      await api.post("/user/create", {
        name: form.name.trim(),
        email,
        password: form.password,
      });

      setSuccess(
        "Account created! Please verify your email."
      );

      // Go to email verification

      setTimeout(() => {
        navigate("/verify-email", {
          state: {
            email,
          },
        });
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and get started in seconds"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Alert
          type="error"
          message={error}
          onClose={() => setError("")}
        />

        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />

        {/* Full Name */}

        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          icon={User}
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
        />

        {/* Email */}

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        {/* Password */}

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={
              showPass ? "text" : "password"
            }
            placeholder="Min. 8 characters"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={() =>
              setShowPass(!showPass)
            }
            className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-200"
          >
            {showPass ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* Confirm Password */}

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={
            showPass ? "text" : "password"
          }
          placeholder="Re-enter password"
          icon={Lock}
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        {/* Submit */}

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary-400 hover:text-primary-300 font-medium"
        >
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
}
