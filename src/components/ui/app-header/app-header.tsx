import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, 'text text_type_main-default ml-2', {
    [styles.link_active]: isActive
  });

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to='/' end className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='mr-10'>Конструктор</span>
            </>
          )}
        </NavLink>
        <NavLink to='/feed' className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <span>Лента заказов</span>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to='/profile' className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span>{userName || 'Личный кабинет'}</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
