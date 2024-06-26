import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import { Footer } from "./Footer/Footer";
import { FunctionComponent } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body}>{children}</div>
			<Footer className={styles.footer} />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
) => {
	return function WithLayoutComponent(props: T) {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};
