import css from './FormTitle.module.css';

export const FormTitle = ({ children }) => {
  return <div className={css.title}>{children}</div>;
};
