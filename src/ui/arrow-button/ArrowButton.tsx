import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick?: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		<button
			onClick={onClick}
			aria-label='Открыть/Закрыть форму параметров статьи'
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</button>
	);
};
