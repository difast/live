'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CONFIRMED_SOCIALS, NAV, PERSON } from '@/content/site';
import styles from './Header.module.css';

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Меню закрывается при переходе — иначе оно остаётся открытым после навигации.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const telegram = CONFIRMED_SOCIALS.find((s) => s.key === 'telegram');

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={`${PERSON.name} — на главную`}>
          {PERSON.name}
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {telegram && (
            <a
              className={styles.social}
              href={telegram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          )}
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobileNav} id="mobile-nav">
          <div className="container">
            <nav aria-label="Мобильная навигация">
              <ul className={styles.mobileList}>
                {NAV.map((item, i) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.mobileLink}
                      aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    >
                      {item.label}
                      <span className={styles.mobileIndex} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileSocials}>
              {CONFIRMED_SOCIALS.map((s) => (
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
