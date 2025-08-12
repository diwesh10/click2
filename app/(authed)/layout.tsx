import NavBar from "@/components/NavBar";

export default function AuthedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container py-6">{children}</main>
    </div>
  );
}
