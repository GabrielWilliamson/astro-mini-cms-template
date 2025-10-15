// src/env.d.ts
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    session: {
      id: string;
      userId: string;
      expiresAt: Date;
    } | null;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      emailVerified: boolean;
    } | null;
  }
}
