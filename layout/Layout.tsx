import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import { Footer } from "./Footer/Footer";
import { FunctionComponent } from "react";

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			<div>
				<Sidebar />
				<div>{children}</div>
			</div>
			<Footer />
		</>
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
