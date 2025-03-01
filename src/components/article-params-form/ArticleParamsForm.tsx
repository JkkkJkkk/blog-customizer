import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
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
	onReset?: (params: ArticleStateType) => void;
	onToggle?: (params: boolean) => void;
	formOp: boolean;
};

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
	onToggle,
	formOp,
}: PropsArticleParamsForm) => {
	const [params, setParams] = useState(defaultArticleState);

	useEffect(() => {
		const handlerOpenWidget = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && formOp) onToggle?.(false);
		};
		document.addEventListener('keydown', handlerOpenWidget);
		return () => document.removeEventListener('keydown', handlerOpenWidget);
	}, [formOp, onToggle]);

	const handleChange = useCallback(
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setParams((prev) => ({ ...prev, [key]: option }));
		},
		[]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(params);
	};

	const handleReset = () => {
		setParams(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={() => onToggle?.(formOp)} isOpen={formOp} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: formOp })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={handleChange('fontFamilyOption')}
							selected={params.fontFamilyOption}
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<Select
							onChange={handleChange('fontColor')}
							selected={params.fontColor}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={handleChange('backgroundColor')}
							selected={params.backgroundColor}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={handleChange('contentWidth')}
							selected={params.contentWidth}
							title='Ширина контента'
							options={contentWidthArr}
						/>
						<RadioGroup
							name={params.fontSizeOption.className}
							options={fontSizeOptions}
							selected={params.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title={'Размер шрифта'}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
