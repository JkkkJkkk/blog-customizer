import { useState, useEffect, useCallback, useRef } from 'react';
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
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setArticleState,
}: PropsArticleParamsForm) => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => setIsOpen((prev) => !prev);

	const handleChange = useCallback(
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: option }));
		},
		[]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleForm();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				toggleForm();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						onChange={handleChange('fontFamilyOption')}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={formState.fontSizeOption.className}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						onChange={handleChange('fontColor')}
						selected={formState.fontColor}
						title='Цвет шрифта'
						options={fontColors}
					/>
					<Separator />
					<Select
						onChange={handleChange('backgroundColor')}
						selected={formState.backgroundColor}
						title='Цвет фона'
						options={backgroundColors}
					/>
					<Select
						onChange={handleChange('contentWidth')}
						selected={formState.contentWidth}
						title='Ширина контента'
						options={contentWidthArr}
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
