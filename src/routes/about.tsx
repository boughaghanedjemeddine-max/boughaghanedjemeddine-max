import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — NIHED FASHION" },
      {
        name: "description",
        content: "تعرّفي على قصة نهاد فاشن للأزياء النسائية المحتشمة في الجزائر.",
      },
      { property: "og:title", content: "من نحن — NIHED FASHION" },
      { property: "og:description", content: "قصة علامة نهاد فاشن." },
    ],
  }),
  component: () => (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
      <img src={hero} alt="نهاد فاشن" className="rounded-3xl" />
      <div>
        <h1 className="text-4xl font-bold">من نحن</h1>
        <p className="mt-6 leading-loose text-muted-foreground">
          NIHED FASHION علامة جزائرية متخصصة في الحجابات والملابس النسائية المحتشمة والإكسسوارات.
          نؤمن بأن الأناقة والراحة يمكن أن تجتمعا في كل إطلالة. (نص تجريبي — سيُستبدل بقصتكم
          الحقيقية)
        </p>
      </div>
    </div>
  ),
});
