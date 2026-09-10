import fs from 'node:fs';
import path from 'node:path';

/** Расширения, в которых может быть выложено изображение. */
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'] as const;

function publicFile(publicPath: string): string {
  return path.join(process.cwd(), 'public', publicPath.replace(/^\/+/, ''));
}

/**
 * Проверяет наличие файла в /public на этапе сборки.
 * Вызывается только из серверных компонентов.
 */
export function hasPublicAsset(publicPath: string): boolean {
  try {
    return fs.existsSync(publicFile(publicPath));
  } catch {
    return false;
  }
}

/**
 * Ищет изображение по базовому пути без расширения и возвращает первый
 * найденный вариант — или null, если файла нет.
 *
 * Нужно, чтобы фотографию и баннер канала можно было просто положить в
 * репозиторий в любом обычном формате (jpg, png, webp, avif), не подгоняя
 * имя файла под код. Пока файла нет, компоненты рендерят заглушку тех же
 * пропорций, поэтому вёрстка не сдвигается ни в одном из состояний.
 */
export function resolveImage(basePath: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const candidate = `${basePath}${ext}`;
    if (hasPublicAsset(candidate)) return candidate;
  }
  return null;
}
