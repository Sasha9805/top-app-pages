import { Input, Rating, Textarea, Button } from "..";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "@/helpers/api";
import { useState } from "react";

export const ReviewForm = ({
	productId,
	isOpened,
	className,
	...props
}: ReviewFormProps) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{
					...formData,
					productId,
				}
			);
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError("Что-то пошло не так");
			}
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			}
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(className, styles.reviewForm)} {...props}>
				<Input
					{...register("name", {
						required: { value: true, message: "Заполните имя" },
					})}
					error={errors.name}
					placeholder="Имя"
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register("title", {
						required: {
							value: true,
							message: "Заполните заголовок",
						},
					})}
					error={errors.title}
					placeholder="Заголовок отзыва"
					className={styles.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка</span>
					<Controller
						control={control}
						name="rating"
						rules={{
							required: {
								value: true,
								message: "Укажите рейтинг",
							},
						}}
						render={({ field }) => (
							<Rating
								ref={field.ref}
								error={errors.rating}
								isEditable
								rating={field.value}
								setRating={field.onChange}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register("description", {
						required: {
							value: true,
							message: "Заполните описание",
						},
					})}
					error={errors.description}
					placeholder="Текст отзыва"
					className={styles.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label="Текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						appearance="primary"
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.panel, styles.success)}>
					<div className={styles.successTitle}>
						Ваш отзыв отправлен
					</div>
					<div className={styles.successDescription}>
						Спасибо, ваш отзыв будет опубликован после проверки.
					</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setIsSuccess(false)}
					/>
				</div>
			)}
			{error && (
				<div className={cn(styles.panel, styles.error)}>
					Что-то пошло не так, попробуйте обновить страницу
					<CloseIcon
						className={styles.close}
						onClick={() => setError(undefined)}
					/>
				</div>
			)}
		</form>
	);
};
