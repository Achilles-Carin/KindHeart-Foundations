// Drop real photos into src/assets/photos/ named: hero, food, education,
// outreach, family, about  (.jpg / .jpeg / .png / .webp).
// Any missing file falls back to a drawn illustration automatically.
const modules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const byName = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? '';
  byName.set(file.replace(/\.[^.]+$/, '').toLowerCase(), url);
}

export function getPhoto(name: string): string | undefined {
  return byName.get(name.toLowerCase());
}
