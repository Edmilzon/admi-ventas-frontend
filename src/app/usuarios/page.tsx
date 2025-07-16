"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UsuariosPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/usuarios/login');
  }, [router]);
  return null;
} 