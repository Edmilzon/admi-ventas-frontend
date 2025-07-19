import AdminNavBar from '@/components/common/NavBar/AdminNavBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-amber-50">
      <AdminNavBar />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
} 