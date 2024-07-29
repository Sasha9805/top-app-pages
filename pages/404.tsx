import { Htag } from "@/components";
import { withLayout } from "@/layout/Layout";

export function Error404() {
	return (
		<>
			<Htag tag="h1">Ошибка 404</Htag>
		</>
	);
}

export default withLayout(Error404);
