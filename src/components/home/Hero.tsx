import Link from 'next/link';
import { CONFIRMED_SOCIALS, PERSON } from '@/content/site';
import { Portrait } from '@/components/ui/Portrait';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">Официальный сайт</p>
          <h1 className={styles.name} id="hero-title">
            {PERSON.name}
          </h1>
          <p className={styles.role}>
            Предприниматель и создатель технологических компаний и продуктов.
          </p>
          <p className={styles.statement}>
            Создаю компании, продукты и системы на стыке технологий, бизнеса и AI.
          </p>

          <div className={styles.actions}>
            <Link href="/projects" className="button button--primary">
              Проекты
            </Link>
            <Link href="/about" className="button button--secondary">
              Обо мне
            </Link>
          </div>

          <div className={styles.follow}>
            <span>Следить:</span>
            <span className={styles.followLinks}>
              {CONFIRMED_SOCIALS.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name} ↗
                </a>
              ))}
            </span>
          </div>
        </div>

        <div className={styles.portrait}>
          <Portrait priority sizes="(min-width: 62rem) 26rem, 0px" />
        </div>
      </div>
    </section>
  );
}
