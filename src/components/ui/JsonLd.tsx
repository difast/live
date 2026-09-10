/** Один блок JSON-LD на страницу. Данные уже сериализованы в lib/schema. */
export function JsonLd({ json }: { json: string }) {
  return (
    <script
      type="application/ld+json"
      // Содержимое формируется из типизированных данных проекта, не из пользовательского ввода.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
