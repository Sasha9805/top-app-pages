import { useContext } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "@/helpers/helpers";

export const Menu = () => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const openSecondLevel = (secondCategory: string) => {
		const newMenu = menu.map((m) => {
			if (m._id.secondCategory === secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		});
		setMenu && setMenu(newMenu);
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
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevel(m._id.secondCategory)
								}
							>
								{m._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: m.isOpened,
								})}
							>
								{buildThirdLevel(
									m.pages,
									firstLevelMenuItem.route
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => {
			const currentHref = `/${route}/${p.alias}`;
			const isActive = currentHref === router.asPath;
			return (
				<Link
					key={p._id}
					href={currentHref}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: isActive,
					})}
				>
					{p.category}
				</Link>
			);
		});
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
