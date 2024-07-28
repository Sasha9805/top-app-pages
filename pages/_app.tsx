import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import ym, { YMInitializer } from "react-yandex-metrika";
import { useEffect } from "react";

const noto_sans = Noto_Sans({ subsets: ["cyrillic", "latin"] });

export default function App({ Component, pageProps, router }: AppProps) {
	useEffect(() => {
		router.events.on("routeChangeComplete", (url: string) => {
			if (typeof window !== "undefined") {
				ym("hit", url);
			}
		});
	}, []);

	return (
		<>
			<style jsx global>{`
				html,
				body {
					font-family: ${noto_sans.style.fontFamily};
				}
			`}</style>
			<Head>
				<link rel="preconnect" href="https://mc.yandex.ru" />
				<title>My top - наш лучший топ!</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
				/>
				<meta property="og:locale" content="ru_RU" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<YMInitializer
				accounts={[]}
				options={{ webvisor: true, defer: true }}
				version="2"
			/>
			<Component {...pageProps} />
		</>
	);
}
