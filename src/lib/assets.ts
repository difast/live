import fs from 'node:fs';
import path from 'node:path';

/**
 * Проверяет наличие файла в /public на этапе сборки.
 *
 * Нужно, чтобы реальные изображения (портрет, YouTube-баннер) подхватывались
 * автоматически, как только файл положен в репозиторий — без правок кода.
 * Пока файла нет, компоненты рендерят аккуратную заглушку тех же пропорций,
 * поэтому вёрстка не сдвигается ни в одном из состояний.
 *
 * Вызывается только из серверных компонентов на этапе сборки.
 */
export function hasPublicAsset(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', publicPath.replace(/^\/+/, '')));
  } catch {
    return false;
  }
}
