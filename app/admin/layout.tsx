
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // This layout will apply to all routes under /admin
  // It provides a clean, neutral background.
  return (
    <div className="bg-gray-50 min-h-screen">
      {children}
    </div>
  );
}
