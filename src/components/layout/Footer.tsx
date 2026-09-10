import Link from 'next/link';
import { CONFIRMED_SOCIALS, NAV, PERSON } from '@/content/site';
import { PROJECTS } from '@/content/projects';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.identity}>
          <p className={styles.name}>{PERSON.name}</p>
          <p className={styles.role}>{PERSON.role}.</p>
          <a className={styles.email} href={`mailto:${PERSON.email}`}>
            {PERSON.email}
          </a>
        </div>

        <div className={styles.grid}>
          <nav aria-labelledby="footer-nav">
            <p className="label" id="footer-nav">
              Навигация
            </p>
            <ul className={styles.list}>
              <li>
                <Link href="/">Главная</Link>
              </li>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-projects">
            <p className="label" id="footer-projects">
              Проекты
            </p>
            <ul className={styles.list}>
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-social">
            <p className="label" id="footer-social">
              Социальные сети
            </p>
            <ul className={styles.list}>
              {CONFIRMED_SOCIALS.map((social) => (
                <li key={social.key}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {PERSON.name}
          </p>
          <p>Официальный сайт</p>
        </div>
      </div>
    </footer>
  );
}
