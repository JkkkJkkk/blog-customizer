import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

type PropsArticleParamsForm = {
	onSubmit?: (params: ArticleStateType) => void;
	onToggle?: () => void;
};

export const ArticleParamsForm = ({
	onSubmit
}: PropsArticleParamsForm) => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState(false);

	useEffect(() => {
		if (!isFormOpen) return;

		const handlerOpenWidget = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('keydown', handlerOpenWidget);

		return () => {
			document.removeEventListener('keydown', handlerOpenWidget);
		};
	}, [isFormOpen]);

	const handleChange = useCallback(
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setArticleParams((prev) => ({ ...prev, [key]: option }));
		},
		[]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(articleParams);
	};

	const handleReset = () => {
		setArticleParams(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				onClick={() => setIsFormOpen((prev) => !prev)}
				isOpen={isFormOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						onChange={handleChange('fontFamilyOption')}
						selected={articleParams.fontFamilyOption}
						title='Шрифт'
						options={fontFamilyOptions}
					/>
					<Select
						onChange={handleChange('fontColor')}
						selected={articleParams.fontColor}
						title='Цвет шрифта'
						options={fontColors}
					/>
					<Separator />
					<Select
						onChange={handleChange('backgroundColor')}
						selected={articleParams.backgroundColor}
						title='Цвет фона'
						options={backgroundColors}
					/>
					<Select
						onChange={handleChange('contentWidth')}
						selected={articleParams.contentWidth}
						title='Ширина контента'
						options={contentWidthArr}
					/>
					<RadioGroup
						name={articleParams.fontSizeOption.className}
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
