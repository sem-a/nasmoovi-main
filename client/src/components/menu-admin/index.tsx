import React from "react";
import { useLocation, Link } from "react-router-dom";
import { PATHS } from "../../paths";
import styles from "./index.module.css";

type Menu = {
    id: number;
    name: string;
    path: string;
    active: boolean;
};

type Props = {
    isAdmin: boolean;
};

const MenuAdmin: React.FC<Props> = ({ isAdmin }) => {
    const location = useLocation();
    const menu: Menu[] = [
        { id: 0, name: "Все свадьбы", path: PATHS.weddingAll, active: true },
        { id: 1, name: "Все видео", path: PATHS.videoAll, active: true },
        {
            id: 2,
            name: "Добавить свадьбу",
            path: PATHS.weddingAdd,
            active: true,
        },
        { id: 3, name: "Добавить админа", path: PATHS.home, active: isAdmin },
        { id: 4, name: "Добавить видео", path: PATHS.videoAdd, active: true },
    ];

    return (
        <div className={styles.menu}>
            <ul className={styles.menuList}>
                {menu.map((menuItem) => {
                    if (menuItem.active) {
                        return (
                            <li
                                key={menuItem.id}
                                className={
                                    location.pathname === menuItem.path
                                        ? styles.selected
                                        : ""
                                }
                            >
                                <Link
                                    to={menuItem.path}
                                    className={styles.menuItem}
                                >
                                    {menuItem.name}
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default MenuAdmin;
