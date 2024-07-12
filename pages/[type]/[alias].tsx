import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import {
	TopLevelCategory,
	TopPageModel,
} from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import { TopPageComponent } from "@/page-components";

function TopPage({ menu, page, products, firstCategory }: TopPageProps) {
	return (
		<TopPageComponent
			page={page}
			products={products}
			firstCategory={firstCategory}
		/>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (let topMenu of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(
			process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
			{
				firstCategory: topMenu.id,
			}
		);
		const newPaths = menu.flatMap((m) =>
			m.pages.map((p) => `/${topMenu.route}/${p.alias}`)
		);
		paths = [...paths, ...newPaths];
	}
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params.type
	);
	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: menu } = await axios.post<MenuItem[]>(
			process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
			{
				firstCategory: firstCategoryItem.id,
			}
		);
		if (menu.length === 0) {
			return {
				notFound: true,
			};
		}
		const { data: page } = await axios.get<TopPageModel>(
			process.env.NEXT_PUBLIC_DOMAIN +
				"/api/top-page/byAlias/" +
				params.alias
		);
		const { data: products } = await axios.post<ProductModel[]>(
			process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
			{
				category: page.category,
				limit: 10,
			}
		);
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
