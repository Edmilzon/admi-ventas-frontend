import AdminNavBar from '@/components/common/NavBar/AdminNavBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-amber-50">
      <AdminNavBar />
      <main className="ml-64 pt-16 p-8">
        {children}
      </main>
    </div>
  );
} 