import { KeyboardEvent, useState } from "react";
import cn from "classnames";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import { Button, Input } from "..";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps) => {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();
	const goToSearch = () => {
		router.push({
			pathname: "/search",
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			goToSearch();
		}
	};

	return (
		<form className={cn(className, styles.search)} role="search" {...props}>
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}
				aria-label="Искать по сайту"
			>
				<GlassIcon />
			</Button>
		</form>
	);
};
