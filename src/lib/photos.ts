const modules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export function getPhoto(name: string): string | undefined {
  const key = Object.keys(modules).find((path) =>
    new RegExp(`/photos/${name}\\.[a-z]+$`, 'i').test(path),
  );
  return key ? modules[key] : undefined;
}