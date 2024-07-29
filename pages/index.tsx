import { withLayout } from "../layout/Layout";
import { Button, Htag, P, Tag, Rating, Input, Textarea } from "../components";
import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "@/helpers/api";
import Error from "next/error";
import { Error404 } from "./404";

function Home({ menu }: HomeProps) {
	const [rating, setRating] = useState<number>(4);
	// return <Error statusCode={404} />;
	// return <Error404 />;
	return (
		<>
			<Htag tag="h1">Text</Htag>

			<Button appearance="primary" arrow="right">
				Button
			</Button>
			<Button appearance="ghost" arrow="down">
				Button
			</Button>

			<P size="s">Text</P>
			<P>Text</P>
			<P size="l">Text</P>

			<Tag>Test</Tag>
			<Tag color="red">Test</Tag>
			<Tag color="green">Test</Tag>
			<Tag color="gray">Test</Tag>
			<Tag color="primary">Test</Tag>

			<Tag size="m">Test</Tag>
			<Tag size="m" color="red">
				Test
			</Tag>
			<Tag size="m" color="green">
				Test
			</Tag>
			<Tag size="m" color="gray">
				Test
			</Tag>
			<Tag size="m" color="primary">
				Test
			</Tag>

			<Rating rating={rating} isEditable setRating={setRating} />

			<Input placeholder="Test" />
			<Textarea placeholder="Test" />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
