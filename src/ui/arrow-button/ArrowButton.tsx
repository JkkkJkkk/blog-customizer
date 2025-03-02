import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick?: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onClick?.();
		}
	};

	return (
		<div
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
