import { withLayout } from "../layout/Layout";
import { Button, Htag, P, Tag, Rating } from "../components";
import { useState } from "react";

function Home() {
	const [rating, setRating] = useState<number>(4);
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
		</>
	);
}

export default withLayout(Home);
