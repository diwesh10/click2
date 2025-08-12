import Auth from "@/components/Auth";

export default function Home() {
  return (
    <main className="container py-12">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-3 max-w-2xl">
          <h1 className="text-4xl font-bold">LearnTrack</h1>
          <p className="text-gray-600">A minimal learning site with user auth, interactive lessons, quizzes, and full clickstream analytics.</p>
        </div>
        <Auth />
      </div>
    </main>
  );
}
