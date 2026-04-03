// src/components/Features.tsx

type Feature = {
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    title: "Write freely",
    desc: "A distraction-free editor for your thoughts.",
  },
  {
    title: "Stay organized",
    desc: "Structure your notes and projects beautifully.",
  },
  {
    title: "Collaborate",
    desc: "Work with your team in real-time.",
  },
];

export default function Features() {
  return (
    <section className="px-10 py-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((f, i) => (
        <div
          key={i}
          className="p-8 rounded-3xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
        >
          <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
          <p className="text-gray-500">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}