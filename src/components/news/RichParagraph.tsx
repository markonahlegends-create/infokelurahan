import { Fragment } from "react";

/** Menyorot bagian bercetak tebal (**...**) dari teks berita. */
export function RichParagraph({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <p>
      {segments.map((segment, i) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-ink-950">
              {segment.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={i}>{segment}</Fragment>;
      })}
    </p>
  );
}
