import Image from 'next/image';
import { PERSON, PORTRAIT_BASE } from '@/content/site';
import { resolveImage } from '@/lib/assets';
import styles from './Portrait.module.css';

type Props = {
  /** Приоритетная загрузка — только для портрета в первом экране. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Портрет Дмитрия Пятакова.
 * Реальная фотография кладётся в public/images/dmitry-pyatakov/portrait.jpg
 * и подхватывается автоматически. До этого рендерится заглушка 4:5.
 */
export function Portrait({ priority = false, sizes = '(min-width: 60rem) 26rem, 100vw' }: Props) {
  const photo = resolveImage(PORTRAIT_BASE);

  return (
    <figure className={styles.frame}>
      {photo ? (
        <Image
          src={photo}
          alt={PERSON.portraitAlt}
          fill
          className={styles.image}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        // TODO(фото): заменить заглушку реальной фотографией.
        <div className={styles.placeholder} aria-hidden="true">
          <span className={styles.initials}>ДП</span>
          <span className={styles.note}>Фотография</span>
        </div>
      )}
    </figure>
  );
}
