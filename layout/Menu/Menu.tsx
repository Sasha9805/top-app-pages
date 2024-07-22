import { KeyboardEvent, useContext } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion } from "framer-motion";

export const Menu = () => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
		hidden: {
			marginBottom: 0,
		},
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: "auto",
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const openSecondLevel = (secondCategory: string) => {
		const newMenu = menu.map((m) => {
			if (m._id.secondCategory === secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		});
		setMenu && setMenu(newMenu);
	};

	const openSecondLevelKey = (e: KeyboardEvent, secondCategory: string) => {
		if (e.code === "Enter" || e.code === "Space") {
			e.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]:
										m.id === firstCategory,
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((m) => {
					const aliases = m.pages.map((p) => p.alias);
					const currentAlias = router.asPath.split("/")[2];
					if (aliases.includes(currentAlias)) {
						m.isOpened = true;
					}
					return (
						<div key={m._id.secondCategory}>
							<div
								tabIndex={0}
								className={styles.secondLevel}
								onKeyDown={(e: KeyboardEvent) =>
									openSecondLevelKey(e, m._id.secondCategory)
								}
								onClick={() =>
									openSecondLevel(m._id.secondCategory)
								}
							>
								{m._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={m.isOpened ? "visible" : "hidden"}
								animate={m.isOpened ? "visible" : "hidden"}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(
									m.pages,
									firstLevelMenuItem.route,
									m.isOpened ?? false
								)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	) => {
		return pages.map((p) => {
			const currentHref = `/${route}/${p.alias}`;
			const isActive = currentHref === router.asPath;
			return (
				<motion.div key={p._id} variants={variantsChildren}>
					<Link
						tabIndex={isOpened ? 0 : -1}
						href={currentHref}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: isActive,
						})}
					>
						{p.category}
					</Link>
				</motion.div>
			);
		});
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
