import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, useState, useRef, KeyboardEvent } from "react";
import cn from "classnames";
import styles from "./Layout.module.css";
import { AppContextProvider, IAppContext } from "@/context/app.context";
import { Up } from "@/components";

const Layout = ({ children }: LayoutProps) => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
		useState<boolean>(false);

	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (e: KeyboardEvent) => {
		if (e.code === "Enter" || e.code === "Space") {
			e.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};
	return (
		<div className={styles.wrapper}>
			<a
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed,
				})}
				onFocus={() => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
			>
				Сразу к содержанию
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main
				ref={bodyRef}
				tabIndex={0}
				className={styles.body}
				role="main"
			>
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>
) => {
	return function WithLayoutComponent(props: T) {
		return (
			<AppContextProvider
				menu={props.menu}
				firstCategory={props.firstCategory}
			>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
